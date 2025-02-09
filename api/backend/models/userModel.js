const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteCards: {
      type: Array,
      default: [],
    },
    lastActivity: {
      type: Number, // Store timestamp of last activity
      default: Date.now,
    },
    resetPasswordToken: String, // For password reset functionality
    resetPasswordExpires: Date, // Expiration for the password reset token
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to match password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update last activity timestamp before saving
userSchema.methods.updateLastActivity = async function () {
  this.lastActivity = Date.now();
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
