const Country = require('../models/country');
const ErrorHandler = require('../utils/errorHandler');
const asyncHandler = require('express-async-handler');

/**
 * Get all countries
 * @route   GET /api/countries
 * @access  Public
 */
exports.getCountries = asyncHandler(async (req, res, next) => {
  // Build query
  let query = {};
  
  // Filter by active status
  if (req.query.active) {
    query.isActive = req.query.active === 'true';
  }
  
  // Filter by region
  if (req.query.region) {
    query['filterMetadata.regionId'] = req.query.region;
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
  const countries = await Country.find(query).sort(sortOption);
  
  res.status(200).json({
    success: true,
    count: countries.length,
    data: countries
  });
});

/**
 * Get country details
 * @route   GET /api/countries/:id
 * @access  Public
 */
exports.getCountryById = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);
  
  if (!country) {
    return next(new ErrorHandler('Country not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: country
  });
});

/**
 * Create a new country
 * @route   POST /api/countries
 * @access  Private/Admin
 */
exports.createCountry = asyncHandler(async (req, res, next) => {
  const country = await Country.create(req.body);
  
  res.status(201).json({
    success: true,
    data: country
  });
});

/**
 * Update country
 * @route   PUT /api/countries/:id
 * @access  Private/Admin
 */
exports.updateCountry = asyncHandler(async (req, res, next) => {
  let country = await Country.findById(req.params.id);
  
  if (!country) {
    return next(new ErrorHandler('Country not found', 404));
  }
  
  // Update country
  country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: country
  });
});

/**
 * Delete country
 * @route   DELETE /api/countries/:id
 * @access  Private/Admin
 */
exports.deleteCountry = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);
  
  if (!country) {
    return next(new ErrorHandler('Country not found', 404));
  }
  
  await Country.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Country deleted successfully'
  });
}); 