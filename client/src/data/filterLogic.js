// filterLogic.js
// Implementation of the filter logic functions for the admin dashboard

/**
 * Get available types based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @param {Object} relationships - Relationship maps
 * @returns {Array} - Available type IDs
 */
export const getAvailableTypes = (currentFilters, allProducts = [], relationships) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return [];
  }
  
  const { 
    selectedCategories, 
    selectedBrands, 
    selectedCountries 
  } = currentFilters;
  
  // Start with all products
  let filteredProducts = [...allProducts];
  
  // Apply existing filters (except types)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.categoryIds && product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brandId)
    );
  }
  
  if (selectedCountries.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCountries.includes(product.countryId)
    );
  }
  
  // Extract all type IDs from the filtered products
  const availableTypeIds = new Set();
  filteredProducts.forEach(product => {
    product.typeIds.forEach(typeId => {
      availableTypeIds.add(typeId);
    });
  });
  
  return Array.from(availableTypeIds);
};

/**
 * Get available brands based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @param {Object} relationships - Relationship maps
 * @returns {Array} - Available brand IDs
 */
export const getAvailableBrands = (currentFilters, allProducts = [], relationships) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return [];
  }
  
  const { 
    selectedCategories, 
    selectedTypes, 
    selectedCountries 
  } = currentFilters;
  
  // Start with all products
  let filteredProducts = [...allProducts];
  
  // Apply existing filters (except brands)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.categoryIds && product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds && product.typeIds.some(typeId => selectedTypes.includes(typeId))
    );
  }
  
  if (selectedCountries.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCountries.includes(product.countryId)
    );
  }
  
  // Extract all brand IDs from the filtered products
  const availableBrandIds = new Set();
  filteredProducts.forEach(product => {
    if (product.brandId) {
      availableBrandIds.add(product.brandId);
    }
  });
  
  return Array.from(availableBrandIds);
};

/**
 * Get available countries based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @param {Object} relationships - Relationship maps
 * @returns {Array} - Available country IDs
 */
export const getAvailableCountries = (currentFilters, allProducts = [], relationships) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return [];
  }
  
  const { 
    selectedCategories, 
    selectedTypes, 
    selectedBrands 
  } = currentFilters;
  
  // Start with all products
  let filteredProducts = [...allProducts];
  
  // Apply existing filters (except countries)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.categoryIds && product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds && product.typeIds.some(typeId => selectedTypes.includes(typeId))
    );
  }
  
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brandId)
    );
  }
  
  // Extract all country IDs from the filtered products
  const availableCountryIds = new Set();
  filteredProducts.forEach(product => {
    if (product.countryId) {
      availableCountryIds.add(product.countryId);
    }
  });
  
  return Array.from(availableCountryIds);
};

/**
 * Get available categories based on current filters
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products
 * @param {Object} relationships - Optional relationships data
 * @returns {Array} - Available category IDs
 */
export const getAvailableCategories = (currentFilters, allProducts = [], relationships) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return [];
  }
  
  const { 
    selectedTypes, 
    selectedBrands, 
    selectedCountries 
  } = currentFilters;
  
  // Start with all products
  let filteredProducts = [...allProducts];
  
  // Apply existing filters (except categories)
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds && product.typeIds.some(typeId => selectedTypes.includes(typeId))
    );
  }
  
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brandId)
    );
  }
  
  if (selectedCountries.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCountries.includes(product.countryId)
    );
  }
  
  // Extract all category IDs from the filtered products
  const availableCategoryIds = new Set();
  filteredProducts.forEach(product => {
    product.categoryIds.forEach(catId => {
      availableCategoryIds.add(catId);
    });
  });
  
  return Array.from(availableCategoryIds);
};

/**
 * Filter products based on current filter state
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products
 * @returns {Array} - Filtered products
 */
export const filterProducts = (currentFilters, allProducts = []) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return [];
  }
  
  const { 
    selectedCategories, 
    selectedTypes, 
    selectedBrands, 
    selectedCountries,
    priceRange,
    searchQuery
  } = currentFilters;
  
  // Start with all products
  let filteredProducts = [...allProducts];
  
  // Filter by categories
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.categoryIds && product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  // Filter by types
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds && product.typeIds.some(typeId => selectedTypes.includes(typeId))
    );
  }
  
  // Filter by brands
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brandId)
    );
  }
  
  // Filter by countries
  if (selectedCountries.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCountries.includes(product.countryId)
    );
  }
  
  // Filter by price range
  if (priceRange.min !== null || priceRange.max !== null) {
    filteredProducts = filteredProducts.filter(product => {
      if (priceRange.min !== null && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max !== null && product.price > priceRange.max) {
        return false;
      }
      return true;
    });
  }
  
  // Filter by search query
  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  }
  
  return filteredProducts;
};

/**
 * Update filter state when a new filter is selected
 * @param {Object} currentFilters - Current filter state
 * @param {String} filterType - Type of filter ('category', 'type', 'brand', 'country')
 * @param {String} filterId - ID of the selected filter
 * @param {Boolean} isSelected - Whether the filter is being selected or deselected
 * @returns {Object} - Updated filter state
 */
export const updateFilterState = (currentFilters, filterType, filterId, isSelected) => {
  // Create a copy of the current filters
  const updatedFilters = { ...currentFilters };
  
  // Update the appropriate filter array
  switch (filterType) {
    case 'category':
      if (isSelected) {
        updatedFilters.selectedCategories = [...updatedFilters.selectedCategories, filterId];
      } else {
        updatedFilters.selectedCategories = updatedFilters.selectedCategories.filter(id => id !== filterId);
      }
      break;
      
    case 'type':
      if (isSelected) {
        updatedFilters.selectedTypes = [...updatedFilters.selectedTypes, filterId];
      } else {
        updatedFilters.selectedTypes = updatedFilters.selectedTypes.filter(id => id !== filterId);
      }
      break;
      
    case 'brand':
      if (isSelected) {
        updatedFilters.selectedBrands = [...updatedFilters.selectedBrands, filterId];
      } else {
        updatedFilters.selectedBrands = updatedFilters.selectedBrands.filter(id => id !== filterId);
      }
      break;
      
    case 'country':
      if (isSelected) {
        updatedFilters.selectedCountries = [...updatedFilters.selectedCountries, filterId];
      } else {
        updatedFilters.selectedCountries = updatedFilters.selectedCountries.filter(id => id !== filterId);
      }
      break;
      
    default:
      // Unknown filter type, return unchanged
      return currentFilters;
  }
  
  return updatedFilters;
};

/**
 * Update price range filter
 * @param {Object} currentFilters - Current filter state
 * @param {Number|null} min - Minimum price (null for no minimum)
 * @param {Number|null} max - Maximum price (null for no maximum)
 * @returns {Object} - Updated filter state
 */
export const updatePriceRange = (currentFilters, min, max) => {
  return {
    ...currentFilters,
    priceRange: {
      min,
      max
    }
  };
};

/**
 * Update search query
 * @param {Object} currentFilters - Current filter state
 * @param {String} query - Search query
 * @returns {Object} - Updated filter state
 */
export const updateSearchQuery = (currentFilters, query) => {
  return {
    ...currentFilters,
    searchQuery: query
  };
};

/**
 * Reset all filters
 * @returns {Object} - Reset filter state
 */
export const resetFilters = () => {
  return {
    selectedCategories: [],
    selectedTypes: [],
    selectedBrands: [],
    selectedCountries: [],
    priceRange: {
      min: null,
      max: null
    },
    searchQuery: '',
    sortBy: 'name',
    sortDirection: 'asc'
  };
};

/**
 * Calculate filter counts for UI display
 * @param {Array} allProducts - All products
 * @param {Object} allEntities - All entities (categories, types, brands, countries)
 * @returns {Object} - Filter counts
 */
export const getFilterCounts = (allProducts = [], allEntities = {}) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    return {
      categories: {},
      types: {},
      brands: {},
      countries: {}
    };
  }
  
  const { categories = [], types = [], brands = [], countries = [] } = allEntities;
  
  // Initialize counts
  const counts = {
    categories: {},
    types: {},
    brands: {},
    countries: {}
  };
  
  // Count categories
  categories.forEach(category => {
    counts.categories[category._id || category.id] = 0;
  });
  
  // Count types
  types.forEach(type => {
    counts.types[type._id || type.id] = 0;
  });
  
  // Count brands
  brands.forEach(brand => {
    counts.brands[brand._id || brand.id] = 0;
  });
  
  // Count countries
  countries.forEach(country => {
    counts.countries[country._id || country.id] = 0;
  });
  
  // Count products for each filter
  allProducts.forEach(product => {
    // Count categories
    if (product.categoryIds && Array.isArray(product.categoryIds)) {
      product.categoryIds.forEach(catId => {
        if (counts.categories[catId]) {
          counts.categories[catId]++;
        }
      });
    }
    
    // Count types
    if (product.typeIds && Array.isArray(product.typeIds)) {
      product.typeIds.forEach(typeId => {
        if (counts.types[typeId]) {
          counts.types[typeId]++;
        }
      });
    }
    
    // Count brands
    if (product.brandId && counts.brands[product.brandId]) {
      counts.brands[product.brandId]++;
    }
    
    // Count countries
    if (product.countryId && counts.countries[product.countryId]) {
      counts.countries[product.countryId]++;
    }
  });
  
  return counts;
}; 