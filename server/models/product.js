const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  shortDescription: {
    type: String,
    maxLength: [250, 'Short description cannot exceed 250 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
    default: 0.0
  },
  salePrice: {
    type: Number,
    default: 0.0
  },
  onSale: {
    type: Boolean,
    default: false
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [5, 'Stock cannot exceed 5 characters'],
    default: 0
  },
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
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  // Flexible attributes schema that can store any product-specific attributes
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // References to other collections
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  categoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  typeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }],
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual field for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Middleware to update the updatedAt field on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema); 