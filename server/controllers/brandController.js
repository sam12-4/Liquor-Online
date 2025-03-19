const Brand = require('../models/brand');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

/**
 * Get all brands
 * @route   GET /api/brands
 * @access  Public
 */
exports.getBrands = asyncHandler(async (req, res, next) => {
  // Build query
  let query = {};
  
  // Filter by active status
  if (req.query.active) {
    query.isActive = req.query.active === 'true';
  }
  
  // Filter by country
  if (req.query.country) {
    query.countryId = req.query.country;
  }
  
  // Filter by featured
  if (req.query.featured) {
    query['filterMetadata.featured'] = req.query.featured === 'true';
  }
  
  // Sorting
  let sortOption = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    sortOption = sortBy;
  } else {
    // Default sort by name
    sortOption = { name: 1 };
  }
  
  // Execute query
  const brands = await Brand.find(query)
    .populate('countryId', 'name code flag')
    .sort(sortOption);
  
  res.status(200).json({
    success: true,
    count: brands.length,
    data: brands
  });
});

/**
 * Get brand details
 * @route   GET /api/brands/:id
 * @access  Public
 */
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id)
    .populate('countryId', 'name code flag');
  
  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: brand
  });
});

/**
 * Get brand by slug
 * @route   GET /api/brands/slug/:slug
 * @access  Public
 */
exports.getBrandBySlug = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findOne({ slug: req.params.slug })
    .populate('countryId', 'name code flag');
  
  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: brand
  });
});

/**
 * Create a new brand
 * @route   POST /api/brands
 * @access  Private/Admin
 */
exports.createBrand = asyncHandler(async (req, res, next) => {
  // Generate slug from name if not provided
  if (!req.body.slug && req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  const brand = await Brand.create(req.body);
  
  res.status(201).json({
    success: true,
    data: brand
  });
});

/**
 * Update brand
 * @route   PUT /api/brands/:id
 * @access  Private/Admin
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  
  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }
  
  // Update slug if name is changed and slug is not provided
  if (req.body.name && (!req.body.slug || brand.name !== req.body.name)) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  // Update brand
  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: brand
  });
});

/**
 * Delete brand
 * @route   DELETE /api/brands/:id
 * @access  Private/Admin
 */
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  
  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }
  
  await Brand.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully'
  });
}); 