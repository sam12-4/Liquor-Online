const Coupon = require('../models/coupon');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get all active coupons
 * @route   GET /api/coupons/active
 * @access  Public
 */
exports.getActiveCoupons = asyncHandler(async (req, res, next) => {
  const now = new Date();
  
  const coupons = await Coupon.find({
    isActive: true,
    validFrom: { $lte: now },
    validUntil: { $gte: now }
  }).select('code type value description minimumPurchase validUntil');

  res.status(200).json({
    success: true,
    count: coupons.length,
    data: coupons
  });
});

/**
 * Validate coupon
 * @route   POST /api/coupons/validate
 * @access  Private
 */
exports.validateCoupon = asyncHandler(async (req, res, next) => {
  const { code, cartTotal } = req.body;

  if (!code) {
    return next(new ErrorHandler('Please provide coupon code', 400));
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase()
  });

  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  // Check if coupon is valid
  if (!coupon.isValid()) {
    return next(new ErrorHandler('Coupon is invalid or expired', 400));
  }

  // Check if user can use this coupon
  const canUse = await coupon.canBeUsedByUser(req.user.id, cartTotal || 0);

  if (!canUse.valid) {
    return next(new ErrorHandler(canUse.message, 400));
  }

  // Calculate discount
  const discount = coupon.calculateDiscount(cartTotal || 0);

  res.status(200).json({
    success: true,
    data: {
      code: coupon.code,
      discount,
      type: coupon.type,
      value: coupon.value,
      minimumPurchase: coupon.minimumPurchase
    }
  });
});

/**
 * Admin: Get all coupons
 * @route   GET /api/coupons
 * @access  Private/Admin
 */
exports.getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: coupons.length,
    data: coupons
  });
});

/**
 * Admin: Create new coupon
 * @route   POST /api/coupons
 * @access  Private/Admin
 */
exports.createCoupon = asyncHandler(async (req, res, next) => {
  // Add admin as creator
  req.body.createdBy = req.user.id;

  const coupon = await Coupon.create(req.body);

  res.status(201).json({
    success: true,
    data: coupon
  });
});

/**
 * Admin: Get single coupon
 * @route   GET /api/coupons/:id
 * @access  Private/Admin
 */
exports.getCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  res.status(200).json({
    success: true,
    data: coupon
  });
});

/**
 * Admin: Update coupon
 * @route   PUT /api/coupons/:id
 * @access  Private/Admin
 */
exports.updateCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: coupon
  });
});

/**
 * Admin: Delete coupon
 * @route   DELETE /api/coupons/:id
 * @access  Private/Admin
 */
exports.deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  await Coupon.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully'
  });
});

/**
 * Admin: Toggle coupon active status
 * @route   PUT /api/coupons/:id/toggle-status
 * @access  Private/Admin
 */
exports.toggleCouponStatus = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  coupon.isActive = !coupon.isActive;
  await coupon.save();

  res.status(200).json({
    success: true,
    data: coupon
  });
}); 