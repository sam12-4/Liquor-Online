const express = require('express');
const router = express.Router();
const { 
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage
} = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Admin routes
router.post('/', isAuthenticated, authorizeRoles('admin'), createProduct);
router.put('/:id', isAuthenticated, authorizeRoles('admin'), updateProduct);
router.delete('/:id', isAuthenticated, authorizeRoles('admin'), deleteProduct);

// Image upload routes
router.post(
  '/:id/images',
  isAuthenticated,
  authorizeRoles('admin'),
  upload.array('images', 10),
  uploadProductImages
);

router.delete(
  '/:id/images/:imageId',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteProductImage
);

module.exports = router; 