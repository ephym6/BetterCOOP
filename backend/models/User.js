// FR-01 — User Authentication & Role-Based Access
// Roles: 'admin' (Cooperative Administrator/Clerk) | 'member' (Cooperative Member)
// NOT HERE: 'board', 'super_admin' — out of scope (Chapter 1, §1.5)

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:     String,
      required: [true, 'Password is required'],
      minlength: 6,
      select:   false,  // never returned in queries unless explicitly asked
    },
    role: {
      type:    String,
      enum:    ['admin', 'member'],
      default: 'member',
    },
    // Link admin users to a cooperative; members linked via Member document
    cooperativeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Cooperative',     // future: cooperative profile collection
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// ── Hash password before saving ──────────────────────────────────────────────
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Instance method: compare candidate password ──────────────────────────────
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
