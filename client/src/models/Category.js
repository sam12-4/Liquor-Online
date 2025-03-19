/**
 * Category model for product classification in our e-commerce platform.
 * Provides hierarchical organization capabilities with parent-child relationships.
 */

class Category {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    image = '',
    parentId = null
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.image = image;
    this.parentId = parentId;
  }

  // Factory method to create Category instances from API responses
  static fromJSON(json) {
    return new Category(json);
  }

  // Serializes the Category instance for API requests
  toJSON() {
    return { ...this };
  }
}

export default Category; 