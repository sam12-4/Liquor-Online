/**
 * Type model representing a product type or subcategory
 */
class Type {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    categoryIds = []
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.categoryIds = categoryIds;
  }

  // Factory method to create Type instances from API responses
  static fromJSON(json) {
    return new Type(json);
  }

  // Serializes the Type instance for API requests
  toJSON() {
    return { ...this };
  }
}

export default Type; 