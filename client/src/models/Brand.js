/**
 * Brand model representing a product brand
 */
class Brand {
  constructor({
    id = null,
    _id = null,
    name = '',
    slug = '',
    description = '',
    logo = '',
    website = ''
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.logo = logo;
    this.website = website;
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