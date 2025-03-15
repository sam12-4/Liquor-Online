const Type = require('../models/Type');
const Product = require('../models/Product');

// Get all types
exports.getTypes = async (req, res) => {
  try {
    const { active, category } = req.query;
    
    // Build filter
    const filter = {};
    
    if (active === 'true') {
      filter.isActive = true;
    } else if (active === 'false') {
      filter.isActive = false;
    }
    
    if (category) {
      filter.categoryIds = category;
    }
    
    const types = await Type.find(filter)
      .sort({ displayOrder: 1, name: 1 })
      .populate('categoryIds', 'name slug');
    
    res.status(200).json({
      success: true,
      count: types.length,
      data: types
    });
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single type by ID
exports.getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id)
      .populate('categoryIds', 'name slug');
    
    if (!type) {
      return res.status(404).json({
        success: false,
        message: 'Type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: type
    });
  } catch (error) {
    console.error('Error fetching type:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get type by slug
exports.getTypeBySlug = async (req, res) => {
  try {
    const type = await Type.findOne({ slug: req.params.slug })
      .populate('categoryIds', 'name slug');
    
    if (!type) {
      return res.status(404).json({
        success: false,
        message: 'Type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: type
    });
  } catch (error) {
    console.error('Error fetching type by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new type
exports.createType = async (req, res) => {
  try {
    const type = await Type.create(req.body);
    
    res.status(201).json({
      success: true,
      data: type
    });
  } catch (error) {
    console.error('Error creating type:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Update type
exports.updateType = async (req, res) => {
  try {
    const type = await Type.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!type) {
      return res.status(404).json({
        success: false,
        message: 'Type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: type
    });
  } catch (error) {
    console.error('Error updating type:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Delete type
exports.deleteType = async (req, res) => {
  try {
    // Check if type has products
    const productsCount = await Product.countDocuments({ typeIds: req.params.id });
    
    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete type with ${productsCount} associated products`
      });
    }
    
    const type = await Type.findByIdAndDelete(req.params.id);
    
    if (!type) {
      return res.status(404).json({
        success: false,
        message: 'Type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting type:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get types by category
exports.getTypesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const types = await Type.find({ 
      categoryIds: categoryId,
      isActive: true
    })
      .sort({ displayOrder: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      count: types.length,
      data: types
    });
  } catch (error) {
    console.error('Error fetching types by category:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 