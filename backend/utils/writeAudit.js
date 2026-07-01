const AuditLog = require('../models/AuditLog');

const writeAudit = async (req, auditData) => {
  try {
    const log = await AuditLog.create({
      user: req.user ? req.user._id : null,
      action: auditData.action,
      resourceType: auditData.resourceType,
      resourceId: auditData.resourceId,
      metadata: auditData.metadata,
      ipAddress: req.ip,
    });
    return log;
  } catch (error) {
    console.error('Audit log failed:', error);
  }
};

module.exports = writeAudit;
