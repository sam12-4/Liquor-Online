const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
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
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be at least 6 characters long'],
    select: false // Don't include password in query results by default
  },
  avatar: {
    public_id: String,
    url: String
  },
  permissions: {
    manageProducts: {
      type: Boolean,
      default: true
    },
    manageCategories: {
      type: Boolean,
      default: true
    },
    manageBrands: {
      type: Boolean,
      default: true
    },
    manageTypes: {
      type: Boolean,
      default: true
    },
    manageCountries: {
      type: Boolean,
      default: true
    },
    manageUsers: {
      type: Boolean,
      default: true
    },
    manageOrders: {
      type: Boolean,
      default: true
    }
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
adminSchema.pre('save', async function(next) {
  // Only hash password if it was modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Hash password with strength of 10
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare admin password with provided password
adminSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
adminSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = mongoose.model('Admin', adminSchema); 