const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get category hierarchy
router.get('/hierarchy', categoryController.getCategoryHierarchy);

// Get all categories
router.get('/', categoryController.getCategories);

// Get single category by ID
router.get('/:id', categoryController.getCategoryById);

// Get category by slug
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// Create new category
router.post('/', categoryController.createCategory);

// Update category
router.put('/:id', categoryController.updateCategory);

// Delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; 