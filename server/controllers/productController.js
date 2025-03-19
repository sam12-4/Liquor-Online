const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../config/cloudinary');
const slugify = require('slugify');

/**
 * Get all products with filtering, sorting and pagination
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Build query
  let query = {};
  
  // Filter by search query
  if (req.query.keyword) {
    query.name = { $regex: req.query.keyword, $options: 'i' };
  }
  
  // Filter by active
  if (req.query.active) {
    query.isActive = req.query.active === 'true';
  }
  
  // Filter by featured
  if (req.query.featured) {
    query.isFeatured = req.query.featured === 'true';
  }
  
  // Filter by hot products
  if (req.query.hot) {
    query.isHot = req.query.hot === 'true';
  }
  
  // Filter by brand
  if (req.query.brand) {
    query.brandId = req.query.brand;
  }
  
  // Filter by category
  if (req.query.category) {
    query.categoryIds = { $in: [req.query.category] };
  }
  
  // Filter by type
  if (req.query.type) {
    query.typeIds = { $in: [req.query.type] };
  }
  
  // Filter by country
  if (req.query.country) {
    query.countryId = req.query.country;
  }
  
  // Filter by price range
  if (req.query.minPrice && req.query.maxPrice) {
    query.price = { 
      $gte: Number(req.query.minPrice), 
      $lte: Number(req.query.maxPrice) 
    };
  } else if (req.query.minPrice) {
    query.price = { $gte: Number(req.query.minPrice) };
  } else if (req.query.maxPrice) {
    query.price = { $lte: Number(req.query.maxPrice) };
  }
  
  // Count total products matching the query
  const total = await Product.countDocuments(query);
  
  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  // Sorting
  let sortOption = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    sortOption = sortBy;
  } else {
    sortOption = { createdAt: -1 }; // Default sort by newest
  }
  
  // Execute query with pagination and sorting
  const products = await Product.find(query)
    .populate('brandId', 'name slug')
    .populate('categoryIds', 'name slug')
    .populate('typeIds', 'name slug')
    .populate('countryId', 'name code flag')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  
  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products
  });
});

/**
 * Get product details
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('brandId', 'name slug')
    .populate('categoryIds', 'name slug')
    .populate('typeIds', 'name slug')
    .populate('countryId', 'name code flag');
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * Get product by slug
 * @route   GET /api/products/slug/:slug
 * @access  Public
 */
exports.getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('brandId', 'name slug')
    .populate('categoryIds', 'name slug')
    .populate('typeIds', 'name slug')
    .populate('countryId', 'name code flag');
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Generate slug from name
  if (!req.body.slug && req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  const product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    data: product
  });
});

/**
 * Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  // Update slug if name is changed
  if (req.body.name && (!req.body.slug || product.name !== req.body.name)) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  // Update product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  // Delete images from cloudinary
  for (const image of product.images) {
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
  
  await Product.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

/**
 * Upload product images
 * @route   POST /api/products/:id/images
 * @access  Private/Admin
 */
exports.uploadProductImages = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler('Please upload at least one image', 400));
  }
  
  const images = [];
  
  // Process each uploaded file
  for (const file of req.files) {
    images.push({
      public_id: file.filename,
      url: file.path
    });
  }
  
  // Add new images to product
  product.images = [...product.images, ...images];
  await product.save();
  
  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * Delete product image
 * @route   DELETE /api/products/:id/images/:imageId
 * @access  Private/Admin
 */
exports.deleteProductImage = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  
  const imageIndex = product.images.findIndex(
    img => img.public_id === req.params.imageId
  );
  
  if (imageIndex === -1) {
    return next(new ErrorHandler('Image not found', 404));
  }
  
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(product.images[imageIndex].public_id);
  
  // Remove image from product
  product.images.splice(imageIndex, 1);
  await product.save();
  
  res.status(200).json({
    success: true,
    data: product
  });
}); 