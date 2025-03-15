const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
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
    type: String
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
  
  // Relationships
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  
  // Metadata for filtering
  filterMetadata: {
    featured: {
      type: Boolean,
      default: false
    },
    showInFilters: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
brandSchema.index({ slug: 1 }, { unique: true });
brandSchema.index({ countryId: 1 });
brandSchema.index({ isActive: 1 });
brandSchema.index({ 'filterMetadata.featured': 1 });

module.exports = mongoose.model('Brand', brandSchema); 