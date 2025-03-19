const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const Notification = require('../models/notification');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin');

/**
 * Get all orders - admin
 * @route   GET /api/orders/admin
 * @access  Private/Admin
 */
exports.getAdminOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

/**
 * Get single order by ID - admin
 * @route   GET /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.getAdminOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate({
      path: 'orderItems.product',
      select: 'name images'
    });
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

/**
 * Update order status - admin
 * @route   PUT /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, notes, trackingNumber, shippingMethod, estimatedDeliveryDate } = req.body;
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  // Update order fields
  if (status) {
    order.status = status;
    
    // Add status history entry
    order.statusHistory.push({
      status,
      comment: req.body.comment || `Order status updated to ${status}`,
      updatedBy: req.user.id,
      updatedByModel: 'Admin'
    });
    
    // Update special status fields
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (status === 'processing' && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    
    // Send notification to user
    await Notification.createNotification({
      recipient: order.user,
      recipientModel: 'User',
      title: `Order Status Updated: ${status}`,
      message: `Your order #${order._id} has been updated to: ${status}`,
      type: 'order_status_changed',
      reference: {
        model: 'Order',
        id: order._id
      }
    });
  }
  
  // Update other fields if provided
  if (notes) order.notes = notes;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (shippingMethod) order.shippingMethod = shippingMethod;
  if (estimatedDeliveryDate) order.estimatedDeliveryDate = estimatedDeliveryDate;
  
  await order.save();
  
  res.status(200).json({
    success: true,
    data: order
  });
});

/**
 * Delete order - admin
 * @route   DELETE /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  await Order.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  });
});

/**
 * Get logged in user's orders
 * @route   GET /api/orders
 * @access  Private
 */
exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

/**
 * Get single order by ID - for logged in user
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getUserOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id
  })
  .populate({
    path: 'orderItems.product',
    select: 'name images'
  })
  .populate({
    path: 'statusHistory.updatedBy',
    select: 'name',
    model: function(doc) {
      return doc.updatedByModel;
    }
  });
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

/**
 * Create new order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  
  // Validate required fields
  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler('No order items', 400));
  }
  
  if (!shippingAddress) {
    return next(new ErrorHandler('Shipping address is required', 400));
  }
  
  // Calculate prices from items and verify
  let subtotal = 0;
  
  // Verify products and prices
  for (const item of orderItems) {
    const productFromDB = await Product.findById(item.product);
    
    if (!productFromDB) {
      return next(new ErrorHandler(`Product not found: ${item.product}`, 404));
    }
    
    // Verify price
    const correctPrice = productFromDB.onSale 
      ? productFromDB.salePrice 
      : productFromDB.price;
    
    if (item.price !== correctPrice) {
      return next(new ErrorHandler('Product price is invalid', 400));
    }
    
    // Verify stock
    if (productFromDB.stock < item.quantity) {
      return next(
        new ErrorHandler(
          `Product ${productFromDB.name} is out of stock. Only ${productFromDB.stock} available.`,
          400
        )
      );
    }
    
    // Add to subtotal
    subtotal += item.price * item.quantity;
  }
  
  // Create order
  const order = await Order.create({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    subtotalPrice: subtotal,
    totalPrice
  });
  
  // Update product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }
  
  // Clear user's cart if it exists
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      await cart.clearCart();
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    // Continue even if cart clearing fails
  }
  
  // Create notification for user
  await Notification.createNotification({
    recipient: req.user.id,
    recipientModel: 'User',
    title: 'Order Placed Successfully',
    message: `Your order #${order._id} has been placed successfully.`,
    type: 'order_placed',
    reference: {
      model: 'Order',
      id: order._id
    }
  });
  
  // Create notification for admin
  const admins = await Admin.find({});
  for (const admin of admins) {
    await Notification.createNotification({
      recipient: admin._id,
      recipientModel: 'Admin',
      title: 'New Order Received',
      message: `A new order #${order._id} has been placed by ${req.user.name}.`,
      type: 'order_placed',
      reference: {
        model: 'Order',
        id: order._id
      }
    });
  }
  
  res.status(201).json({
    success: true,
    data: order
  });
});

/**
 * Track order by ID and email (public access)
 * @route   POST /api/orders/track
 * @access  Public
 */
exports.trackOrder = asyncHandler(async (req, res, next) => {
  const { orderNumber, email } = req.body;
  
  if (!orderNumber || !email) {
    return next(new ErrorHandler('Please provide order number and email', 400));
  }
  
  // Find the order
  const order = await Order.findOne({ orderNumber })
    .populate({
      path: 'user',
      select: 'email'
    })
    .populate({
      path: 'orderItems.product',
      select: 'name images'
    });
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  // Verify the email matches the order's user email
  if (order.user.email !== email) {
    return next(new ErrorHandler('Invalid credentials for this order', 401));
  }
  
  // Calculate delivery progress
  let progress = 0;
  let statusText = '';
  let nextStep = '';
  
  switch (order.status) {
    case 'pending':
      progress = 10;
      statusText = 'Order received';
      nextStep = 'Your order has been received and is being processed';
      break;
    case 'processing':
      progress = 30;
      statusText = 'Order is being processed';
      nextStep = 'Your order will be shipped soon';
      break;
    case 'shipped':
      progress = 70;
      statusText = 'Order has been shipped';
      nextStep = order.trackingNumber 
        ? 'You can track your delivery using the tracking number' 
        : 'Your order is on its way';
      break;
    case 'delivered':
      progress = 100;
      statusText = 'Order delivered';
      nextStep = 'Your order has been delivered';
      break;
    case 'cancelled':
      progress = 0;
      statusText = 'Order cancelled';
      nextStep = 'Your order has been cancelled';
      break;
    case 'refunded':
      progress = 0;
      statusText = 'Order refunded';
      nextStep = 'Your order has been refunded';
      break;
    default:
      progress = 0;
      statusText = 'Unknown status';
      nextStep = 'Please contact customer support';
  }
  
  // Prepare tracking information
  const trackingInfo = {
    orderNumber: order.orderNumber,
    orderId: order._id,
    orderDate: order.createdAt,
    status: order.status,
    statusText,
    progress,
    nextStep,
    statusHistory: order.statusHistory.map(historyItem => ({
      status: historyItem.status,
      timestamp: historyItem.timestamp,
      comment: historyItem.comment
    })),
    trackingNumber: order.trackingNumber,
    shippingMethod: order.shippingMethod,
    estimatedDeliveryDate: order.estimatedDeliveryDate,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
    orderItems: order.orderItems.map(item => ({
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price
    })),
    shippingAddress: {
      fullName: order.shippingAddress.fullName,
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      postalCode: order.shippingAddress.postalCode,
      country: order.shippingAddress.country
    },
    paymentMethod: order.paymentMethod,
    subtotalPrice: order.subtotalPrice,
    taxPrice: order.taxPrice, 
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice
  };
  
  res.status(200).json({
    success: true,
    data: trackingInfo
  });
});

/**
 * Cancel order by user
 * @route   PUT /api/orders/:id/cancel
 * @access  Private
 */
exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id
  });
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  // Check if order can be cancelled
  if (['delivered', 'refunded', 'cancelled'].includes(order.status)) {
    return next(new ErrorHandler(`Order cannot be cancelled in ${order.status} status`, 400));
  }
  
  try {
    await order.cancelOrder(req.user.id, false);
    
    // Create notification for user
    await Notification.createNotification({
      recipient: req.user.id,
      recipientModel: 'User',
      title: 'Order Cancelled',
      message: `Your order #${order._id} has been cancelled successfully.`,
      type: 'order_status_changed',
      reference: {
        model: 'Order',
        id: order._id
      }
    });
    
    // Create notification for admin
    const admins = await Admin.find({});
    for (const admin of admins) {
      await Notification.createNotification({
        recipient: admin._id,
        recipientModel: 'Admin',
        title: 'Order Cancelled by Customer',
        message: `Order #${order._id} has been cancelled by the customer.`,
        type: 'order_status_changed',
        reference: {
          model: 'Order',
          id: order._id
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/**
 * Subscribe to SMS notifications for an order
 * @route   POST /api/orders/:id/subscribe-sms
 * @access  Private
 */
exports.subscribeToSMSNotifications = asyncHandler(async (req, res, next) => {
  const { phoneNumber } = req.body;
  
  if (!phoneNumber) {
    return next(new ErrorHandler('Please provide a phone number', 400));
  }
  
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id
  });
  
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }
  
  // Add phone number to order for SMS notifications
  order.smsNotificationNumber = phoneNumber;
  
  await order.save();
  
  // Send confirmation notification
  await Notification.createNotification({
    recipient: req.user.id,
    recipientModel: 'User',
    title: 'SMS Notifications Activated',
    message: `You will now receive SMS updates for your order #${order.orderNumber}.`,
    type: 'system_alert',
    reference: {
      model: 'Order',
      id: order._id
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Successfully subscribed to SMS notifications for this order'
  });
});

/**
 * Create new order for guest checkout
 * @route   POST /api/orders/guest
 * @access  Public
 */
exports.createGuestOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    guestDetails
  } = req.body;
  
  // Validate required fields
  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler('No order items', 400));
  }
  
  if (!shippingAddress) {
    return next(new ErrorHandler('Shipping address is required', 400));
  }
  
  if (!guestDetails || !guestDetails.email || !guestDetails.name) {
    return next(new ErrorHandler('Guest name and email are required', 400));
  }
  
  // Calculate prices from items and verify
  let subtotal = 0;
  
  // Verify products and prices
  for (const item of orderItems) {
    const productFromDB = await Product.findById(item.product);
    
    if (!productFromDB) {
      return next(new ErrorHandler(`Product not found: ${item.product}`, 404));
    }
    
    // Verify price
    const correctPrice = productFromDB.onSale 
      ? productFromDB.salePrice 
      : productFromDB.price;
    
    if (item.price !== correctPrice) {
      return next(new ErrorHandler('Product price is invalid', 400));
    }
    
    // Verify stock
    if (productFromDB.stock < item.quantity) {
      return next(
        new ErrorHandler(
          `Product ${productFromDB.name} is out of stock. Only ${productFromDB.stock} available.`,
          400
        )
      );
    }
    
    // Add to subtotal
    subtotal += item.price * item.quantity;
  }
  
  // Create order
  const order = await Order.create({
    isGuest: true,
    guestDetails,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    subtotalPrice: subtotal,
    totalPrice
  });
  
  // Update product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }
  
  // Create notification for admin
  const admins = await Admin.find({});
  for (const admin of admins) {
    await Notification.createNotification({
      recipient: admin._id,
      recipientModel: 'Admin',
      title: 'New Guest Order Received',
      message: `A new guest order #${order.orderNumber} has been placed by ${guestDetails.name}.`,
      type: 'order_placed',
      reference: {
        model: 'Order',
        id: order._id
      }
    });
  }
  
  res.status(201).json({
    success: true,
    data: {
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        status: order.status,
        email: guestDetails.email,
        totalPrice: order.totalPrice
      }
    }
  });
});

/**
 * Track guest order by order number and email
 * @route   POST /api/orders/guest/track
 * @access  Public
 */
exports.trackGuestOrder = asyncHandler(async (req, res, next) => {
  const { orderNumber, email } = req.body;
  
  if (!orderNumber || !email) {
    return next(new ErrorHandler('Please provide order number and email', 400));
  }
  
  // Find the order
  const order = await Order.findOne({ 
    orderNumber, 
    isGuest: true,
    'guestDetails.email': email 
  }).populate({
    path: 'orderItems.product',
    select: 'name images'
  });
  
  if (!order) {
    return next(new ErrorHandler('Order not found or email does not match', 404));
  }
  
  // Calculate delivery progress (same as trackOrder)
  let progress = 0;
  let statusText = '';
  let nextStep = '';
  
  switch (order.status) {
    case 'pending':
      progress = 10;
      statusText = 'Order received';
      nextStep = 'Your order has been received and is being processed';
      break;
    case 'processing':
      progress = 30;
      statusText = 'Order is being processed';
      nextStep = 'Your order will be shipped soon';
      break;
    case 'shipped':
      progress = 70;
      statusText = 'Order has been shipped';
      nextStep = order.trackingNumber 
        ? 'You can track your delivery using the tracking number' 
        : 'Your order is on its way';
      break;
    case 'delivered':
      progress = 100;
      statusText = 'Order delivered';
      nextStep = 'Your order has been delivered';
      break;
    case 'cancelled':
      progress = 0;
      statusText = 'Order cancelled';
      nextStep = 'Your order has been cancelled';
      break;
    case 'refunded':
      progress = 0;
      statusText = 'Order refunded';
      nextStep = 'Your order has been refunded';
      break;
    default:
      progress = 0;
      statusText = 'Unknown status';
      nextStep = 'Please contact customer support';
  }
  
  // Prepare tracking information
  const trackingInfo = {
    orderNumber: order.orderNumber,
    orderId: order._id,
    orderDate: order.createdAt,
    status: order.status,
    statusText,
    progress,
    nextStep,
    statusHistory: order.statusHistory.map(historyItem => ({
      status: historyItem.status,
      timestamp: historyItem.timestamp,
      comment: historyItem.comment
    })),
    trackingNumber: order.trackingNumber,
    shippingMethod: order.shippingMethod,
    estimatedDeliveryDate: order.estimatedDeliveryDate,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
    guestName: order.guestDetails.name,
    orderItems: order.orderItems.map(item => ({
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price
    })),
    shippingAddress: {
      fullName: order.shippingAddress.fullName,
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      postalCode: order.shippingAddress.postalCode,
      country: order.shippingAddress.country
    },
    paymentMethod: order.paymentMethod,
    subtotalPrice: order.subtotalPrice,
    taxPrice: order.taxPrice, 
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice
  };
  
  res.status(200).json({
    success: true,
    data: trackingInfo
  });
});

/**
 * Cancel guest order
 * @route   PUT /api/orders/guest/cancel
 * @access  Public
 */
exports.cancelGuestOrder = asyncHandler(async (req, res, next) => {
  const { orderNumber, email } = req.body;
  
  if (!orderNumber || !email) {
    return next(new ErrorHandler('Please provide order number and email', 400));
  }
  
  const order = await Order.findOne({ 
    orderNumber,
    isGuest: true,
    'guestDetails.email': email 
  });
  
  if (!order) {
    return next(new ErrorHandler('Order not found or email does not match', 404));
  }
  
  // Check if order can be cancelled
  if (['delivered', 'refunded', 'cancelled'].includes(order.status)) {
    return next(new ErrorHandler(`Order cannot be cancelled in ${order.status} status`, 400));
  }
  
  try {
    // Cancel the order (using order ID as updatedBy since there's no user)
    order.status = 'cancelled';
    
    // Add to status history
    order.statusHistory.push({
      status: 'cancelled',
      comment: 'Order cancelled by guest',
      updatedBy: order._id,
      updatedByModel: 'Guest'
    });
    
    await order.save();
    
    // Create notification for admin
    const admins = await Admin.find({});
    for (const admin of admins) {
      await Notification.createNotification({
        recipient: admin._id,
        recipientModel: 'Admin',
        title: 'Guest Order Cancelled',
        message: `Guest order #${order.orderNumber} has been cancelled by the customer.`,
        type: 'order_status_changed',
        reference: {
          model: 'Order',
          id: order._id
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: {
        orderNumber: order.orderNumber,
        status: order.status
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}); 