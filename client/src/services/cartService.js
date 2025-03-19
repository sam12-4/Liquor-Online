import axios from 'axios';
import { ENDPOINTS } from './api/endpoints';
import Cart from '../models/Cart';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Service for cart-related operations
 * Authentication removed as requested
 */
class CartService {
  /**
   * Retrieves the current cart from the backend API or local storage.
   * @returns {Promise<Cart>} Cart instance
   */
  async getCart() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.CART}`);
      
      // Handle different response structures
      const cartData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Cart.fromJSON(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
      
      // If cart doesn't exist yet, create a new empty one
      return new Cart();
    }
  }

  /**
   * Adds a product to the cart.
   * @param {string} productId Product ID to add
   * @param {number} quantity Quantity to add (default: 1)
   * @returns {Promise<Cart>} Updated cart instance
   */
  async addToCart(productId, quantity = 1) {
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.CART_ADD}`, {
        productId,
        quantity
      });
      
      // Handle different response structures
      const updatedCartData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Cart.fromJSON(updatedCartData);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  /**
   * Removes a product from the cart.
   * @param {string} productId Product ID to remove
   * @returns {Promise<Cart>} Updated cart instance
   */
  async removeFromCart(productId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINTS.CART_REMOVE(productId)}`);
      
      // Handle different response structures
      const updatedCartData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Cart.fromJSON(updatedCartData);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  /**
   * Updates the quantity of a product in the cart.
   * @param {string} productId Product ID to update
   * @param {number} quantity New quantity
   * @returns {Promise<Cart>} Updated cart instance
   */
  async updateCartItem(productId, quantity) {
    try {
      const response = await axios.put(`${API_BASE_URL}${ENDPOINTS.CART_UPDATE(productId)}`, {
        quantity
      });
      
      // Handle different response structures
      const updatedCartData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Cart.fromJSON(updatedCartData);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  /**
   * Clears all items from the cart.
   * @returns {Promise<Cart>} Empty cart instance
   */
  async clearCart() {
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINTS.CART_CLEAR}`);
      
      // Handle different response structures
      const clearedCartData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Cart.fromJSON(clearedCartData);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

export default new CartService(); 