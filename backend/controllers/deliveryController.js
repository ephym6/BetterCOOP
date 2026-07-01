// FR-03 — Delivery Logging Controller
const { validationResult } = require('express-validator');
const Delivery   = require('../models/Delivery');
const Member     = require('../models/Member');
const writeAudit = require('../utils/writeAudit');

// ── POST /api/deliveries  ─────────────────────────────────────────────────────
exports.logDelivery = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { memberId, quantityKg, deliveryDate, grade, notes } = req.body;

    // Verify member exists and is active
    const member = await Member.findById(memberId);
    if (!member || !member.isActive) {
      return res.status(404).json({ success: false, message: 'Active member not found.' });
    }

    const delivery = await Delivery.create({
      memberId,
      quantityKg,
      deliveryDate: deliveryDate || new Date(),
      grade:        grade || 'Ungraded',
      notes,
      loggedBy:     req.user._id,
    });

    await writeAudit(req, {
      action:       'DELIVERY_LOGGED',
      resourceType: 'Delivery',
      resourceId:   delivery._id,
      metadata:     { memberId, quantityKg, grade },
    });

    const populated = await delivery.populate('memberId', 'fullName memberNumber');
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/deliveries  ──────────────────────────────────────────────────────
// Admin: all deliveries; Member: own deliveries only
exports.getDeliveries = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip  = (page - 1) * limit;

    let query = { isVoided: false };

    // Members see their own deliveries only
    if (req.user.role === 'member') {
      const member = await Member.findOne({ userId: req.user._id });
      if (!member) return res.status(404).json({ success: false, message: 'Member profile not found.' });
      query.memberId = member._id;
    } else {
      // Admin can filter by member
      if (req.query.memberId) query.memberId = req.query.memberId;
    }

    // Filter by session
    if (req.query.sessionId) query.dividendSessionId = req.query.sessionId;

    // Date range
    if (req.query.from || req.query.to) {
      query.deliveryDate = {};
      if (req.query.from) query.deliveryDate.$gte = new Date(req.query.from);
      if (req.query.to)   query.deliveryDate.$lte = new Date(req.query.to);
    }

    const [deliveries, total] = await Promise.all([
      Delivery.find(query)
        .sort({ deliveryDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('memberId', 'fullName memberNumber')
        .populate('loggedBy', 'name'),
      Delivery.countDocuments(query),
    ]);

    // Running totals for this query
    const aggregated = await Delivery.aggregate([
      { $match: { ...query, isVoided: false } },
      { $group: { _id: null, totalKg: { $sum: '$quantityKg' } } },
    ]);
    const totalKg = aggregated[0]?.totalKg || 0;

    res.status(200).json({
      success: true,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      summary: { totalKg },
      data: deliveries,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/deliveries/:id  ──────────────────────────────────────────────────
exports.getDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate('memberId', 'fullName memberNumber phone')
      .populate('loggedBy', 'name');

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found.' });
    }

    // Member can only view own deliveries
    if (req.user.role === 'member') {
      const member = await Member.findOne({ userId: req.user._id });
      if (!member || delivery.memberId._id.toString() !== member._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }
    }

    res.status(200).json({ success: true, data: delivery });
  } catch (err) {
    next(err);
  }
};

// ── PATCH /api/deliveries/:id/void  ──────────────────────────────────────────
// Admin only — soft-delete a mistaken delivery entry
exports.voidDelivery = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found.' });
    }

    if (delivery.isVoided) {
      return res.status(400).json({ success: false, message: 'Delivery is already voided.' });
    }

    if (delivery.dividendSessionId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot void a delivery that has already been assigned to a closed dividend session.',
      });
    }

    delivery.isVoided   = true;
    delivery.voidedBy   = req.user._id;
    delivery.voidedAt   = new Date();
    delivery.voidReason = req.body.voidReason;
    await delivery.save();

    await writeAudit(req, {
      action:       'DELIVERY_VOIDED',
      resourceType: 'Delivery',
      resourceId:   delivery._id,
      metadata:     { voidReason: req.body.voidReason },
    });

    res.status(200).json({ success: true, message: 'Delivery voided.', data: delivery });
  } catch (err) {
    next(err);
  }
};
