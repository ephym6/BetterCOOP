// FR-03 — Produce Delivery Logging
// Records each delivery a member makes to the cooperative.
// Single produce type per cooperative — no crop-type field (Chapter 1, §1.7).
// No pricing/payment here — dividends are calculated later in DividendSession (FR-04).

const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema(
  {
    memberId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Member',
      required: [true, 'Member is required'],
    },

    // Which dividend session this delivery will roll into (set when session closes — FR-04)
    dividendSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'DividendSession',
      default: null,
    },

    deliveryDate: {
      type:     Date,
      required: [true, 'Delivery date is required'],
      default:  Date.now,
    },

    // Quantity in kilograms (cooperative-defined unit)
    quantityKg: {
      type:     Number,
      required: [true, 'Quantity is required'],
      min:      [0.1, 'Quantity must be greater than 0'],
    },

    // Optional quality grading (A, B, C etc.) — cooperative-defined
    grade: {
      type:    String,
      enum:    ['A', 'B', 'C', 'Ungraded'],
      default: 'Ungraded',
    },

    // Free-text notes from the clerk
    notes: {
      type: String,
      trim: true,
    },

    // Who logged this delivery (admin/clerk user id)
    loggedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },

    // Soft-delete / void support (clerk mistake correction)
    isVoided: {
      type:    Boolean,
      default: false,
    },
    voidedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voidedAt:     Date,
    voidReason:   String,
  },
  { timestamps: true }
);

// ── Indexes for common query patterns ────────────────────────────────────────
DeliverySchema.index({ memberId: 1, deliveryDate: -1 });
DeliverySchema.index({ dividendSessionId: 1 });

module.exports = mongoose.model('Delivery', DeliverySchema);
