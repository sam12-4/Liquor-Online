import axios from 'axios';
import Brand from '../models/Brand';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5000/api';

class BrandService {
  /**
   * Retrieves all brands from the backend API.
   * @returns {Promise<Brand[]>} Array of brand instances
   */
  async getAllBrands() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.BRANDS}`);
      return response.data.map(brand => Brand.fromJSON(brand));
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }

  /**
   * Fetches a specific brand by its unique identifier.
   * @param {string} id Brand ID
   * @returns {Promise<Brand>} Brand instance
   */
  async getBrandById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.BRAND_BY_ID(id)}`);
      return Brand.fromJSON(response.data);
    } catch (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new brand or updates an existing one.
   * @param {Brand} brand Brand instance to save
   * @returns {Promise<Brand>} Saved brand instance with updated fields
   */
  async saveBrand(brand) {
    try {
      let response;
      
      if (brand.id) {
        // Update existing brand
        response = await axios.put(
          `${API_BASE_URL}${ENDPOINTS.BRAND_BY_ID(brand.id)}`,
          brand.toJSON()
        );
      } else {
        // Create new brand
        response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.BRANDS}`,
          brand.toJSON()
        );
      }
      
      return Brand.fromJSON(response.data);
    } catch (error) {
      console.error('Error saving brand:', error);
      throw error;
    }
  }

  /**
   * Permanently removes a brand from the system.
   * @param {string} id Brand ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteBrand(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.BRAND_BY_ID(id)}`);
      return true;
    } catch (error) {
      console.error(`Error deleting brand with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new BrandService(); 