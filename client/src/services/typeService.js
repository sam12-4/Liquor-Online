import axios from 'axios';
import Type from '../models/Type';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5000/api';

class TypeService {
  /**
   * Retrieves all product types from the backend API.
   * @returns {Promise<Type[]>} Array of type instances
   */
  async getAllTypes() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.TYPES}`);
      return response.data.map(type => Type.fromJSON(type));
    } catch (error) {
      console.error('Error fetching types:', error);
      throw error;
    }
  }

  /**
   * Fetches a specific product type by its unique identifier.
   * @param {string} id Type ID
   * @returns {Promise<Type>} Type instance
   */
  async getTypeById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.TYPE_BY_ID(id)}`);
      return Type.fromJSON(response.data);
    } catch (error) {
      console.error(`Error fetching type with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new product type or updates an existing one.
   * @param {Type} type Type instance to save
   * @returns {Promise<Type>} Saved type instance with updated fields
   */
  async saveType(type) {
    try {
      let response;
      
      if (type.id) {
        // Update existing type
        response = await axios.put(
          `${API_BASE_URL}${ENDPOINTS.TYPE_BY_ID(type.id)}`,
          type.toJSON()
        );
      } else {
        // Create new type
        response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.TYPES}`,
          type.toJSON()
        );
      }
      
      return Type.fromJSON(response.data);
    } catch (error) {
      console.error('Error saving type:', error);
      throw error;
    }
  }

  /**
   * Permanently removes a product type from the system.
   * @param {string} id Type ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteType(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.TYPE_BY_ID(id)}`);
      return true;
    } catch (error) {
      console.error(`Error deleting type with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new TypeService(); 