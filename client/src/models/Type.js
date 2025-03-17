/**
 * Type model for product sub-classification within categories.
 * Enables more granular product organization and filtering capabilities.
 */

class Type {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    isActive = true,
    displayOrder = 0,
    categoryIds = [],
    filterMetadata = {
      displayName: '',
      showInFilters: true
    },
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.isActive = isActive;
    this.displayOrder = displayOrder;
    this.categoryIds = categoryIds;
    this.filterMetadata = filterMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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