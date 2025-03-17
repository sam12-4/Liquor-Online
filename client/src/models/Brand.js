/**
 * Brand model representing product manufacturers and suppliers.
 * Manages brand identity, origin, and display preferences for the storefront.
 */

class Brand {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    logo = '',
    website = '',
    isActive = true,
    countryId = null,
    filterMetadata = {
      featured: false,
      showInFilters: true
    },
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.logo = logo;
    this.website = website;
    this.isActive = isActive;
    this.countryId = countryId;
    this.filterMetadata = filterMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Factory method to create Brand instances from API responses
  static fromJSON(json) {
    return new Brand(json);
  }

  // Serializes the Brand instance for API requests
  toJSON() {
    return { ...this };
  }
}

export default Brand; 