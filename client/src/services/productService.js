import Product from '../models/Product';
import dummyProducts from '../data/dummyData';

/**
 * Service for product-related operations
 * Using dummy data instead of API calls
 */
class ProductService {
  /**
   * Retrieves all products from dummy data
   * @returns {Promise<Product[]>} Array of product instances
   */
  async getAllProducts() {
    return dummyProducts.map(product => Product.fromJSON(product));
  }
  
  /**
   * Fetches a specific product by its unique identifier
   * @param {string} id Product ID
   * @returns {Promise<Product>} Product instance
   */
  async getProductById(id) {
    const product = dummyProducts.find(p => p.id.toString() === id.toString());
    return product ? Product.fromJSON(product) : null;
  }
  
  /**
   * Searches for products based on specified criteria
   * @param {Object} criteria Search parameters
   * @returns {Promise<Product[]>} Array of matching product instances
   */
  async searchProducts(criteria = {}) {
    let filteredProducts = [...dummyProducts];
    
    // Apply filters based on criteria
    if (criteria.category) {
      filteredProducts = filteredProducts.filter(p => p.category === criteria.category);
    }
    if (criteria.brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === criteria.brand);
    }
    if (criteria.search) {
      const searchLower = criteria.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    if (criteria.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= criteria.minPrice);
    }
    if (criteria.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= criteria.maxPrice);
    }
    
    return filteredProducts.map(product => Product.fromJSON(product));
  }
  
  /**
   * Creates a new product or updates an existing one (in memory only)
   * @param {Product} product Product instance to save
   * @returns {Promise<Product>} Saved product instance
   */
  async saveProduct(product) {
    return Product.fromJSON(product);
  }
  
  /**
   * Simulates product deletion (no actual deletion in dummy data)
   * @param {string} id Product ID to delete
   * @returns {Promise<boolean>} Always returns true
   */
  async deleteProduct(id) {
    return true;
  }
}

export default new ProductService(); 