const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxLength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  pros: {
    type: [String],
    default: []
  },
  cons: {
    type: [String],
    default: []
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedAt: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  isHelpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  isNotHelpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  images: [
    {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String,
  reportedAt: Date,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Update product rating count and average when review is created/updated
reviewSchema.statics.getAverageRating = async function(productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId, isApproved: true }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    if (result.length > 0) {
      await mongoose.model('Product').findByIdAndUpdate(productId, {
        rating: result[0].averageRating,
        ratingCount: result[0].numReviews,
        reviewCount: result[0].numReviews
      });
    } else {
      // If no approved reviews, reset product rating stats
      await mongoose.model('Product').findByIdAndUpdate(productId, {
        rating: 0,
        ratingCount: 0,
        reviewCount: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.product);
});

// Call getAverageRating after remove - replace with findOneAndDelete
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await mongoose.model('Review').getAverageRating(doc.product);
  }
});

// Also add middleware for findByIdAndDelete
reviewSchema.post('findByIdAndDelete', async function(doc) {
  if (doc) {
    await mongoose.model('Review').getAverageRating(doc.product);
  }
});

module.exports = mongoose.model('Review', reviewSchema); 