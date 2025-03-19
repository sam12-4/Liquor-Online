import axios from 'axios';
import { ENDPOINTS } from './api/endpoints';
import Order from '../models/Order';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Service for order-related operations
 * Authentication removed as requested
 */
class OrderService {
  /**
   * Retrieves all orders from the backend API.
   * @returns {Promise<Order[]>} Array of order instances
   */
  async getAllOrders() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.ORDERS}`);
      
      // Handle different response structures
      const ordersData = response.data && response.data.data 
        ? response.data.data 
        : Array.isArray(response.data) 
          ? response.data 
          : [];
          
      return ordersData.map(order => Order.fromJSON(order));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  /**
   * Fetches a specific order by its unique identifier.
   * @param {string} id Order ID
   * @returns {Promise<Order>} Order instance
   */
  async getOrderById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.ORDER_BY_ID(id)}`);
      
      // Handle different response structures
      const orderData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Order.fromJSON(orderData);
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Creates a new order in the system.
   * @param {Order} order Order instance to create
   * @returns {Promise<Order>} Created order instance
   */
  async createOrder(order) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.ORDERS}`,
        order.toJSON()
      );
      
      // Handle different response structures
      const createdOrder = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Order.fromJSON(createdOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Updates an existing order with new information.
   * @param {Order} order Order instance with updated fields
   * @returns {Promise<Order>} Updated order instance
   */
  async updateOrder(order) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${ENDPOINTS.ORDER_BY_ID(order.id)}`,
        order.toJSON()
      );
      
      // Handle different response structures
      const updatedOrder = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Order.fromJSON(updatedOrder);
    } catch (error) {
      console.error(`Error updating order with ID ${order.id}:`, error);
      throw error;
    }
  }

  /**
   * Permanently removes an order from the system.
   * @param {string} id Order ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteOrder(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.ORDER_BY_ID(id)}`);
      return true;
    } catch (error) {
      console.error(`Error deleting order with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Retrieves orders for a specific customer.
   * @param {string} customerId Customer ID
   * @returns {Promise<Order[]>} Array of order instances
   */
  async getOrdersByCustomer(customerId) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.ORDERS_BY_CUSTOMER(customerId)}`);
      
      // Handle different response structures
      const ordersData = response.data && response.data.data 
        ? response.data.data 
        : Array.isArray(response.data) 
          ? response.data 
          : [];
          
      return ordersData.map(order => Order.fromJSON(order));
    } catch (error) {
      console.error(`Error fetching orders for customer ${customerId}:`, error);
      return [];
    }
  }
}

export default new OrderService();