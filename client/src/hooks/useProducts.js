import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService';

/**
 * Custom hook for fetching and managing products
 * @param {Object} options - Hook options
 * @param {string} options.category - Category filter
 * @param {string} options.brand - Brand filter
 * @param {string} options.type - Type filter
 * @returns {Object} Products data and methods
 */
const useProducts = (options = {}) => {
  const { category, brand, type } = options;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch products based on filters
   */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      
      if (category) {
        data = await productService.getProductsByCategory(category);
      } else if (brand) {
        data = await productService.getProductsByBrand(brand);
      } else if (type) {
        data = await productService.getProductsByType(type);
      } else {
        data = await productService.getAllProducts();
      }
      
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [category, brand, type]);

  /**
   * Fetch a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch product');
      console.error('Error fetching product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
  };
};

export default useProducts; 