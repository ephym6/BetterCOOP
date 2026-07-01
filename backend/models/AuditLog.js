// FR-07 — Audit Logging
// Immutable trail of all significant system actions.
// Written by controllers; never edited or deleted via API.

const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    // Who did it
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
    },
    userRole: String,

    // What happened
    action: {
      type:     String,
      required: true,
      // e.g. 'MEMBER_CREATED', 'DELIVERY_LOGGED', 'SESSION_CLOSED',
      //      'PAYOUT_GENERATED', 'SMS_SENT', 'LOGIN', 'MEMBER_DEACTIVATED'
    },

    // What resource was affected
    resourceType: String,    // e.g. 'Member', 'Delivery', 'DividendSession'
    resourceId:   String,

    // Extra context snapshot at time of action
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Request metadata
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
    // Prevent modifications after creation
    strict: true,
  }
);

// Index for quick audit lookups
AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ resourceType: 1, resourceId: 1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
