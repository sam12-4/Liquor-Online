const express = require('express');
const router = express.Router();
const { 
  getTypes,
  getTypeById,
  getTypeBySlug,
  createType,
  updateType,
  deleteType
} = require('../controllers/typeController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getTypes);
router.get('/slug/:slug', getTypeBySlug);
router.get('/:id', getTypeById);

// Admin routes
router.post('/', isAuthenticated, authorizeRoles('admin'), createType);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), updateType);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteType);

module.exports = router; 