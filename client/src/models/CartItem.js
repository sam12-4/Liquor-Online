/**
 * CartItem model representing a product in the shopping cart
 */
class CartItem {
  constructor({
    id = null,
    _id = null,
    productId = null,
    name = '',
    price = 0,
    quantity = 1,
    image = '',
    slug = '',
    maxQuantity = 0
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.slug = slug;
    this.maxQuantity = maxQuantity;
  }

  /**
   * Calculate the subtotal for this item
   * @returns {number} The calculated subtotal
   */
  get subtotal() {
    return this.price * this.quantity;
  }

  /**
   * Factory method to create CartItem instances from API responses
   */
  static fromJSON(json) {
    return new CartItem(json);
  }

  /**
   * Create a CartItem from a Product
   */
  static fromProduct(product, quantity = 1) {
    return new CartItem({
      productId: product.id,
      name: product.name,
      price: product.calculatedSalePrice || product.price,
      quantity: quantity,
      image: product.primaryImage,
      slug: product.slug,
      maxQuantity: product.stock
    });
  }

  /**
   * Serializes the CartItem instance for API requests
   */
  toJSON() {
    return { ...this };
  }
}

export default CartItem; 