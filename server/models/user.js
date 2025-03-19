const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [50, 'Your name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    minlength: [6, 'Your password must be at least 6 characters long'],
    select: false // Don't include password in query results by default
  },
  avatar: {
    public_id: String,
    url: String
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows multiple null values (for non-Google users)
  },
  isGoogleAccount: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  // Only hash password if it was modified and user is not using Google auth
  if (!this.isModified('password') || this.isGoogleAccount) {
    return next();
  }
  
  // Hash password with strength of 10
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password with provided password
userSchema.methods.comparePassword = async function(enteredPassword) {
  // Google users don't have a password to compare
  if (this.isGoogleAccount) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = mongoose.model('User', userSchema); 