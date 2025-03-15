const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Get all brands
router.get('/', brandController.getBrands);

// Get brands by category
router.get('/category/:categoryId', brandController.getBrandsByCategory);

// Get single brand by ID
router.get('/:id', brandController.getBrandById);

// Get brand by slug
router.get('/slug/:slug', brandController.getBrandBySlug);

// Create new brand
router.post('/', brandController.createBrand);

// Update brand
router.put('/:id', brandController.updateBrand);

// Delete brand
router.delete('/:id', brandController.deleteBrand);

module.exports = router; 