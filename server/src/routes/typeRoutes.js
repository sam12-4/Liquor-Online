const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

// Get all types
router.get('/', typeController.getTypes);

// Get types by category
router.get('/category/:categoryId', typeController.getTypesByCategory);

// Get single type by ID
router.get('/:id', typeController.getTypeById);

// Get type by slug
router.get('/slug/:slug', typeController.getTypeBySlug);

// Create new type
router.post('/', typeController.createType);

// Update type
router.put('/:id', typeController.updateType);

// Delete type
router.delete('/:id', typeController.deleteType);

module.exports = router; 