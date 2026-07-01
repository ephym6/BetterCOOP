// FR-02 — Member Registration & Profile Management
// A Member record holds cooperative-specific data for a person who is also a User.
// Single produce type per cooperative — no multi-crop fields (Chapter 1, §1.7).

const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    // Link to the User account for auth
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      unique:   true,
    },

    // Human-readable member number (e.g. "MEM-0042") generated on creation
    memberNumber: {
      type:     String,
      required: true,
      unique:   true,
    },

    // Personal details
    fullName: {
      type:     String,
      required: [true, 'Full name is required'],
      trim:     true,
    },
    nationalId: {
      type:   String,
      unique: true,
      trim:   true,
    },
    phone: {
      type:     String,
      required: [true, 'Phone number is required for SMS notifications (FR-06)'],
      trim:     true,
    },
    alternativePhone: {
      type:  String,
      trim:  true,
    },
    email: {
      type:      String,
      lowercase: true,
      trim:      true,
    },
    physicalAddress: {
      village:  String,
      subCounty: String,
      county:   String,
    },

    // Cooperative membership details
    registrationDate: {
      type:    Date,
      default: Date.now,
    },
    sharesPurchased: {
      type:    Number,
      default: 0,
      min:     0,
    },

    // Status
    isActive: {
      type:    Boolean,
      default: true,
    },
    deactivationReason: String,
    deactivatedAt:      Date,
  },
  { timestamps: true }
);

// ── Auto-generate memberNumber before first save ──────────────────────────────
MemberSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  const count = await mongoose.model('Member').countDocuments();
  this.memberNumber = `MEM-${String(count + 1).padStart(4, '0')}`;
  next();
});

module.exports = mongoose.model('Member', MemberSchema);
