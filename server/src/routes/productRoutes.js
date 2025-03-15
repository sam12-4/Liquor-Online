const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get filter counts
router.get('/filter-counts', productController.getFilterCounts);

// Get all products with filtering
router.get('/', productController.getProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router; 