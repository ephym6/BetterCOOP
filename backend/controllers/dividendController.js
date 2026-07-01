// FR-04 — Dividend Session Management
// FR-05 — Member Statements (payout retrieval)
// FR-06 — SMS triggered after payouts are generated

const { validationResult } = require('express-validator');
const DividendSession = require('../models/DividendSession');
const DividendPayout  = require('../models/DividendPayout');
const Member          = require('../models/Member');
const { calculatePayouts } = require('../services/dividendService');
const { sendSMS, messages } = require('../services/smsService');
const writeAudit       = require('../utils/writeAudit');

// ── POST /api/sessions  ───────────────────────────────────────────────────────
exports.createSession = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, periodStart, periodEnd } = req.body;

    // Only one open session allowed at a time
    const openSession = await DividendSession.findOne({ status: 'open' });
    if (openSession) {
      return res.status(400).json({
        success: false,
        message: `There is already an open session: "${openSession.name}". Close it before creating a new one.`,
      });
    }

    const session = await DividendSession.create({
      name,
      periodStart: new Date(periodStart),
      periodEnd:   new Date(periodEnd),
      createdBy:   req.user._id,
    });

    await writeAudit(req, {
      action:       'SESSION_CREATED',
      resourceType: 'DividendSession',
      resourceId:   session._id,
      metadata:     { name, periodStart, periodEnd },
    });

    res.status(201).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/sessions  ────────────────────────────────────────────────────────
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await DividendSession.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('closedBy', 'name');

    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/sessions/:id  ────────────────────────────────────────────────────
exports.getSession = async (req, res, next) => {
  try {
    const session = await DividendSession.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('closedBy', 'name');

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    res.status(200).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/sessions/:id/close  ─────────────────────────────────────────────
// Closes session → calculates payouts → sends SMS notifications (FR-06)
exports.closeSession = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const session = await DividendSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }
    if (session.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Session is already closed.' });
    }

    const { totalDividendPoolKes } = req.body;

    // Mark session as closed with the pool amount
    session.status               = 'closed';
    session.totalDividendPoolKes = totalDividendPoolKes;
    session.closedBy             = req.user._id;
    session.closedAt             = new Date();
    await session.save();

    // Run dividend calculation (FR-04)
    const { payouts, summary } = await calculatePayouts(session);

    // Send SMS to each member (FR-06) — fire-and-forget, errors logged not thrown
    const smsSendPromises = payouts.map(async (payout) => {
      const member = await Member.findById(payout.memberId);
      if (!member?.phone) return;

      const msg    = messages.payoutReady(member.fullName, payout.grossAmountKes, session.name);
      const result = await sendSMS(member.phone, msg);

      // Record SMS status on the payout
      payout.smsSentAt  = new Date();
      payout.smsStatus  = result.success ? 'sent' : 'failed';
      await payout.save();
    });

    await Promise.allSettled(smsSendPromises);

    await writeAudit(req, {
      action:       'SESSION_CLOSED',
      resourceType: 'DividendSession',
      resourceId:   session._id,
      metadata:     { summary },
    });

    res.status(200).json({
      success: true,
      message: 'Session closed. Payouts calculated and SMS notifications dispatched.',
      summary,
      data:    session,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/sessions/:id/payouts  ────────────────────────────────────────────
// Admin: all payouts for a session; Member: own payout only (FR-05)
exports.getSessionPayouts = async (req, res, next) => {
  try {
    let query = { dividendSessionId: req.params.id };

    if (req.user.role === 'member') {
      const member = await Member.findOne({ userId: req.user._id });
      if (!member) return res.status(404).json({ success: false, message: 'Member profile not found.' });
      query.memberId = member._id;
    }

    const payouts = await DividendPayout.find(query)
      .populate('memberId', 'fullName memberNumber phone')
      .populate('dividendSessionId', 'name periodStart periodEnd');

    res.status(200).json({ success: true, count: payouts.length, data: payouts });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/members/:memberId/statement  ─────────────────────────────────────
// FR-05 — Member statement: all payout records for a member across all sessions
exports.getMemberStatement = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    // Members can only access own statement
    if (req.user.role === 'member') {
      const ownMember = await Member.findOne({ userId: req.user._id });
      if (!ownMember || ownMember._id.toString() !== memberId) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }
    }

    const payouts = await DividendPayout.find({ memberId })
      .sort({ createdAt: -1 })
      .populate('dividendSessionId', 'name periodStart periodEnd totalDividendPoolKes');

    const totalEarnedKes = payouts.reduce((sum, p) => sum + p.grossAmountKes, 0);
    const totalKg        = payouts.reduce((sum, p) => sum + p.totalDeliveriesKg, 0);

    res.status(200).json({
      success: true,
      summary: {
        totalSessions:  payouts.length,
        totalKgDelivered: totalKg,
        totalEarnedKes: parseFloat(totalEarnedKes.toFixed(2)),
      },
      data: payouts,
    });
  } catch (err) {
    next(err);
  }
};
