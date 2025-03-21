import axios from 'axios';
import Country from '../models/Country';
import { ENDPOINTS } from './api/endpoints';

const API_BASE_URL = 'http://localhost:5001/api';

class CountryService {
  /**
   * Retrieves all countries from the backend API.
   * @returns {Promise<Country[]>} Array of country instances
   */
  async getAllCountries() {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.COUNTRIES}`);
      
      // Handle different response structures
      const countriesData = response.data && response.data.data 
        ? response.data.data 
        : Array.isArray(response.data) 
          ? response.data 
          : [];
          
      return countriesData.map(country => Country.fromJSON(country));
    } catch (error) {
      // If endpoint doesn't exist (404), return empty array instead of throwing
      if (error.response && error.response.status === 404) {
        console.warn('Countries endpoint not found, returning empty array');
        return [];
      }
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  /**
   * Fetches a specific country by its unique identifier.
   * @param {string} id Country ID
   * @returns {Promise<Country>} Country instance
   */
  async getCountryById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.COUNTRY_BY_ID(id)}`);
      
      // Handle different response structures
      const countryData = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Country.fromJSON(countryData);
    } catch (error) {
      // If endpoint doesn't exist (404), return null instead of throwing
      if (error.response && error.response.status === 404) {
        console.warn(`Country with ID ${id} not found`);
        return null;
      }
      console.error(`Error fetching country with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new country or updates an existing one.
   * @param {Country} country Country instance to save
   * @returns {Promise<Country>} Saved country instance with updated fields
   */
  async saveCountry(country) {
    try {
      let response;
      
      if (country.id) {
        // Update existing country
        response = await axios.put(
          `${API_BASE_URL}${ENDPOINTS.COUNTRY_BY_ID(country.id)}`,
          country.toJSON()
        );
      } else {
        // Create new country
        response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.COUNTRIES}`,
          country.toJSON()
        );
      }
      
      // Handle different response structures
      const savedCountry = response.data && response.data.data 
        ? response.data.data 
        : response.data;
        
      return Country.fromJSON(savedCountry);
    } catch (error) {
      console.error('Error saving country:', error);
      throw error;
    }
  }

  /**
   * Permanently removes a country from the system.
   * @param {string} id Country ID to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteCountry(id) {
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.COUNTRY_BY_ID(id)}`);
      return true;
    } catch (error) {
      // If endpoint doesn't exist (404), log warning but don't throw
      if (error.response && error.response.status === 404) {
        console.warn(`Country with ID ${id} not found or already deleted`);
        return true;
      }
      console.error(`Error deleting country with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new CountryService(); 