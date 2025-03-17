const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  website: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  countryId: {
    type: String
  },
  filterMetadata: {
    featured: {
      type: Boolean,
      default: false
    },
    showInFilters: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before save
BrandSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Brand', BrandSchema); 