const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0,
    default: 0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        default: ''
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  isHot: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  attributes: {
    type: Map,
    of: String
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  categoryIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  typeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Type'
  }],
  countryId: {
    type: String,
    default: ''
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ brandId: 1 });
productSchema.index({ categoryIds: 1 });
productSchema.index({ typeIds: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isHot: 1 });
productSchema.index({ price: 1 });

// Debug the schema
console.log('Product schema defined with fields:', Object.keys(productSchema.paths));
console.log('Images field type:', productSchema.path('images'));

module.exports = mongoose.model('Product', productSchema); 