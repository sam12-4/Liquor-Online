const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isHot: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  },
  
  // Relationships
  categoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  typeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }],
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  
  // Additional attributes
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ name: 1 });
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ categoryIds: 1 });
productSchema.index({ brandId: 1 });
productSchema.index({ typeIds: 1 });
productSchema.index({ countryId: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isHot: 1 });

module.exports = mongoose.model('Product', productSchema); 