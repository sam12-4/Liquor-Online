const express = require('express');
const router = express.Router();
const {
  getUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  checkProductInWishlist,
  clearWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getUserWishlist)
  .post(addProductToWishlist)
  .delete(clearWishlist);

router.route('/:productId')
  .delete(removeProductFromWishlist);

router.route('/check/:productId')
  .get(checkProductInWishlist);

module.exports = router; 