/**
 * Country model representing product origin countries
 */
class Country {
  constructor({
    id = null,
    _id = null,
    name = '',
    code = '',
    flag = ''
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.code = code;
    this.flag = flag;
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