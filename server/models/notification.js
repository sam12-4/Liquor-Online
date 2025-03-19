const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientModel'
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['User', 'Admin', 'Guest']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'order_placed', 
      'order_status_changed', 
      'payment_received', 
      'payment_failed',
      'product_out_of_stock',
      'product_back_in_stock',
      'account_update',
      'password_reset',
      'new_message',
      'system_alert',
      'sale_announcement'
    ]
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  actionLink: String,
  reference: {
    model: {
      type: String,
      enum: ['Order', 'Product', 'User', 'Admin', 'Message', 'Review']
    },
    id: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  expiresAt: Date,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Mark notification as read
notificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  this.readAt = Date.now();
  await this.save();
  return this;
};

// Find unread notifications for a recipient
notificationSchema.statics.findUnreadByRecipient = function(recipientId, recipientModel) {
  return this.find({
    recipient: recipientId,
    recipientModel: recipientModel,
    isRead: false
  }).sort({ createdAt: -1 });
};

// Create and send notification based on event
notificationSchema.statics.createNotification = async function(data) {
  return await this.create(data);
};

module.exports = mongoose.model('Notification', notificationSchema); 