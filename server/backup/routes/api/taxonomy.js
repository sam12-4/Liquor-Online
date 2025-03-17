const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const { check, validationResult } = require('express-validator');

// Models
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');
const Type = require('../../models/Type');

/**
 * @route   GET api/taxonomy/brands
 * @desc    Get all brands
 * @access  Public
 */
router.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/taxonomy/brands/:id
 * @desc    Get brand by ID
 * @access  Public
 */
router.get('/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/taxonomy/brands
 * @desc    Create a brand
 * @access  Private/Admin
 */
router.post('/brands', [
  auth, 
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('slug', 'Slug is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
    name, 
    slug, 
    description, 
    logo, 
    website, 
    isActive, 
    countryId,
    filterMetadata
  } = req.body;
  
  try {
    // Check if brand already exists
    let brand = await Brand.findOne({ slug });
    
    if (brand) {
      return res.status(400).json({ msg: 'Brand with this slug already exists' });
    }
    
    // Create new brand
    brand = new Brand({
      name,
      slug,
      description,
      logo,
      website,
      isActive: isActive !== undefined ? isActive : true,
      countryId,
      filterMetadata: filterMetadata || {
        featured: false,
        showInFilters: true
      }
    });
    
    await brand.save();
    
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/taxonomy/brands/:id
 * @desc    Update a brand
 * @access  Private/Admin
 */
router.put('/brands/:id', [auth, admin], async (req, res) => {
  const { 
    name, 
    slug, 
    description, 
    logo, 
    website, 
    isActive, 
    countryId,
    filterMetadata
  } = req.body;
  
  // Build brand object
  const brandFields = {};
  if (name) brandFields.name = name;
  if (slug) brandFields.slug = slug;
  if (description !== undefined) brandFields.description = description;
  if (logo !== undefined) brandFields.logo = logo;
  if (website !== undefined) brandFields.website = website;
  if (isActive !== undefined) brandFields.isActive = isActive;
  if (countryId !== undefined) brandFields.countryId = countryId;
  if (filterMetadata) brandFields.filterMetadata = filterMetadata;
  
  try {
    let brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    
    // Update brand
    brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { $set: brandFields },
      { new: true }
    );
    
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/taxonomy/brands/:id
 * @desc    Delete a brand
 * @access  Private/Admin
 */
router.delete('/brands/:id', [auth, admin], async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    
    await brand.remove();
    
    res.json({ msg: 'Brand removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/taxonomy/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/taxonomy/categories/:id
 * @desc    Get category by ID
 * @access  Public
 */
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/taxonomy/categories
 * @desc    Create a category
 * @access  Private/Admin
 */
router.post('/categories', [
  auth, 
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('slug', 'Slug is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
    name, 
    slug, 
    description, 
    image, 
    parentId,
    isActive, 
    sortOrder
  } = req.body;
  
  try {
    // Check if category already exists
    let category = await Category.findOne({ slug });
    
    if (category) {
      return res.status(400).json({ msg: 'Category with this slug already exists' });
    }
    
    // Create new category
    category = new Category({
      name,
      slug,
      description,
      image,
      parentId,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });
    
    await category.save();
    
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/taxonomy/categories/:id
 * @desc    Update a category
 * @access  Private/Admin
 */
router.put('/categories/:id', [auth, admin], async (req, res) => {
  const { 
    name, 
    slug, 
    description, 
    image, 
    parentId,
    isActive, 
    sortOrder
  } = req.body;
  
  // Build category object
  const categoryFields = {};
  if (name) categoryFields.name = name;
  if (slug) categoryFields.slug = slug;
  if (description !== undefined) categoryFields.description = description;
  if (image !== undefined) categoryFields.image = image;
  if (parentId !== undefined) categoryFields.parentId = parentId;
  if (isActive !== undefined) categoryFields.isActive = isActive;
  if (sortOrder !== undefined) categoryFields.sortOrder = sortOrder;
  
  try {
    let category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    
    // Update category
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: categoryFields },
      { new: true }
    );
    
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/taxonomy/categories/:id
 * @desc    Delete a category
 * @access  Private/Admin
 */
router.delete('/categories/:id', [auth, admin], async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    
    await category.remove();
    
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/taxonomy/types
 * @desc    Get all types
 * @access  Public
 */
router.get('/types', async (req, res) => {
  try {
    const types = await Type.find().sort({ name: 1 });
    res.json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/taxonomy/types/:id
 * @desc    Get type by ID
 * @access  Public
 */
router.get('/types/:id', async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    
    if (!type) {
      return res.status(404).json({ msg: 'Type not found' });
    }
    
    res.json(type);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Type not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/taxonomy/types
 * @desc    Create a type
 * @access  Private/Admin
 */
router.post('/types', [
  auth, 
  admin,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('slug', 'Slug is required').not().isEmpty(),
    check('categoryId', 'Category is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { 
    name, 
    slug, 
    description, 
    categoryId,
    isActive, 
    sortOrder
  } = req.body;
  
  try {
    // Check if type already exists
    let type = await Type.findOne({ slug, categoryId });
    
    if (type) {
      return res.status(400).json({ msg: 'Type with this slug already exists in this category' });
    }
    
    // Create new type
    type = new Type({
      name,
      slug,
      description,
      categoryId,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });
    
    await type.save();
    
    res.json(type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/taxonomy/types/:id
 * @desc    Update a type
 * @access  Private/Admin
 */
router.put('/types/:id', [auth, admin], async (req, res) => {
  const { 
    name, 
    slug, 
    description, 
    categoryId,
    isActive, 
    sortOrder
  } = req.body;
  
  // Build type object
  const typeFields = {};
  if (name) typeFields.name = name;
  if (slug) typeFields.slug = slug;
  if (description !== undefined) typeFields.description = description;
  if (categoryId) typeFields.categoryId = categoryId;
  if (isActive !== undefined) typeFields.isActive = isActive;
  if (sortOrder !== undefined) typeFields.sortOrder = sortOrder;
  
  try {
    let type = await Type.findById(req.params.id);
    
    if (!type) {
      return res.status(404).json({ msg: 'Type not found' });
    }
    
    // Update type
    type = await Type.findByIdAndUpdate(
      req.params.id,
      { $set: typeFields },
      { new: true }
    );
    
    res.json(type);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Type not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/taxonomy/types/:id
 * @desc    Delete a type
 * @access  Private/Admin
 */
router.delete('/types/:id', [auth, admin], async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    
    if (!type) {
      return res.status(404).json({ msg: 'Type not found' });
    }
    
    await type.remove();
    
    res.json({ msg: 'Type removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Type not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 