const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get user's wishlist
 * @route   GET /api/wishlists
 * @access  Private
 */
exports.getUserWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id })
    .populate({
      path: 'products.product',
      select: 'name images price salePrice onSale stock slug'
    });

  // If no wishlist found, create a new one
  if (!wishlist) {
    const newWishlist = await Wishlist.create({
      user: req.user.id,
      products: []
    });

    return res.status(200).json({
      success: true,
      data: newWishlist
    });
  }

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

/**
 * Add product to wishlist
 * @route   POST /api/wishlists
 * @access  Private
 */
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next(new ErrorHandler('Please provide product ID', 400));
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Find or create wishlist
  let wishlist = await Wishlist.findOrCreate(req.user.id);

  // Add product to wishlist
  await wishlist.addProduct(productId);

  // Populate product details for response
  wishlist = await Wishlist.findById(wishlist._id).populate({
    path: 'products.product',
    select: 'name images price salePrice onSale stock slug'
  });

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

/**
 * Remove product from wishlist
 * @route   DELETE /api/wishlists/:productId
 * @access  Private
 */
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  // Find wishlist
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) {
    return next(new ErrorHandler('Wishlist not found', 404));
  }

  // Remove product from wishlist
  await wishlist.removeProduct(productId);

  // Populate product details for response
  wishlist = await Wishlist.findById(wishlist._id).populate({
    path: 'products.product',
    select: 'name images price salePrice onSale stock slug'
  });

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

/**
 * Check if product is in wishlist
 * @route   GET /api/wishlists/check/:productId
 * @access  Private
 */
exports.checkProductInWishlist = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;

  // Find wishlist
  const wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) {
    return res.status(200).json({
      success: true,
      inWishlist: false
    });
  }

  // Check if product is in wishlist
  const inWishlist = wishlist.hasProduct(productId);

  res.status(200).json({
    success: true,
    inWishlist
  });
});

/**
 * Clear wishlist
 * @route   DELETE /api/wishlists
 * @access  Private
 */
exports.clearWishlist = asyncHandler(async (req, res, next) => {
  // Find wishlist
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) {
    return next(new ErrorHandler('Wishlist not found', 404));
  }

  // Clear wishlist
  wishlist.products = [];
  await wishlist.save();

  res.status(200).json({
    success: true,
    message: 'Wishlist cleared successfully'
  });
}); 