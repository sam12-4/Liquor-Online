const Review = require('../models/review');
const Product = require('../models/product');
const Order = require('../models/order');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get reviews for a product
 * @route   GET /api/reviews/product/:productId
 * @access  Public
 */
exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ 
    product: req.params.productId,
    isApproved: true 
  })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

/**
 * Create new review
 * @route   POST /api/reviews/product/:productId
 * @access  Private
 */
exports.createReview = asyncHandler(async (req, res, next) => {
  const { rating, title, comment, pros, cons } = req.body;
  const productId = req.params.productId;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Check if user has purchased the product
  const userOrders = await Order.find({ 
    user: req.user.id,
    status: { $in: ['delivered', 'shipped'] },
    'orderItems.product': productId
  });

  const isPurchased = userOrders.length > 0;

  // Check if user already reviewed this product
  const existingReview = await Review.findOne({
    user: req.user.id,
    product: productId
  });

  if (existingReview) {
    return next(new ErrorHandler('You have already reviewed this product', 400));
  }

  // Create review
  const review = await Review.create({
    user: req.user.id,
    product: productId,
    rating,
    title,
    comment,
    pros: pros || [],
    cons: cons || [],
    isVerifiedPurchase: isPurchased,
    // Auto-approve if no moderation required, otherwise admin will approve
    isApproved: process.env.AUTO_APPROVE_REVIEWS === 'true'
  });

  res.status(201).json({
    success: true,
    data: review
  });
});

/**
 * Update review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler('Review not found', 404));
  }

  // Check if review belongs to user
  if (review.user.toString() !== req.user.id) {
    return next(new ErrorHandler('Not authorized to update this review', 401));
  }

  // Update fields
  const { rating, title, comment, pros, cons } = req.body;
  
  if (rating) review.rating = rating;
  if (title) review.title = title;
  if (comment) review.comment = comment;
  if (pros) review.pros = pros;
  if (cons) review.cons = cons;

  // Set to not approved if content is updated (requires re-approval)
  review.isApproved = false;
  
  review = await review.save();

  res.status(200).json({
    success: true,
    data: review
  });
});

/**
 * Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler('Review not found', 404));
  }

  // Check if review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorHandler('Not authorized to delete this review', 401));
  }

  // Store product ID before deleting to update rating
  const productId = review.product;

  // Use findByIdAndDelete instead of remove
  await Review.findByIdAndDelete(req.params.id);

  // Manually call getAverageRating since post middleware won't run
  await Review.getAverageRating(productId);

  res.status(200).json({
    success: true,
    message: 'Review deleted'
  });
});

/**
 * Mark review as helpful/not helpful
 * @route   PUT /api/reviews/:id/helpful
 * @access  Private
 */
exports.markReviewHelpful = asyncHandler(async (req, res, next) => {
  const { isHelpful } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler('Review not found', 404));
  }

  // Check if user is the author of the review
  if (review.user.toString() === req.user.id) {
    return next(new ErrorHandler('You cannot vote on your own review', 400));
  }

  // Remove previous vote if any
  review.isHelpful.users = review.isHelpful.users.filter(
    user => user.toString() !== req.user.id
  );
  review.isNotHelpful.users = review.isNotHelpful.users.filter(
    user => user.toString() !== req.user.id
  );

  // Add new vote
  if (isHelpful === true) {
    review.isHelpful.users.push(req.user.id);
  } else if (isHelpful === false) {
    review.isNotHelpful.users.push(req.user.id);
  }

  // Update counts
  review.isHelpful.count = review.isHelpful.users.length;
  review.isNotHelpful.count = review.isNotHelpful.users.length;

  await review.save();

  res.status(200).json({
    success: true,
    data: review
  });
});

/**
 * Report review
 * @route   PUT /api/reviews/:id/report
 * @access  Private
 */
exports.reportReview = asyncHandler(async (req, res, next) => {
  const { reason } = req.body;
  
  if (!reason) {
    return next(new ErrorHandler('Please provide a reason for reporting', 400));
  }

  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler('Review not found', 404));
  }

  // Check if user is the author of the review
  if (review.user.toString() === req.user.id) {
    return next(new ErrorHandler('You cannot report your own review', 400));
  }

  review.isReported = true;
  review.reportReason = reason;
  review.reportedAt = Date.now();
  review.reportedBy = req.user.id;

  await review.save();

  res.status(200).json({
    success: true,
    message: 'Review reported successfully'
  });
});

/**
 * Admin: Get all reviews 
 * @route   GET /api/reviews/admin
 * @access  Private/Admin
 */
exports.getAdminReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .populate('user', 'name email')
    .populate('product', 'name images')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

/**
 * Admin: Approve/reject review 
 * @route   PUT /api/reviews/admin/:id
 * @access  Private/Admin
 */
exports.approveReview = asyncHandler(async (req, res, next) => {
  const { isApproved } = req.body;
  
  if (isApproved === undefined) {
    return next(new ErrorHandler('Please specify approval status', 400));
  }

  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler('Review not found', 404));
  }

  review.isApproved = isApproved;
  
  if (isApproved) {
    review.approvedAt = Date.now();
    review.approvedBy = req.user.id;
  } else {
    review.approvedAt = null;
    review.approvedBy = null;
  }

  await review.save();

  res.status(200).json({
    success: true,
    data: review
  });
}); 