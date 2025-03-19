const express = require('express');
const router = express.Router();
const { 
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
} = require('../controllers/countryController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getCountries);
router.get('/:id', getCountryById);

// Admin routes
router.post('/', isAuthenticated, authorizeRoles('admin'), createCountry);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), updateCountry);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteCountry);

module.exports = router; 