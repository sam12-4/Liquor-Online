const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markReviewHelpful,
  reportReview,
  getAdminReviews,
  approveReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/product/:productId')
  .get(getProductReviews);

// Private routes
router.route('/product/:productId')
  .post(protect, createReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.route('/:id/helpful')
  .put(protect, markReviewHelpful);

router.route('/:id/report')
  .put(protect, reportReview);

// Admin routes
router.route('/admin')
  .get(protect, admin, getAdminReviews);

router.route('/admin/:id')
  .put(protect, admin, approveReview);

module.exports = router; 