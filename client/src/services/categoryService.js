import axios from 'axios';
import { ENDPOINTS } from './api/endpoints';
import Category from '../models/Category';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Service for category-related operations
 * Authentication removed as requested
 */
class CategoryService {
  /**
   * Retrieves all categories from the backend API.
   * @returns {Promise<Category[]>} Array of category instances
   */
  async getAllCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORIES}`);
      
      // Handle different response structures
      const categoriesData = response.data && response.data.data 
        ? response.data.data 
        : Array.isArray(response.data) 
          ? response.data 
          : [];
          
      return categoriesData.map(category => Category.fromJSON(category));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Fetches a specific category by its unique identifier.
   * @param {string} id Category ID
   * @returns {Promise<Category>} Category instance
   */
  async getCategoryById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORY_BY_ID(id)}`);
      
      // Handle different response structures
      const categoryData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Category.fromJSON(categoryData);
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Creates a new category or updates an existing one.
   * @param {Category} category Category instance to save
   * @returns {Promise<Category>} Saved category instance with updated fields
   */
  async saveCategory(category) {
    try {
      let response;
      
      if (category.id) {
        // Update existing category
        response = await axios.put(
          `${API_BASE_URL}${ENDPOINTS.CATEGORY_BY_ID(category.id)}`,
          category.toJSON()
        );
      } else {
        // Create new category
        response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.CATEGORIES}`,
          category.toJSON()
        );
      }
      
      // Handle different response structures
      const savedCategory = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Category.fromJSON(savedCategory);
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }

  /**
   * Permanently removes a category from the system.
   * @param {string} id Category ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteCategory(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.CATEGORY_BY_ID(id)}`);
      return true;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new CategoryService(); 