const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
    ref: 'brand'
  },
  categoryIds: [{
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  }],
  typeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'type'
  }],
  countryId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ sku: 1 });
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ categoryIds: 1 });
ProductSchema.index({ typeIds: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isHot: 1 });
ProductSchema.index({ price: 1 });

module.exports = mongoose.model('product', ProductSchema); 