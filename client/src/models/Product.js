/**
 * Product model representing the core product entity in our e-commerce system.
 * Ensures data consistency between frontend and backend operations.
 */

class Product {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    shortDescription = '',
    price = 0,
    salePrice = 0,
    onSale = false,
    images = [],
    stock = 0,
    isActive = true,
    isHot = false,
    isFeatured = false,
    rating = 0,
    ratingCount = 0,
    reviewCount = 0,
    attributes = {},
    brandId = null,
    categoryIds = [],
    typeIds = [],
    countryId = '',
    sku = '',
    dateAdded = new Date().toISOString(),
    dateModified = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.shortDescription = shortDescription;
    this.price = price;
    this.salePrice = salePrice;
    this.onSale = onSale;
    this.images = images;
    this.stock = stock;
    this.isActive = isActive;
    this.isHot = isHot;
    this.isFeatured = isFeatured;
    this.rating = rating;
    this.ratingCount = ratingCount;
    this.reviewCount = reviewCount;
    this.attributes = attributes;
    this.brandId = brandId;
    this.categoryIds = categoryIds;
    this.typeIds = typeIds;
    this.countryId = countryId;
    this.sku = sku;
    this.dateAdded = dateAdded;
    this.dateModified = dateModified;
  }

  // Returns the primary product image or first available image
  get primaryImage() {
    if (this.images && this.images.length > 0) {
      const primary = this.images.find(img => img.isPrimary);
      return primary ? primary.url : this.images[0].url;
    }
    return '';
  }

  // Determines the effective sale price based on product state
  get calculatedSalePrice() {
    if (this.onSale && this.salePrice > 0) {
      return this.salePrice;
    }
    return this.price;
  }

  // Factory method to create Product instances from API responses
  static fromJSON(json) {
    return new Product(json);
  }

  // Serializes the Product instance for API requests
  toJSON() {
    return { ...this };
  }
}

export default Product; 