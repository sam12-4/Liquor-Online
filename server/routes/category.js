const express = require('express');
const router = express.Router();
const { 
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);

// Admin routes
router.post('/', isAuthenticated, authorizeRoles('admin'), createCategory);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), updateCategory);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteCategory);

module.exports = router; 