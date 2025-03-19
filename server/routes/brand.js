const express = require('express');
const router = express.Router();
const { 
  getBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brandController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getBrands);
router.get('/slug/:slug', getBrandBySlug);
router.get('/:id', getBrandById);

// Admin routes
router.post('/', isAuthenticated, authorizeRoles('admin'), createBrand);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), updateBrand);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteBrand);

module.exports = router; 