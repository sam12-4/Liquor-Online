/**
 * User model representing an authenticated user in the application.
 */
class User {
  constructor({
    id = null,
    _id = null,
    name = '',
    email = '',
    role = 'user',
    createdAt = new Date().toISOString()
  }) {
    this.id = id || _id; // Handle both id formats for MongoDB compatibility
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  /**
   * Checks if user has admin privileges
   * @returns {boolean} True if user is an admin
   */
  get isAdmin() {
    return this.role === 'admin';
  }

  /**
   * Factory method to create User instances from API responses
   */
  static fromJSON(json) {
    return new User(json);
  }

  /**
   * Serializes the User instance for API requests
   * Note: This deliberately excludes sensitive fields
   */
  toJSON() {
    const { id, name, email, role, createdAt } = this;
    return { id, name, email, role, createdAt };
  }
}

export default User; 