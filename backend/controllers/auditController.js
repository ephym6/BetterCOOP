// FR-07 — Audit Log Controller (read-only via API — admin only)
const AuditLog = require('../models/AuditLog');

// ── GET /api/audit  ───────────────────────────────────────────────────────────
exports.getAuditLogs = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip  = (page - 1) * limit;

    const query = {};
    if (req.query.action)       query.action       = req.query.action;
    if (req.query.userId)       query.userId        = req.query.userId;
    if (req.query.resourceType) query.resourceType  = req.query.resourceType;
    if (req.query.resourceId)   query.resourceId    = req.query.resourceId;

    if (req.query.from || req.query.to) {
      query.createdAt = {};
      if (req.query.from) query.createdAt.$gte = new Date(req.query.from);
      if (req.query.to)   query.createdAt.$lte = new Date(req.query.to);
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email role'),
      AuditLog.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};
