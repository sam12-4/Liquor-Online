import CartItem from './CartItem';

/**
 * Order status enum
 */
export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

/**
 * Payment status enum
 */
export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

/**
 * Order model representing a customer order
 */
class Order {
  constructor({
    id = null,
    _id = null,
    orderNumber = '',
    userId = null,
    items = [],
    subtotal = 0,
    tax = 0,
    shipping = 0,
    total = 0,
    status = OrderStatus.PENDING,
    paymentStatus = PaymentStatus.PENDING,
    shippingAddress = {},
    billingAddress = {},
    paymentMethod = '',
    notes = '',
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.orderNumber = orderNumber;
    this.userId = userId;
    this.items = Array.isArray(items) 
      ? items.map(item => item instanceof CartItem ? item : CartItem.fromJSON(item))
      : [];
    this.subtotal = subtotal;
    this.tax = tax;
    this.shipping = shipping;
    this.total = total;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.paymentMethod = paymentMethod;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Get the total number of items in order
   * @returns {number} Total item count
   */
  get itemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Calculate the order subtotal
   * @returns {number} The calculated subtotal
   */
  get calculatedSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Get a formatted string representation of the creation date
   * @returns {string} Formatted date
   */
  get formattedDate() {
    return new Date(this.createdAt).toLocaleDateString();
  }

  /**
   * Get a human-readable order status
   * @returns {string} Human-readable status
   */
  get statusText() {
    const statusMap = {
      [OrderStatus.PENDING]: 'Pending',
      [OrderStatus.PROCESSING]: 'Processing',
      [OrderStatus.SHIPPED]: 'Shipped',
      [OrderStatus.DELIVERED]: 'Delivered',
      [OrderStatus.CANCELLED]: 'Cancelled'
    };
    
    return statusMap[this.status] || 'Unknown';
  }

  /**
   * Get a human-readable payment status
   * @returns {string} Human-readable payment status
   */
  get paymentStatusText() {
    const statusMap = {
      [PaymentStatus.PENDING]: 'Pending',
      [PaymentStatus.COMPLETED]: 'Completed',
      [PaymentStatus.FAILED]: 'Failed',
      [PaymentStatus.REFUNDED]: 'Refunded'
    };
    
    return statusMap[this.paymentStatus] || 'Unknown';
  }

  /**
   * Factory method to create Order instances from API responses
   */
  static fromJSON(json) {
    return new Order(json);
  }

  /**
   * Create an Order from a Cart
   */
  static fromCart(cart, userId, addresses = {}, paymentMethod = '') {
    return new Order({
      userId,
      items: cart.items,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total,
      shippingAddress: addresses.shipping || {},
      billingAddress: addresses.billing || addresses.shipping || {},
      paymentMethod
    });
  }

  /**
   * Serializes the Order instance for API requests
   */
  toJSON() {
    return {
      ...this,
      items: this.items.map(item => 
        item instanceof CartItem ? item.toJSON() : item
      )
    };
  }
}

export default Order; 