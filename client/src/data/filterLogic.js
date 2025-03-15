// filterLogic.js
// Implementation of the filter logic functions for the admin dashboard

/**
 * Get available types based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @param {Object} relationships - Relationship maps
 * @returns {Array} - Available type IDs
 */
export const getAvailableTypes = (currentFilters, allProducts, relationships) => {
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
      product.categoryIds.some(catId => selectedCategories.includes(catId))
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
export const getAvailableBrands = (currentFilters, allProducts, relationships) => {
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
      product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds.some(typeId => selectedTypes.includes(typeId))
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
export const getAvailableCountries = (currentFilters, allProducts, relationships) => {
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
      product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds.some(typeId => selectedTypes.includes(typeId))
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
 * Get available categories based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @param {Object} relationships - Relationship maps
 * @returns {Array} - Available category IDs
 */
export const getAvailableCategories = (currentFilters, allProducts, relationships) => {
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
      product.typeIds.some(typeId => selectedTypes.includes(typeId))
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
 * Filter products based on current filter selections
 * @param {Object} currentFilters - Current filter state
 * @param {Array} allProducts - All products in the system
 * @returns {Array} - Filtered products
 */
export const filterProducts = (currentFilters, allProducts) => {
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
  
  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.categoryIds.some(catId => selectedCategories.includes(catId))
    );
  }
  
  // Apply type filter
  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.typeIds.some(typeId => selectedTypes.includes(typeId))
    );
  }
  
  // Apply brand filter
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brandId)
    );
  }
  
  // Apply country filter
  if (selectedCountries.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCountries.includes(product.countryId)
    );
  }
  
  // Apply price range filter
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
  
  // Apply search query
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
 * Get filter counts for each filter option
 * @param {Array} allProducts - All products in the system
 * @param {Object} allEntities - All entities (categories, types, brands, countries)
 * @returns {Object} - Counts for each filter option
 */
export const getFilterCounts = (allProducts, allEntities) => {
  const counts = {
    categories: {},
    types: {},
    brands: {},
    countries: {}
  };
  
  // Count products for each category
  allProducts.forEach(product => {
    product.categoryIds.forEach(catId => {
      counts.categories[catId] = (counts.categories[catId] || 0) + 1;
    });
    
    product.typeIds.forEach(typeId => {
      counts.types[typeId] = (counts.types[typeId] || 0) + 1;
    });
    
    if (product.brandId) {
      counts.brands[product.brandId] = (counts.brands[product.brandId] || 0) + 1;
    }
    
    if (product.countryId) {
      counts.countries[product.countryId] = (counts.countries[product.countryId] || 0) + 1;
    }
  });
  
  return counts;
}; 