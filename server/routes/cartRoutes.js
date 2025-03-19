const express = require('express');
const router = express.Router();
const {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyCoupon,
  removeCoupon
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getUserCart)
  .delete(clearCart);

router.route('/items')
  .post(addItemToCart);

router.route('/items/:productId')
  .put(updateCartItem)
  .delete(removeCartItem);

router.route('/coupon')
  .post(applyCoupon)
  .delete(removeCoupon);

module.exports = router; 