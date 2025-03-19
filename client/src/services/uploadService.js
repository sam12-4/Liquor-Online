import axios from 'axios';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Service for handling file uploads to the server
 * Manages image upload operations for products and other entities
 */
class UploadService {
  /**
   * Uploads an image to the server
   * @param {File} file The file object to upload
   * @param {Object} options Additional options like folder, publicId, etc.
   * @returns {Promise<Object>} Response data including the image URL and public ID
   */
  async uploadImage(file, options = {}) {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Add optional parameters
      if (options.folder) {
        formData.append('folder', options.folder);
      }
      
      if (options.publicId) {
        formData.append('publicId', options.publicId);
      }
      
      // Set headers for file upload
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      
      // Add authorization if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the API request
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.UPLOAD_IMAGE}`,
        formData,
        config
      );
      
      // Handle different response structures
      const uploadData = response.data?.data || response.data;
      
      return uploadData;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  
  /**
   * Deletes an uploaded image
   * @param {string} publicId The public ID of the image to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteImage(publicId) {
    try {
      // Set headers
      const config = {
        headers: {}
      };
      
      // Add authorization if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the API request
      await axios.delete(
        `${API_BASE_URL}${ENDPOINTS.DELETE_IMAGE}`,
        { 
          data: { publicId },
          ...config
        }
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}

export default new UploadService(); 