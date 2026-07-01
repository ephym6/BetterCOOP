// FR-02 — Member Registration & Profile Management Controller
const { validationResult } = require('express-validator');
const Member        = require('../models/Member');
const User          = require('../models/User');
const writeAudit    = require('../utils/writeAudit');
const generateToken = require('../utils/generateToken');

// ── POST /api/members  ────────────────────────────────────────────────────────
// Admin creates a member + their linked User account in one request
exports.createMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      fullName, phone, nationalId, email, sharesPurchased, physicalAddress,
      alternativePhone,
      userEmail, userPassword,  // credentials for the Member's login account
    } = req.body;

    // 1. Create User account with role=member
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'A user with that login email already exists.' });
    }

    const user = await User.create({
      name:     fullName,
      email:    userEmail,
      password: userPassword,
      role:     'member',
    });

    // 2. Create Member profile linked to the User
    const member = await Member.create({
      userId:          user._id,
      fullName,
      phone,
      nationalId,
      email,
      alternativePhone,
      sharesPurchased: sharesPurchased || 0,
      physicalAddress: physicalAddress || {},
    });

    await writeAudit(req, {
      action:       'MEMBER_CREATED',
      resourceType: 'Member',
      resourceId:   member._id,
      metadata:     { memberNumber: member.memberNumber, phone },
    });

    res.status(201).json({
      success: true,
      data: {
        member,
        userAccount: { id: user._id, email: user.email, role: user.role },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/members  ─────────────────────────────────────────────────────────
// Admin: list all members with pagination and search
exports.getAllMembers = async (req, res, next) => {
  try {
    const page     = parseInt(req.query.page)  || 1;
    const limit    = parseInt(req.query.limit) || 20;
    const skip     = (page - 1) * limit;
    const search   = req.query.search || '';
    const isActive = req.query.isActive !== undefined
      ? req.query.isActive === 'true'
      : true;

    const query = { isActive };
    if (search) {
      query.$or = [
        { fullName:     { $regex: search, $options: 'i' } },
        { memberNumber: { $regex: search, $options: 'i' } },
        { phone:        { $regex: search, $options: 'i' } },
        { nationalId:   { $regex: search, $options: 'i' } },
      ];
    }

    const [members, total] = await Promise.all([
      Member.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'email role'),
      Member.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      data: members,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/members/:id  ─────────────────────────────────────────────────────
// Admin: full profile; Member: own profile only
exports.getMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id).populate('userId', 'email role');
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    // Members can only view their own profile
    if (req.user.role === 'member') {
      const ownMember = await Member.findOne({ userId: req.user._id });
      if (!ownMember || ownMember._id.toString() !== member._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }
    }

    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/members/me  ──────────────────────────────────────────────────────
// Convenience: logged-in member fetches their own profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const member = await Member.findOne({ userId: req.user._id });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member profile not found.' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ── PATCH /api/members/:id  ───────────────────────────────────────────────────
exports.updateMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const allowedUpdates = [
      'fullName', 'phone', 'alternativePhone', 'email',
      'nationalId', 'sharesPurchased', 'physicalAddress',
    ];
    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    await writeAudit(req, {
      action:       'MEMBER_UPDATED',
      resourceType: 'Member',
      resourceId:   member._id,
      metadata:     { updatedFields: Object.keys(updates) },
    });

    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ── PATCH /api/members/:id/deactivate  ───────────────────────────────────────
exports.deactivateMember = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        isActive:           false,
        deactivationReason: reason || 'No reason provided',
        deactivatedAt:      new Date(),
      },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    // Deactivate linked user account too
    await User.findByIdAndUpdate(member.userId, { isActive: false });

    await writeAudit(req, {
      action:       'MEMBER_DEACTIVATED',
      resourceType: 'Member',
      resourceId:   member._id,
      metadata:     { reason },
    });

    res.status(200).json({ success: true, message: 'Member deactivated.', data: member });
  } catch (err) {
    next(err);
  }
};
