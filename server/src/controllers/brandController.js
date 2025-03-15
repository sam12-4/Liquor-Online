const Brand = require('../models/Brand');
const Product = require('../models/Product');

// Get all brands
exports.getBrands = async (req, res) => {
  try {
    const { active, featured, country } = req.query;
    
    // Build filter
    const filter = {};
    
    if (active === 'true') {
      filter.isActive = true;
    } else if (active === 'false') {
      filter.isActive = false;
    }
    
    if (featured === 'true') {
      filter['filterMetadata.featured'] = true;
    }
    
    if (country) {
      filter.countryId = country;
    }
    
    const brands = await Brand.find(filter)
      .sort({ name: 1 })
      .populate('countryId', 'name code');
    
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
      .populate('countryId', 'name code');
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get brand by slug
exports.getBrandBySlug = async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug })
      .populate('countryId', 'name code');
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Error fetching brand by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new brand
exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    
    res.status(201).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Update brand
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    // Check if brand has products
    const productsCount = await Product.countDocuments({ brandId: req.params.id });
    
    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete brand with ${productsCount} associated products`
      });
    }
    
    const brand = await Brand.findByIdAndDelete(req.params.id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get brands by category
exports.getBrandsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Find all products in the category
    const products = await Product.find({ 
      categoryIds: categoryId,
      isActive: true
    });
    
    // Extract unique brand IDs
    const brandIds = [...new Set(
      products
        .filter(product => product.brandId)
        .map(product => product.brandId.toString())
    )];
    
    // Get brands
    const brands = await Brand.find({ 
      _id: { $in: brandIds },
      isActive: true
    })
      .sort({ name: 1 })
      .populate('countryId', 'name code');
    
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands
    });
  } catch (error) {
    console.error('Error fetching brands by category:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 