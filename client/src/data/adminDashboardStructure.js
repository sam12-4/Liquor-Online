// adminDashboardStructure.js
// Core data structure for the admin dashboard with flexible filtering capabilities

// ==========================================
// PRODUCT SCHEMA
// ==========================================
const productSchema = {
  id: 'string/uuid', // Unique identifier
  name: 'string',
  description: 'string',
  price: 'number',
  images: ['string'], // Array of image URLs
  stock: 'number',
  sku: 'string',
  isActive: 'boolean',
  isHot: 'boolean',
  dateAdded: 'date',
  dateModified: 'date',
  
  // Relationships (stored as arrays of IDs for flexibility)
  categoryIds: ['string'], // A product can belong to multiple categories
  brandId: 'string',
  typeIds: ['string'], // A product can have multiple types
  countryId: 'string',
  
  // Additional attributes (can be extended as needed)
  attributes: {
    // Dynamic key-value pairs for product-specific attributes
    // e.g., alcohol_percentage, volume, vintage, etc.
  }
};

// ==========================================
// FILTER ENTITIES
// ==========================================

// Categories (e.g., Wine, Spirits, Beer)
const categorySchema = {
  id: 'string/uuid',
  name: 'string',
  slug: 'string', // URL-friendly name
  description: 'string',
  parentId: 'string', // For nested categories (optional)
  image: 'string',
  isActive: 'boolean',
  displayOrder: 'number', // For controlling display order
  
  // Metadata for filtering UI
  filterMetadata: {
    showInMainNav: 'boolean',
    showInFilters: 'boolean',
    iconClass: 'string'
  }
};

// Types (e.g., Red Wine, White Wine, Vodka, Whiskey)
const typeSchema = {
  id: 'string/uuid',
  name: 'string',
  slug: 'string',
  description: 'string',
  isActive: 'boolean',
  displayOrder: 'number',
  
  // Relationships
  categoryIds: ['string'], // Types can belong to multiple categories
  
  // Metadata
  filterMetadata: {
    displayName: 'string', // Optional custom display name
    showInFilters: 'boolean'
  }
};

// Brands
const brandSchema = {
  id: 'string/uuid',
  name: 'string',
  slug: 'string',
  description: 'string',
  logo: 'string',
  website: 'string',
  isActive: 'boolean',
  
  // Relationships
  countryId: 'string', // Country of origin
  
  // Metadata for filtering
  filterMetadata: {
    featured: 'boolean',
    showInFilters: 'boolean'
  }
};

// Countries
const countrySchema = {
  id: 'string/uuid',
  name: 'string',
  code: 'string', // ISO country code
  flag: 'string', // Flag image URL
  isActive: 'boolean',
  
  // Metadata
  filterMetadata: {
    showInFilters: 'boolean',
    regionId: 'string' // Optional region grouping
  }
};

// ==========================================
// RELATIONSHIP MAPPING TABLES
// ==========================================

// These tables help with efficient querying of relationships
// and enable dynamic filtering based on selections

// Maps which types are available for each category
const categoryTypeMap = {
  // categoryId -> array of typeIds
  // Example: 'wine': ['red-wine', 'white-wine', 'rose']
};

// Maps which brands are available for each category
const categoryBrandMap = {
  // categoryId -> array of brandIds
  // Example: 'spirits': ['jack-daniels', 'absolut', 'grey-goose']
};

// Maps which countries are available for each category
const categoryCountryMap = {
  // categoryId -> array of countryIds
  // Example: 'wine': ['france', 'italy', 'spain', 'usa']
};

// Maps which types are available for each brand
const brandTypeMap = {
  // brandId -> array of typeIds
  // Example: 'jack-daniels': ['whiskey', 'bourbon']
};

// Maps which brands are available for each country
const countryBrandMap = {
  // countryId -> array of brandIds
  // Example: 'france': ['moet', 'hennessy']
};

// ==========================================
// FILTER STATE MANAGEMENT
// ==========================================

// This represents the current state of filters in the UI
const filterState = {
  selectedCategories: [], // Array of selected category IDs
  selectedTypes: [], // Array of selected type IDs
  selectedBrands: [], // Array of selected brand IDs
  selectedCountries: [], // Array of selected country IDs
  
  // Additional filters
  priceRange: {
    min: null,
    max: null
  },
  
  // Search query
  searchQuery: '',
  
  // Sorting
  sortBy: 'name', // 'name', 'price', 'newest', etc.
  sortDirection: 'asc' // 'asc' or 'desc'
};

// ==========================================
// FILTER LOGIC FUNCTIONS
// ==========================================

/**
 * Get available types based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @returns {Array} - Available type IDs
 */
const getAvailableTypes = (currentFilters, allProducts) => {
  // Implementation would filter types based on selected categories, brands, countries
  // Return only types that have matching products
};

/**
 * Get available brands based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @returns {Array} - Available brand IDs
 */
const getAvailableBrands = (currentFilters, allProducts) => {
  // Implementation would filter brands based on selected categories, types, countries
  // Return only brands that have matching products
};

/**
 * Get available countries based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @returns {Array} - Available country IDs
 */
const getAvailableCountries = (currentFilters, allProducts) => {
  // Implementation would filter countries based on selected categories, types, brands
  // Return only countries that have matching products
};

/**
 * Filter products based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @returns {Array} - Filtered products
 */
const filterProducts = (currentFilters, allProducts) => {
  // Implementation would apply all filters to the product list
  // Return only products that match all selected filters
};

/**
 * Update filter state when a new filter is selected
 * @param {Object} currentFilters - Current filter state
 * @param {String} filterType - Type of filter ('category', 'type', 'brand', 'country')
 * @param {String} filterId - ID of the selected filter
 * @param {Boolean} isSelected - Whether the filter is being selected or deselected
 * @returns {Object} - Updated filter state
 */
const updateFilterState = (currentFilters, filterType, filterId, isSelected) => {
  // Implementation would update the filter state based on the selection
  // Return updated filter state
};

// ==========================================
// ADMIN OPERATIONS
// ==========================================

/**
 * Add a new product to the system
 * @param {Object} productData - Product data
 * @returns {Object} - Newly created product
 */
const addProduct = (productData) => {
  // Implementation would validate and add the product
  // Update all necessary relationship maps
};

/**
 * Update an existing product
 * @param {String} productId - ID of the product to update
 * @param {Object} productData - Updated product data
 * @returns {Object} - Updated product
 */
const updateProduct = (productId, productData) => {
  // Implementation would validate and update the product
  // Update all necessary relationship maps
};

/**
 * Add a new category
 * @param {Object} categoryData - Category data
 * @returns {Object} - Newly created category
 */
const addCategory = (categoryData) => {
  // Implementation would validate and add the category
  // Initialize relationship maps
};

/**
 * Add a new type
 * @param {Object} typeData - Type data
 * @returns {Object} - Newly created type
 */
const addType = (typeData) => {
  // Implementation would validate and add the type
  // Update relationship maps
};

/**
 * Add a new brand
 * @param {Object} brandData - Brand data
 * @returns {Object} - Newly created brand
 */
const addBrand = (brandData) => {
  // Implementation would validate and add the brand
  // Update relationship maps
};

/**
 * Add a new country
 * @param {Object} countryData - Country data
 * @returns {Object} - Newly created country
 */
const addCountry = (countryData) => {
  // Implementation would validate and add the country
  // Update relationship maps
};

// Export all schemas and functions
export {
  // Schemas
  productSchema,
  categorySchema,
  typeSchema,
  brandSchema,
  countrySchema,
  
  // Relationship maps
  categoryTypeMap,
  categoryBrandMap,
  categoryCountryMap,
  brandTypeMap,
  countryBrandMap,
  
  // Filter state
  filterState,
  
  // Filter functions
  getAvailableTypes,
  getAvailableBrands,
  getAvailableCountries,
  filterProducts,
  updateFilterState,
  
  // Admin operations
  addProduct,
  updateProduct,
  addCategory,
  addType,
  addBrand,
  addCountry
}; 