const Product = require('../models/Product');
const Category = require('../models/Category');
const Type = require('../models/Type');
const Brand = require('../models/Brand');

// Get all products with filtering
exports.getProducts = async (req, res) => {
  try {
    const { 
      categories, 
      types, 
      brands, 
      countries, 
      minPrice, 
      maxPrice, 
      search,
      sort = 'name',
      order = 'asc',
      page = 1,
      limit = 10
    } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    // Filter by categories
    if (categories) {
      const categoryIds = categories.split(',');
      filter.categoryIds = { $in: categoryIds };
    }
    
    // Filter by types
    if (types) {
      const typeIds = types.split(',');
      filter.typeIds = { $in: typeIds };
    }
    
    // Filter by brands
    if (brands) {
      const brandIds = brands.split(',');
      filter.brandId = { $in: brandIds };
    }
    
    // Filter by countries
    if (countries) {
      const countryIds = countries.split(',');
      filter.countryId = { $in: countryIds };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Search by name, description, or SKU
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;
    
    // Execute query with pagination and sorting
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .populate('categoryIds', 'name slug')
      .populate('brandId', 'name slug')
      .populate('typeIds', 'name slug')
      .populate('countryId', 'name code');
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      },
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryIds', 'name slug')
      .populate('brandId', 'name slug')
      .populate('typeIds', 'name slug')
      .populate('countryId', 'name code');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, dateModified: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get filter counts
exports.getFilterCounts = async (req, res) => {
  try {
    const { categories, types, brands, countries } = req.query;
    
    // Build base filter
    const baseFilter = { isActive: true };
    
    // Apply existing filters
    if (categories) {
      const categoryIds = categories.split(',');
      baseFilter.categoryIds = { $in: categoryIds };
    }
    
    if (types) {
      const typeIds = types.split(',');
      baseFilter.typeIds = { $in: typeIds };
    }
    
    if (brands) {
      const brandIds = brands.split(',');
      baseFilter.brandId = { $in: brandIds };
    }
    
    if (countries) {
      const countryIds = countries.split(',');
      baseFilter.countryId = { $in: countryIds };
    }
    
    // Get all products matching the base filter
    const products = await Product.find(baseFilter);
    
    // Calculate counts for each filter type
    const counts = {
      categories: {},
      types: {},
      brands: {},
      countries: {}
    };
    
    // Count products for each category
    const categoryFilter = { ...baseFilter };
    if (categoryFilter.categoryIds) delete categoryFilter.categoryIds;
    
    const categoryProducts = await Product.find(categoryFilter);
    categoryProducts.forEach(product => {
      product.categoryIds.forEach(catId => {
        const catIdStr = catId.toString();
        counts.categories[catIdStr] = (counts.categories[catIdStr] || 0) + 1;
      });
    });
    
    // Count products for each type
    const typeFilter = { ...baseFilter };
    if (typeFilter.typeIds) delete typeFilter.typeIds;
    
    const typeProducts = await Product.find(typeFilter);
    typeProducts.forEach(product => {
      product.typeIds.forEach(typeId => {
        const typeIdStr = typeId.toString();
        counts.types[typeIdStr] = (counts.types[typeIdStr] || 0) + 1;
      });
    });
    
    // Count products for each brand
    const brandFilter = { ...baseFilter };
    if (brandFilter.brandId) delete brandFilter.brandId;
    
    const brandProducts = await Product.find(brandFilter);
    brandProducts.forEach(product => {
      if (product.brandId) {
        const brandIdStr = product.brandId.toString();
        counts.brands[brandIdStr] = (counts.brands[brandIdStr] || 0) + 1;
      }
    });
    
    // Count products for each country
    const countryFilter = { ...baseFilter };
    if (countryFilter.countryId) delete countryFilter.countryId;
    
    const countryProducts = await Product.find(countryFilter);
    countryProducts.forEach(product => {
      if (product.countryId) {
        const countryIdStr = product.countryId.toString();
        counts.countries[countryIdStr] = (counts.countries[countryIdStr] || 0) + 1;
      }
    });
    
    res.status(200).json({
      success: true,
      data: counts
    });
  } catch (error) {
    console.error('Error getting filter counts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 