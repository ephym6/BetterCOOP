// FR-04 / FR-05 — Dividend Payout per Member & Member Statement
// One record per member per DividendSession. Generated automatically when a session closes.
// This is a ledger record only — no actual money movement (Chapter 1, §1.7).

const mongoose = require('mongoose');

const DividendPayoutSchema = new mongoose.Schema(
  {
    dividendSessionId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'DividendSession',
      required: true,
    },
    memberId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Member',
      required: true,
    },

    // Aggregated from Delivery records within this session
    totalDeliveriesKg: {
      type:     Number,
      required: true,
      min:      0,
    },

    // pricePerKg taken from DividendSession at time of calculation
    pricePerKgKes: {
      type:     Number,
      required: true,
    },

    // Calculated: totalDeliveriesKg × pricePerKgKes
    grossAmountKes: {
      type:     Number,
      required: true,
    },

    // Status (display only — no payment gateway)
    status: {
      type:    String,
      enum:    ['pending', 'acknowledged'],
      default: 'pending',
      // 'pending'      — calculated, awaiting member to view/acknowledge
      // 'acknowledged' — member has viewed their statement (FR-05)
    },

    smsSentAt: Date,   // populated by SMS service (FR-06)
    smsStatus: {
      type:    String,
      enum:    ['not_sent', 'sent', 'failed'],
      default: 'not_sent',
    },
  },
  { timestamps: true }
);

// Prevent duplicate payout for same member in same session
DividendPayoutSchema.index({ dividendSessionId: 1, memberId: 1 }, { unique: true });

module.exports = mongoose.model('DividendPayout', DividendPayoutSchema);
