const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getUserOrderById,
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
  cancelOrder,
  subscribeToSMSNotifications,
  createGuestOrder,
  trackGuestOrder,
  cancelGuestOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/track')
  .post(trackOrder);  // Track order by order number and email (no auth required)

router.route('/track/:orderNumber')
  .get(async (req, res, next) => {
    // Convert GET parameter to POST body format
    req.body = {
      orderNumber: req.params.orderNumber,
      email: req.query.email
    };
    return trackOrder(req, res, next);
  });  // Alternative GET method for tracking

// Guest order routes (public)
router.route('/guest').post(createGuestOrder);
router.route('/guest/track').post(trackGuestOrder);
router.route('/guest/cancel').put(cancelGuestOrder);

// User routes
router.route('/')
  .post(protect, createOrder)     // Create order
  .get(protect, getUserOrders);   // Get logged in user orders

router.route('/:id')
  .get(protect, getUserOrderById); // Get user's specific order

router.route('/:id/cancel')
  .put(protect, cancelOrder);      // Cancel order by user

router.route('/:id/subscribe-sms')
  .post(protect, subscribeToSMSNotifications);  // Subscribe to SMS notifications

// Admin routes
router.route('/admin')
  .get(protect, admin, getAdminOrders); // Get all orders - admin only

router.route('/admin/:id')
  .get(protect, admin, getAdminOrderById)     // Get order by ID - admin only
  .put(protect, admin, updateOrderStatus)     // Update order status - admin only
  .delete(protect, admin, deleteOrder);       // Delete order - admin only

module.exports = router; 