const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please enter coupon code'],
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed_amount'],
    default: 'percentage'
  },
  value: {
    type: Number,
    required: [true, 'Please enter coupon value'],
    min: [0, 'Value cannot be negative']
  },
  description: {
    type: String,
    maxLength: [200, 'Description cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: [true, 'Please provide expiration date']
  },
  minimumPurchase: {
    type: Number,
    default: 0
  },
  maximumDiscount: {
    type: Number,
    default: null
  },
  usageLimit: {
    total: {
      type: Number,
      default: null // null means unlimited
    },
    perUser: {
      type: Number,
      default: 1
    }
  },
  totalUsed: {
    type: Number,
    default: 0
  },
  usedBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      usedCount: {
        type: Number,
        default: 0
      },
      lastUsed: {
        type: Date
      }
    }
  ],
  appliesTo: {
    allProducts: {
      type: Boolean,
      default: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
      }
    ]
  },
  restrictions: {
    excludedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    newCustomersOnly: {
      type: Boolean,
      default: false
    },
    firstOrderOnly: {
      type: Boolean,
      default: false
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.isActive && 
    now >= this.validFrom && 
    now <= this.validUntil &&
    (this.usageLimit.total === null || this.totalUsed < this.usageLimit.total)
  );
};

// Check if coupon can be used by user
couponSchema.methods.canBeUsedByUser = async function(userId, orderAmount) {
  // Check if coupon is valid
  if (!this.isValid()) {
    return { valid: false, message: 'Coupon is invalid or expired' };
  }
  
  // Check minimum purchase
  if (orderAmount < this.minimumPurchase) {
    return { 
      valid: false, 
      message: `Minimum purchase amount of $${this.minimumPurchase.toFixed(2)} required` 
    };
  }
  
  // Check if user has already used this coupon
  const userUsage = this.usedBy.find(usage => 
    usage.user.toString() === userId.toString()
  );
  
  if (userUsage && userUsage.usedCount >= this.usageLimit.perUser) {
    return { 
      valid: false, 
      message: `Coupon usage limit reached (${this.usageLimit.perUser} per user)` 
    };
  }
  
  // Check new customer restriction
  if (this.restrictions.newCustomersOnly || this.restrictions.firstOrderOnly) {
    // This would need to check the user's order history
    const Order = mongoose.model('Order');
    const previousOrders = await Order.countDocuments({ user: userId });
    
    if (previousOrders > 0) {
      return { 
        valid: false, 
        message: 'Coupon is for new customers only' 
      };
    }
  }
  
  return { valid: true };
};

// Calculate discount amount
couponSchema.methods.calculateDiscount = function(subtotal) {
  let discount = 0;
  
  if (this.type === 'percentage') {
    discount = subtotal * (this.value / 100);
  } else if (this.type === 'fixed_amount') {
    discount = this.value;
  }
  
  // Apply maximum discount if set
  if (this.maximumDiscount !== null && discount > this.maximumDiscount) {
    discount = this.maximumDiscount;
  }
  
  return discount;
};

// Record usage of coupon by user
couponSchema.methods.recordUsage = async function(userId) {
  // Find if user has used this coupon before
  const userIndex = this.usedBy.findIndex(usage => 
    usage.user.toString() === userId.toString()
  );
  
  if (userIndex > -1) {
    // Increment usage count
    this.usedBy[userIndex].usedCount += 1;
    this.usedBy[userIndex].lastUsed = Date.now();
  } else {
    // Add new usage record
    this.usedBy.push({
      user: userId,
      usedCount: 1,
      lastUsed: Date.now()
    });
  }
  
  // Increment total usage
  this.totalUsed += 1;
  
  return this.save();
};

module.exports = mongoose.model('Coupon', couponSchema); 