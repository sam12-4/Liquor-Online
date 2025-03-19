import axios from 'axios';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Service for user-related operations
 * Authentication removed as requested
 */
class UserService {
  /**
   * Gets user profile information
   * @returns {Promise<Object>} User profile data
   */
  async getUserProfile() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.USER_PROFILE}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Updates user profile information
   * @param {Object} profileData Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${ENDPOINTS.USER_PROFILE}`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Gets the current user's order history
   * @returns {Promise<Array>} Array of order objects
   */
  async getOrderHistory() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.USER_ORDERS}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user order history:', error);
      return [];
    }
  }
}

export default new UserService(); 