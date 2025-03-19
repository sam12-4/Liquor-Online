const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
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
    required: true,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  }
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  couponCode: {
    type: String
  },
  couponDiscount: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  },
  totalQuantity: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  // Calculate totals
  this.totalItems = this.items.length;
  this.totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
  this.subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Apply coupon discount if available
  const discountAmount = this.couponDiscount > 0 
    ? (this.subtotal * (this.couponDiscount / 100)) 
    : 0;
  
  // Calculate tax (usually handled by tax service based on location)
  // Basic implementation: calculate tax percentage on subtotal after discount
  const taxRate = 0.10; // 10% tax rate (should be configured or calculated based on location)
  this.tax = (this.subtotal - discountAmount) * taxRate;
  
  // Calculate final total
  this.total = this.subtotal - discountAmount + this.tax + this.shippingCost;
  
  // Update last active time
  this.lastActive = Date.now();
  
  next();
});

// Find or create cart for user
cartSchema.statics.findOrCreateUserCart = async function(userId) {
  let cart = await this.findOne({ user: userId });
  
  if (!cart) {
    // Create new cart for user
    cart = await this.create({ 
      user: userId,
      items: []
    });
  }
  
  return cart;
};

// Add item to cart
cartSchema.methods.addItem = async function(productId, quantity = 1) {
  // Find product in database to get current price
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Check if product is in stock
  if (product.stock < quantity) {
    throw new Error('Product is out of stock');
  }
  
  // Check if product already in cart
  const itemIndex = this.items.findIndex(item => 
    item.product.toString() === productId.toString()
  );
  
  if (itemIndex > -1) {
    // Update existing item
    this.items[itemIndex].quantity += quantity;
    this.items[itemIndex].price = product.onSale ? product.salePrice : product.price;
  } else {
    // Add new item
    this.items.push({
      product: productId,
      name: product.name,
      image: product.images.length > 0 ? product.images[0].url : '',
      price: product.onSale ? product.salePrice : product.price,
      quantity
    });
  }
  
  // Save cart
  return await this.save();
};

// Remove item from cart
cartSchema.methods.removeItem = async function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  
  return await this.save();
};

// Clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  this.couponCode = null;
  this.couponDiscount = 0;
  
  return await this.save();
};

module.exports = mongoose.model('Cart', cartSchema); 