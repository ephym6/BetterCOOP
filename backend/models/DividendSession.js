// FR-04 — Dividend Calculation: Session (period)
// A DividendSession represents one calculation period (e.g. a quarter or harvest cycle).
// When closed, the system calculates DividendPayout records for every active member.
// No payment processing here — system records/displays figures only (Chapter 1, §1.7).

const mongoose = require('mongoose');

const DividendSessionSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Session name is required'],
      trim:     true,
      // e.g. "Q1 2025 Harvest Cycle"
    },

    periodStart: {
      type:     Date,
      required: [true, 'Period start date is required'],
    },
    periodEnd: {
      type:     Date,
      required: [true, 'Period end date is required'],
    },

    status: {
      type:    String,
      enum:    ['open', 'closed', 'payouts_generated'],
      default: 'open',
    },

    // Total pool to be distributed among members (entered by admin)
    totalDividendPoolKes: {
      type:    Number,
      default: 0,
      min:     0,
      // KES = Kenyan Shillings. System records this — does NOT process payment.
    },

    // Aggregates filled in when session is closed
    totalDeliveriesKg:   { type: Number, default: 0 },
    pricePerKgKes:       { type: Number, default: 0 },  // calculated: pool / totalKg

    closedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    closedAt:  Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DividendSession', DividendSessionSchema);
