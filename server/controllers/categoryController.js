const Category = require('../models/category');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

/**
 * Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
exports.getCategories = asyncHandler(async (req, res, next) => {
  // Build query
  let query = {};
  
  // Filter by active status
  if (req.query.active) {
    query.isActive = req.query.active === 'true';
  }
  
  // Filter by parent category (for subcategories)
  if (req.query.parent) {
    if (req.query.parent === 'root') {
      // Get only root categories (without parent)
      query.parentId = null;
    } else {
      // Get subcategories of a specific parent
      query.parentId = req.query.parent;
    }
  }
  
  // Filter by metadata
  if (req.query.showInNav) {
    query['filterMetadata.showInMainNav'] = req.query.showInNav === 'true';
  }
  
  if (req.query.showInFilters) {
    query['filterMetadata.showInFilters'] = req.query.showInFilters === 'true';
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
  const categories = await Category.find(query)
    .populate('parentId', 'name slug')
    .sort(sortOption);
  
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

/**
 * Get category details
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .populate('parentId', 'name slug');
  
  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: category
  });
});

/**
 * Get category by slug
 * @route   GET /api/categories/slug/:slug
 * @access  Public
 */
exports.getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug })
    .populate('parentId', 'name slug');
  
  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: category
  });
});

/**
 * Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Debug log the request body
  console.log("Request body:", JSON.stringify(req.body));
  
  // Generate slug from name if not provided
  if (!req.body.slug && req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  const category = await Category.create(req.body);
  
  res.status(201).json({
    success: true,
    data: category
  });
});

/**
 * Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  
  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }
  
  // Update slug if name is changed and slug is not provided
  if (req.body.name && (!req.body.slug || category.name !== req.body.name)) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }
  
  // Update category
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: category
  });
});

/**
 * Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }
  
  // Check if category has subcategories
  const subcategories = await Category.find({ parentId: req.params.id });
  
  if (subcategories.length > 0) {
    return next(new ErrorHandler('Cannot delete category with subcategories. Please delete or reassign subcategories first.', 400));
  }
  
  // Delete category
  await Category.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
}); 