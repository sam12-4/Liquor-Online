import apiClient from './api/index';
import { ENDPOINTS } from './api/index';

/**
 * Get all products
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async () => {
  return apiClient.get(ENDPOINTS.PRODUCTS);
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  return apiClient.get(ENDPOINTS.PRODUCT_BY_ID(id));
};

/**
 * Get products by category
 * @param {string} category - Category ID or slug
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (category) => {
  return apiClient.get(ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
};

/**
 * Get products by brand
 * @param {string} brand - Brand ID or slug
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByBrand = async (brand) => {
  return apiClient.get(ENDPOINTS.PRODUCTS_BY_BRAND(brand));
};

/**
 * Get products by type
 * @param {string} type - Type ID or slug
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByType = async (type) => {
  return apiClient.get(ENDPOINTS.PRODUCTS_BY_TYPE(type));
};

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData) => {
  return apiClient.post(ENDPOINTS.PRODUCTS, productData);
};

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, productData) => {
  return apiClient.put(ENDPOINTS.PRODUCT_BY_ID(id), productData);
};

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteProduct = async (id) => {
  return apiClient.delete(ENDPOINTS.PRODUCT_BY_ID(id));
};

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  getProductsByType,
  createProduct,
  updateProduct,
  deleteProduct,
}; 