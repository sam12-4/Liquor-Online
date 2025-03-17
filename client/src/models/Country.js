/**
 * Country model for managing product origins and regional classifications.
 * Supports geographical filtering and region-based product organization.
 */

class Country {
  constructor({
    id = null,
    _id = null,
    name = '',
    code = '',
    flag = '',
    isActive = true,
    filterMetadata = {
      showInFilters: true,
      regionId: ''
    },
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.code = code;
    this.flag = flag;
    this.isActive = isActive;
    this.filterMetadata = filterMetadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Factory method to create Country instances from API responses
  static fromJSON(json) {
    return new Country(json);
  }

  // Serializes the Country instance for API requests
  toJSON() {
    return { ...this };
  }
}

export default Country; 