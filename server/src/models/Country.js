const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  flag: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Metadata
  filterMetadata: {
    showInFilters: {
      type: Boolean,
      default: true
    },
    regionId: {
      type: String,
      trim: true,
      lowercase: true
    }
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
countrySchema.index({ code: 1 }, { unique: true });
countrySchema.index({ isActive: 1 });
countrySchema.index({ 'filterMetadata.regionId': 1 });

module.exports = mongoose.model('Country', countrySchema); 