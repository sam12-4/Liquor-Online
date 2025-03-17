const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const slugify = require('slugify');

// Models
const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');
const Type = require('../../models/Type');

/**
 * @route   GET api/products
 * @desc    Get all products with pagination and filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Parse query parameters for filtering and pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    
    // Build filter object
    const filter = { isActive: true };
    
    // Category filter
    if (req.query.categories) {
      const categoryIds = req.query.categories.split(',');
      filter.categoryIds = { $in: categoryIds };
    }
    
    // Brand filter
    if (req.query.brand) {
      filter.brandId = req.query.brand;
    }
    
    // Type filter
    if (req.query.type) {
      filter.typeIds = { $in: [req.query.type] };
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Search by name or description
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Execute query with filter, pagination, and sorting
    const products = await Product.find(filter)
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug')
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .select('name slug description shortDescription price salePrice onSale sku stock isActive isHot isFeatured rating ratingCount reviewCount attributes brandId categoryIds typeIds images createdAt updatedAt dateAdded dateModified');
    
    // Get total products count for pagination
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: products
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug');
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    // Get related products based on category and type
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      isActive: true,
      $or: [
        { categoryIds: { $in: product.categoryIds } },
        { typeIds: { $in: product.typeIds } }
      ]
    })
      .populate('brandId', 'name')
      .limit(4)
      .sort({ createdAt: -1 });
    
    res.json({
      product,
      relatedProducts
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/products
 * @desc    Create a product
 * @access  Private/Admin
 */
router.post('/', [
  auth, 
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required and must be a positive number').isFloat({ min: 0 }),
    check('description', 'Description is required').not().isEmpty(),
    check('sku', 'SKU is required').not().isEmpty(),
    check('categoryIds', 'At least one category is required').isArray({ min: 1 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
    name, 
    description,
    shortDescription,
    price,
    salePrice,
    onSale,
    images,
    stock,
    sku,
    isActive,
    isHot,
    isFeatured,
    categoryIds,
    brandId,
    typeIds,
    countryId,
    attributes
  } = req.body;
  
  try {
    // Check if product with the same SKU already exists
    let product = await Product.findOne({ sku });
    
    if (product) {
      return res.status(400).json({ msg: 'Product with this SKU already exists' });
    }
    
    // Generate slug from name
    let slug = slugify(name, {
      lower: true,
      strict: true
    });
    
    // Check if slug already exists
    product = await Product.findOne({ slug });
    if (product) {
      // Append a random string to make slug unique
      const uniqueId = Math.random().toString(36).substring(2, 6);
      slug = `${slug}-${uniqueId}`;
    }
    
    // Create new product
    product = new Product({
      name,
      slug,
      description,
      shortDescription: shortDescription || '',
      price,
      salePrice: salePrice || 0,
      onSale: onSale || false,
      images: images || [],
      stock: stock || 0,
      sku,
      isActive: isActive !== undefined ? isActive : true,
      isHot: isHot || false,
      isFeatured: isFeatured || false,
      categoryIds,
      brandId,
      typeIds: typeIds || [],
      countryId: countryId || '',
      attributes: attributes || {}
    });
    
    await product.save();
    
    // Fetch the product with populated references
    const savedProduct = await Product.findById(product._id)
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug');
    
    res.json(savedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/products/:id
 * @desc    Update a product
 * @access  Private/Admin
 */
router.put('/:id', [auth, admin], async (req, res) => {
  const { 
    name, 
    description,
    shortDescription,
    price,
    salePrice,
    onSale,
    images,
    stock,
    sku,
    isActive,
    isHot,
    isFeatured,
    categoryIds,
    brandId,
    typeIds,
    countryId,
    attributes
  } = req.body;
  
  // Build product object
  const productFields = {};
  if (name) {
    productFields.name = name;
    
    // Update slug if name changes
    productFields.slug = slugify(name, {
      lower: true,
      strict: true
    });
  }
  
  if (description !== undefined) productFields.description = description;
  if (shortDescription !== undefined) productFields.shortDescription = shortDescription;
  if (price !== undefined) productFields.price = price;
  if (salePrice !== undefined) productFields.salePrice = salePrice;
  if (onSale !== undefined) productFields.onSale = onSale;
  if (images) productFields.images = images;
  if (stock !== undefined) productFields.stock = stock;
  if (sku) productFields.sku = sku;
  if (isActive !== undefined) productFields.isActive = isActive;
  if (isHot !== undefined) productFields.isHot = isHot;
  if (isFeatured !== undefined) productFields.isFeatured = isFeatured;
  if (categoryIds) productFields.categoryIds = categoryIds;
  if (brandId !== undefined) productFields.brandId = brandId;
  if (typeIds) productFields.typeIds = typeIds;
  if (countryId !== undefined) productFields.countryId = countryId;
  if (attributes) productFields.attributes = attributes;
  
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    // If SKU is changing, make sure it's not a duplicate
    if (sku && sku !== product.sku) {
      const existingSku = await Product.findOne({ sku });
      if (existingSku) {
        return res.status(400).json({ msg: 'Product with this SKU already exists' });
      }
    }
    
    // If slug was updated, make sure it's not duplicate
    if (productFields.slug && productFields.slug !== product.slug) {
      const existingSlug = await Product.findOne({ slug: productFields.slug });
      if (existingSlug && existingSlug._id.toString() !== req.params.id) {
        // Append a random string to make slug unique
        const uniqueId = Math.random().toString(36).substring(2, 6);
        productFields.slug = `${productFields.slug}-${uniqueId}`;
      }
    }
    
    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    )
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug');
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/products/:id
 * @desc    Delete a product
 * @access  Private/Admin
 */
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    await product.remove();
    
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/products/category/:categoryId
 * @desc    Get products by category
 * @access  Public
 */
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ 
      categoryIds: req.params.categoryId,
      isActive: true
    })
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/products/brand/:brandId
 * @desc    Get products by brand
 * @access  Public
 */
router.get('/brand/:brandId', async (req, res) => {
  try {
    const products = await Product.find({ 
      brandId: req.params.brandId,
      isActive: true
    })
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/products/type/:typeId
 * @desc    Get products by type
 * @access  Public
 */
router.get('/type/:typeId', async (req, res) => {
  try {
    const products = await Product.find({ 
      typeIds: req.params.typeId,
      isActive: true
    })
      .populate('brandId', 'name slug')
      .populate('categoryIds', 'name slug')
      .populate('typeIds', 'name slug')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/products/count
 * @desc    Get product counts by category, brand, and type
 * @access  Public
 */
router.get('/count', async (req, res) => {
  try {
    // Get all active products
    const products = await Product.find({ isActive: true });
    
    // Build count objects
    const categoryCounts = {};
    const brandCounts = {};
    const typeCounts = {};
    
    // Count products by category
    for (const product of products) {
      // Count by category
      for (const categoryId of product.categoryIds) {
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      }
      
      // Count by brand
      if (product.brandId) {
        brandCounts[product.brandId] = (brandCounts[product.brandId] || 0) + 1;
      }
      
      // Count by type
      for (const typeId of product.typeIds) {
        typeCounts[typeId] = (typeCounts[typeId] || 0) + 1;
      }
    }
    
    res.json({
      categoryCounts,
      brandCounts,
      typeCounts,
      total: products.length
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 