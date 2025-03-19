const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

// Ensure each product only appears once in the wishlist
wishlistSchema.index({ user: 1, 'products.product': 1 }, { unique: true });

// Add product to wishlist
wishlistSchema.methods.addProduct = async function(productId) {
  // Check if product already exists in wishlist
  const exists = this.products.some(
    item => item.product.toString() === productId.toString()
  );
  
  if (!exists) {
    this.products.push({
      product: productId,
      addedAt: Date.now()
    });
    
    await this.save();
  }
  
  return this;
};

// Remove product from wishlist
wishlistSchema.methods.removeProduct = async function(productId) {
  this.products = this.products.filter(
    item => item.product.toString() !== productId.toString()
  );
  
  await this.save();
  return this;
};

// Check if product is in wishlist
wishlistSchema.methods.hasProduct = function(productId) {
  return this.products.some(
    item => item.product.toString() === productId.toString()
  );
};

// Find or create wishlist for user
wishlistSchema.statics.findOrCreate = async function(userId) {
  let wishlist = await this.findOne({ user: userId });
  
  if (!wishlist) {
    wishlist = await this.create({
      user: userId,
      products: []
    });
  }
  
  return wishlist;
};

module.exports = mongoose.model('Wishlist', wishlistSchema); 