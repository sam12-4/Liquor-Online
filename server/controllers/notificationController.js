const Notification = require('../models/notification');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get notifications for the logged in user
 * @route   GET /api/notifications
 * @access  Private
 */
exports.getUserNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({
    recipient: req.user.id,
    recipientModel: 'User'
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

/**
 * Get unread notifications count
 * @route   GET /api/notifications/unread/count
 * @access  Private
 */
exports.getUnreadCount = asyncHandler(async (req, res, next) => {
  const count = await Notification.countDocuments({
    recipient: req.user.id,
    recipientModel: req.user.role === 'admin' ? 'Admin' : 'User',
    isRead: false
  });

  res.status(200).json({
    success: true,
    count
  });
});

/**
 * Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorHandler('Notification not found', 404));
  }

  // Check if notification belongs to user
  if (
    notification.recipient.toString() !== req.user.id ||
    notification.recipientModel !== (req.user.role === 'admin' ? 'Admin' : 'User')
  ) {
    return next(new ErrorHandler('Not authorized to access this notification', 401));
  }

  // Mark as read
  notification.isRead = true;
  notification.readAt = Date.now();
  await notification.save();

  res.status(200).json({
    success: true,
    data: notification
  });
});

/**
 * Mark all notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private
 */
exports.markAllAsRead = asyncHandler(async (req, res, next) => {
  await Notification.updateMany(
    {
      recipient: req.user.id,
      recipientModel: req.user.role === 'admin' ? 'Admin' : 'User',
      isRead: false
    },
    {
      isRead: true,
      readAt: Date.now()
    }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

/**
 * Delete notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorHandler('Notification not found', 404));
  }

  // Check if notification belongs to user
  if (
    notification.recipient.toString() !== req.user.id ||
    notification.recipientModel !== (req.user.role === 'admin' ? 'Admin' : 'User')
  ) {
    return next(new ErrorHandler('Not authorized to access this notification', 401));
  }

  await Notification.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Notification deleted'
  });
});

/**
 * Delete all read notifications
 * @route   DELETE /api/notifications/read
 * @access  Private
 */
exports.deleteReadNotifications = asyncHandler(async (req, res, next) => {
  await Notification.deleteMany({
    recipient: req.user.id,
    recipientModel: req.user.role === 'admin' ? 'Admin' : 'User',
    isRead: true
  });

  res.status(200).json({
    success: true,
    message: 'All read notifications deleted'
  });
}); 