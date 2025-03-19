const express = require('express');
const router = express.Router();
const {
  getActiveCoupons,
  validateCoupon,
  getAllCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/active').get(getActiveCoupons);

// Private routes
router.route('/validate').post(protect, validateCoupon);

// Admin routes
router.route('/')
  .get(protect, admin, getAllCoupons)
  .post(protect, admin, createCoupon);

router.route('/:id')
  .get(protect, admin, getCoupon)
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon);

router.route('/:id/toggle-status')
  .put(protect, admin, toggleCouponStatus);

module.exports = router; 