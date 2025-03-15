const Category = require('../models/Category');
const Product = require('../models/Product');
const Type = require('../models/Type');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const { active, parent } = req.query;
    
    // Build filter
    const filter = {};
    
    if (active === 'true') {
      filter.isActive = true;
    } else if (active === 'false') {
      filter.isActive = false;
    }
    
    if (parent === 'null') {
      filter.parentId = null;
    } else if (parent) {
      filter.parentId = parent;
    }
    
    const categories = await Category.find(filter)
      .sort({ displayOrder: 1, name: 1 })
      .populate('parentId', 'name slug');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parentId', 'name slug');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get category by slug
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parentId', 'name slug');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    // Check if category has products
    const productsCount = await Product.countDocuments({ categoryIds: req.params.id });
    
    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${productsCount} associated products`
      });
    }
    
    // Check if category has types
    const typesCount = await Type.countDocuments({ categoryIds: req.params.id });
    
    if (typesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${typesCount} associated types`
      });
    }
    
    // Check if category has child categories
    const childrenCount = await Category.countDocuments({ parentId: req.params.id });
    
    if (childrenCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${childrenCount} child categories`
      });
    }
    
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get category hierarchy
exports.getCategoryHierarchy = async (req, res) => {
  try {
    // Get all categories
    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 });
    
    // Build hierarchy
    const rootCategories = [];
    const categoryMap = {};
    
    // First pass: create map of categories by ID
    categories.forEach(category => {
      categoryMap[category._id] = {
        ...category.toObject(),
        children: []
      };
    });
    
    // Second pass: build hierarchy
    categories.forEach(category => {
      if (category.parentId) {
        // This is a child category
        if (categoryMap[category.parentId]) {
          categoryMap[category.parentId].children.push(categoryMap[category._id]);
        }
      } else {
        // This is a root category
        rootCategories.push(categoryMap[category._id]);
      }
    });
    
    res.status(200).json({
      success: true,
      data: rootCategories
    });
  } catch (error) {
    console.error('Error fetching category hierarchy:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 