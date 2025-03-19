const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get user's cart
 * @route   GET /api/carts
 * @access  Private
 */
exports.getUserCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id })
    .populate({
      path: 'items.product',
      select: 'name images stock onSale price salePrice'
    });

  if (!cart) {
    // Create a new cart if one doesn't exist
    cart = await Cart.create({
      user: req.user.id,
      items: []
    });
  }

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * Add item to cart
 * @route   POST /api/carts/items
 * @access  Private
 */
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  // Validate input
  if (!productId) {
    return next(new ErrorHandler('Please provide product ID', 400));
  }

  // Find or create cart
  let cart = await Cart.findOrCreateUserCart(req.user.id);

  // Add item to cart
  try {
    cart = await cart.addItem(productId, quantity);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

  // Populate product details for response
  cart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name images stock onSale price salePrice'
  });

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * Update cart item quantity
 * @route   PUT /api/carts/items/:productId
 * @access  Private
 */
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const productId = req.params.productId;

  // Validate input
  if (!quantity || quantity < 1) {
    return next(new ErrorHandler('Please provide a valid quantity', 400));
  }

  // Find cart
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Check if product is in stock
  if (product.stock < quantity) {
    return next(new ErrorHandler(`Only ${product.stock} items available in stock`, 400));
  }

  // Find item in cart
  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new ErrorHandler('Item not found in cart', 404));
  }

  // Update quantity and price (in case price changed)
  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].price = product.onSale ? product.salePrice : product.price;

  // Save cart
  await cart.save();

  // Populate product details for response
  cart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name images stock onSale price salePrice'
  });

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * Remove item from cart
 * @route   DELETE /api/carts/items/:productId
 * @access  Private
 */
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  // Find cart
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  // Remove item from cart
  await cart.removeItem(productId);

  // Populate product details for response
  cart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name images stock onSale price salePrice'
  });

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * Clear cart
 * @route   DELETE /api/carts
 * @access  Private
 */
exports.clearCart = asyncHandler(async (req, res, next) => {
  // Find cart
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  // Clear cart
  await cart.clearCart();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully'
  });
});

/**
 * Apply coupon to cart
 * @route   POST /api/carts/coupon
 * @access  Private
 */
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new ErrorHandler('Please provide coupon code', 400));
  }

  // Find cart
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  // Find coupon
  const coupon = await Coupon.findOne({ 
    code: code.toUpperCase(),
    isActive: true
  });

  if (!coupon) {
    return next(new ErrorHandler('Invalid or expired coupon', 400));
  }

  // Check if coupon can be used
  const canUse = await coupon.canBeUsedByUser(req.user.id, cart.subtotal);
  
  if (!canUse.valid) {
    return next(new ErrorHandler(canUse.message, 400));
  }

  // Apply coupon
  cart.couponCode = coupon.code;
  cart.couponDiscount = coupon.type === 'percentage' 
    ? coupon.value 
    : (coupon.value / cart.subtotal) * 100; // Convert fixed amount to percentage

  // Save cart
  await cart.save();

  // Populate product details for response
  cart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name images stock onSale price salePrice'
  });

  res.status(200).json({
    success: true,
    data: cart
  });
});

/**
 * Remove coupon from cart
 * @route   DELETE /api/carts/coupon
 * @access  Private
 */
exports.removeCoupon = asyncHandler(async (req, res, next) => {
  // Find cart
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  // Remove coupon
  cart.couponCode = null;
  cart.couponDiscount = 0;

  // Save cart
  await cart.save();

  // Populate product details for response
  cart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name images stock onSale price salePrice'
  });

  res.status(200).json({
    success: true,
    data: cart
  });
}); 