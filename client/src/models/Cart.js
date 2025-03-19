import CartItem from './CartItem';

/**
 * Cart model representing a shopping cart with multiple items
 */
class Cart {
  constructor({
    id = null,
    _id = null,
    userId = null,
    items = [],
    subtotal = 0,
    tax = 0,
    shipping = 0,
    total = 0,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.userId = userId;
    this.items = Array.isArray(items) 
      ? items.map(item => item instanceof CartItem ? item : CartItem.fromJSON(item))
      : [];
    this.subtotal = subtotal;
    this.tax = tax;
    this.shipping = shipping;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Calculate the cart subtotal
   * @returns {number} The calculated subtotal
   */
  get calculatedSubtotal() {
    return this.items.reduce((total, item) => total + item.subtotal, 0);
  }

  /**
   * Calculate the cart total
   * @returns {number} The calculated total
   */
  get calculatedTotal() {
    return this.calculatedSubtotal + this.tax + this.shipping;
  }

  /**
   * Get the total number of items in cart
   * @returns {number} Total item count
   */
  get itemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Add an item to the cart
   * @param {CartItem} item The item to add
   * @returns {Cart} The updated cart
   */
  addItem(item) {
    // Check if item already exists
    const existingItemIndex = this.items.findIndex(i => 
      i.productId === item.productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const existingItem = this.items[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;
      
      // Ensure we don't exceed max quantity
      const quantity = existingItem.maxQuantity > 0 
        ? Math.min(newQuantity, existingItem.maxQuantity) 
        : newQuantity;
        
      this.items[existingItemIndex] = {
        ...existingItem,
        quantity
      };
    } else {
      // Add new item
      this.items.push(item);
    }
    
    // Update totals
    this.subtotal = this.calculatedSubtotal;
    this.total = this.calculatedTotal;
    this.updatedAt = new Date().toISOString();
    
    return this;
  }

  /**
   * Remove an item from the cart
   * @param {string} productId The product ID to remove
   * @returns {Cart} The updated cart
   */
  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    
    // Update totals
    this.subtotal = this.calculatedSubtotal;
    this.total = this.calculatedTotal;
    this.updatedAt = new Date().toISOString();
    
    return this;
  }

  /**
   * Update item quantity
   * @param {string} productId The product ID to update
   * @param {number} quantity The new quantity
   * @returns {Cart} The updated cart
   */
  updateQuantity(productId, quantity) {
    const index = this.items.findIndex(item => item.productId === productId);
    
    if (index >= 0) {
      const item = this.items[index];
      
      // Ensure valid quantity
      const newQuantity = Math.max(1, quantity);
      
      // Apply max quantity limit if available
      const finalQuantity = item.maxQuantity > 0 
        ? Math.min(newQuantity, item.maxQuantity) 
        : newQuantity;
        
      this.items[index] = {
        ...item,
        quantity: finalQuantity
      };
      
      // Update totals
      this.subtotal = this.calculatedSubtotal;
      this.total = this.calculatedTotal;
      this.updatedAt = new Date().toISOString();
    }
    
    return this;
  }

  /**
   * Clear all items from the cart
   * @returns {Cart} The updated cart
   */
  clear() {
    this.items = [];
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  /**
   * Factory method to create Cart instances from API responses
   */
  static fromJSON(json) {
    return new Cart(json);
  }

  /**
   * Create an empty cart
   */
  static createEmpty(userId = null) {
    return new Cart({ userId });
  }

  /**
   * Serializes the Cart instance for API requests
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

export default Cart; 