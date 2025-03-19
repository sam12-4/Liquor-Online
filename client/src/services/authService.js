/**
 * Service for authentication-related operations
 * Authentication completely removed as requested
 */
class AuthService {
  /**
   * Checks if the user is authenticated - always returns true
   * @returns {boolean} Always true since authentication is removed
   */
  isAuthenticated() {
    return true;
  }

  /**
   * Gets the auth token - always returns null
   * @returns {null} Always null since authentication is removed
   */
  getToken() {
    return null;
  }

  /**
   * Gets the currently authenticated user - always returns guest user
   * @returns {Object} A guest user object
   */
  getCurrentUser() {
    return {
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'admin', // Setting as admin to allow all features
      isAdmin: true  // Setting as admin to allow all features
    };
  }
}

export default new AuthService(); 