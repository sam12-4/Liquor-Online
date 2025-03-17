import axios from 'axios';
import Product from '../models/Product';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Service for product-related operations
 * This centralizes all the product data access in one place
 */
class ProductService {
  /**
   * Retrieves all products from the backend API.
   * @returns {Promise<Product[]>} Array of product instances
   */
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}`);
      return response.data.map(product => Product.fromJSON(product));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  
  /**
   * Fetches a specific product by its unique identifier.
   * @param {string} id Product ID
   * @returns {Promise<Product>} Product instance
   * @throws {Error} When product is not found
   */
  async getProductById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.PRODUCT_BY_ID(id)}`);
      return Product.fromJSON(response.data);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error(`Product not found: ${error.message}`);
    }
  }
  
  /**
   * Searches for products based on specified criteria.
   * @param {Object} criteria Search parameters (name, category, price range, etc.)
   * @returns {Promise<Product[]>} Array of matching product instances
   */
  async searchProducts(criteria = {}) {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (criteria.query) {
        params.append('query', criteria.query);
      }
      
      if (criteria.category) {
        params.append('category', criteria.category);
      }
      
      if (criteria.brand) {
        params.append('brand', criteria.brand);
      }
      
      if (criteria.type) {
        params.append('type', criteria.type);
      }
      
      if (criteria.minPrice) {
        params.append('minPrice', criteria.minPrice);
      }
      
      if (criteria.maxPrice) {
        params.append('maxPrice', criteria.maxPrice);
      }
      
      if (criteria.inStock !== undefined) {
        params.append('inStock', criteria.inStock);
      }
      
      // Make API request with query parameters
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}?${params.toString()}`);
      return response.data.map(product => Product.fromJSON(product));
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
  
  /**
   * Creates a new product or updates an existing one.
   * @param {Product} product Product instance to save
   * @returns {Promise<Product>} Saved product instance with updated fields
   */
  async saveProduct(product) {
    try {
      let response;
      
      if (product.id) {
        // Update existing product
        response = await axios.put(
          `${API_BASE_URL}${ENDPOINTS.PRODUCT_BY_ID(product.id)}`,
          product.toJSON()
        );
      } else {
        // Create new product
        response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.PRODUCTS}`,
          product.toJSON()
        );
      }
      
      return Product.fromJSON(response.data);
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }
  
  /**
   * Permanently removes a product from the system.
   * @param {string} id Product ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteProduct(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.PRODUCT_BY_ID(id)}`);
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new ProductService(); 