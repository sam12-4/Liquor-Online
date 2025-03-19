const Type = require('../models/type');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

/**
 * Get all types
 * @route   GET /api/types
 * @access  Public
 */
exports.getTypes = asyncHandler(async (req, res, next) => {
  // Build query
  let query = {};
  
  // Filter by active status
  if (req.query.active) {
    query.isActive = req.query.active === 'true';
  }
  
  // Filter by category
  if (req.query.category) {
    query.categoryIds = { $in: [req.query.category] };
  }
  
  // Sorting
  let sortOption = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    sortOption = sortBy;
  } else {
    // Default sort by display order and then name
    sortOption = { displayOrder: 1, name: 1 };
  }
  
  // Execute query
  const types = await Type.find(query)
    .populate('categoryIds', 'name slug')
    .sort(sortOption);
  
  res.status(200).json({
    success: true,
    count: types.length,
    data: types
  });
});

/**
 * Get type details
 * @route   GET /api/types/:id
 * @access  Public
 */
exports.getTypeById = asyncHandler(async (req, res, next) => {
  const type = await Type.findById(req.params.id)
    .populate('categoryIds', 'name slug');
  
  if (!type) {
    return next(new ErrorHandler('Type not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: type
  });
});

/**
 * Get type by slug
 * @route   GET /api/types/slug/:slug
 * @access  Public
 */
exports.getTypeBySlug = asyncHandler(async (req, res, next) => {
  const type = await Type.findOne({ slug: req.params.slug })
    .populate('categoryIds', 'name slug');
  
  if (!type) {
    return next(new ErrorHandler('Type not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: type
  });
});

/**
 * Create a new type
 * @route   POST /api/types
 * @access  Private/Admin
 */
exports.createType = asyncHandler(async (req, res, next) => {
  // Generate slug from name if not provided
  if (!req.body.slug && req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  const type = await Type.create(req.body);
  
  res.status(201).json({
    success: true,
    data: type
  });
});

/**
 * Update type
 * @route   PUT /api/types/:id
 * @access  Private/Admin
 */
exports.updateType = asyncHandler(async (req, res, next) => {
  let type = await Type.findById(req.params.id);
  
  if (!type) {
    return next(new ErrorHandler('Type not found', 404));
  }
  
  // Update slug if name is changed and slug is not provided
  if (req.body.name && (!req.body.slug || type.name !== req.body.name)) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  // Update type
  type = await Type.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: type
  });
});

/**
 * Delete type
 * @route   DELETE /api/types/:id
 * @access  Private/Admin
 */
exports.deleteType = asyncHandler(async (req, res, next) => {
  const type = await Type.findById(req.params.id);
  
  if (!type) {
    return next(new ErrorHandler('Type not found', 404));
  }
  
  await Type.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Type deleted successfully'
  });
}); 