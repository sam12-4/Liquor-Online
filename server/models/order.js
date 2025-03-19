const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1']
  }
});

const statusHistorySchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
  },
  comment: {
    type: String
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  updatedByModel: {
    type: String,
    required: true,
    enum: ['User', 'Admin', 'Guest']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  guestDetails: {
    name: String,
    email: String,
    phone: String
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    fullName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['paypal', 'stripe', 'credit_card', 'cash_on_delivery']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  subtotalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  statusHistory: [statusHistorySchema],
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  trackingNumber: {
    type: String
  },
  shippingMethod: {
    type: String
  },
  estimatedDeliveryDate: {
    type: Date
  },
  smsNotificationNumber: {
    type: String,
    validate: {
      validator: function(v) {
        // Basic phone number validation
        return /^\+?[1-9]\d{9,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  notes: {
    type: String
  },
  couponCode: {
    type: String
  },
  couponDiscount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate a unique order number (format: YYMM-XXXXX)
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const prefix = `${year}${month}`;
    
    // Find the highest order number with this prefix
    const highestOrder = await this.constructor.findOne(
      { orderNumber: new RegExp('^' + prefix) },
      {},
      { sort: { orderNumber: -1 } }
    );
    
    let counter = 10000; // Start at 10000 so we get 5-digit numbers
    
    if (highestOrder && highestOrder.orderNumber) {
      // Extract the counter from existing order number
      const highestCounter = parseInt(highestOrder.orderNumber.split('-')[1]);
      counter = highestCounter + 1;
    }
    
    // Set the order number
    this.orderNumber = `${prefix}-${counter}`;
    
    // Add first status history entry
    this.statusHistory.push({
      status: this.status,
      comment: 'Order created',
      updatedBy: this.isGuest ? this._id : this.user,
      updatedByModel: this.isGuest ? 'Guest' : 'User'
    });
  }
  
  next();
});

// Calculate order total
orderSchema.methods.calculateTotals = function() {
  // Calculate subtotal
  this.subtotalPrice = this.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  // Apply coupon discount if any
  const discountAmount = this.couponDiscount || 0;
  
  // Final total
  this.totalPrice = this.subtotalPrice + this.taxPrice + this.shippingPrice - discountAmount;
  
  return this.totalPrice;
};

// Add public methods

// Cancel order
orderSchema.methods.cancelOrder = async function(userId, isAdmin = false) {
  if (this.status === 'delivered' || this.status === 'refunded') {
    throw new Error('Cannot cancel order that has been delivered or refunded');
  }
  
  this.status = 'cancelled';
  
  // Add to status history
  this.statusHistory.push({
    status: 'cancelled',
    comment: 'Order cancelled by ' + (isAdmin ? 'admin' : 'user'),
    updatedBy: userId,
    updatedByModel: isAdmin ? 'Admin' : 'User'
  });
  
  await this.save();
  return this;
};

// Refund order
orderSchema.methods.refundOrder = async function(adminId, comment) {
  if (this.status !== 'delivered' && this.status !== 'shipped') {
    throw new Error('Only delivered or shipped orders can be refunded');
  }
  
  this.status = 'refunded';
  
  // Add to status history
  this.statusHistory.push({
    status: 'refunded',
    comment: comment || 'Order refunded',
    updatedBy: adminId,
    updatedByModel: 'Admin'
  });
  
  await this.save();
  return this;
};

// Static methods

// Get all orders by a user
orderSchema.statics.getOrdersByUser = async function(userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Get all pending orders
orderSchema.statics.getPendingOrders = async function() {
  return this.find({ status: 'pending' }).sort({ createdAt: 1 });
};

// Get sales statistics
orderSchema.statics.getSalesStats = async function(startDate, endDate) {
  const match = {
    status: { $nin: ['cancelled', 'refunded'] }
  };
  
  if (startDate && endDate) {
    match.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  const stats = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
        avgOrderValue: { $avg: '$totalPrice' }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : { totalSales: 0, totalOrders: 0, avgOrderValue: 0 };
};

// Get daily sales for a date range
orderSchema.statics.getDailySales = async function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        status: { $nin: ['cancelled', 'refunded'] }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 