const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  
  // Relationships
  categoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  
  // Metadata
  filterMetadata: {
    displayName: {
      type: String
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
typeSchema.index({ slug: 1 }, { unique: true });
typeSchema.index({ categoryIds: 1 });
typeSchema.index({ isActive: 1 });
typeSchema.index({ displayOrder: 1 });

module.exports = mongoose.model('Type', typeSchema); 