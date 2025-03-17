import React, { useState, useEffect } from 'react';
import { 
  getAvailableCategories, 
  getAvailableTypes, 
  getAvailableBrands, 
  getAvailableCountries,
  updateFilterState,
  updatePriceRange,
  updateSearchQuery,
  resetFilters
} from '../../data/filterLogic';

const ProductFilters = ({ 
  allProducts = [], 
  allCategories = [], 
  allTypes = [], 
  allBrands = [], 
  allCountries = [], 
  currentFilters, 
  onFiltersChange,
  filterCounts
}) => {
  // Local state for UI elements
  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    types: true,
    brands: true,
    countries: true,
    price: true
  });
  
  // Available filter options based on current selections
  const [availableOptions, setAvailableOptions] = useState({
    categories: [],
    types: [],
    brands: [],
    countries: []
  });
  
  // Price range inputs
  const [priceInputs, setPriceInputs] = useState({
    min: currentFilters.priceRange.min || '',
    max: currentFilters.priceRange.max || ''
  });
  
  // Update available options when filters change
  useEffect(() => {
    // Ensure allProducts is an array
    const products = Array.isArray(allProducts) ? allProducts : [];
    
    // Get available options based on current filters
    const availableCategories = getAvailableCategories(currentFilters, products);
    const availableTypes = getAvailableTypes(currentFilters, products);
    const availableBrands = getAvailableBrands(currentFilters, products);
    const availableCountries = getAvailableCountries(currentFilters, products);
    
    setAvailableOptions({
      categories: availableCategories,
      types: availableTypes,
      brands: availableBrands,
      countries: availableCountries
    });
  }, [currentFilters, allProducts]);
  
  // Handle filter toggle
  const handleFilterToggle = (filterType, filterId, isSelected) => {
    const updatedFilters = updateFilterState(
      currentFilters, 
      filterType, 
      filterId, 
      isSelected
    );
    onFiltersChange(updatedFilters);
  };
  
  // Handle price range change
  const handlePriceChange = () => {
    const min = priceInputs.min === '' ? null : parseFloat(priceInputs.min);
    const max = priceInputs.max === '' ? null : parseFloat(priceInputs.max);
    
    const updatedFilters = updatePriceRange(currentFilters, min, max);
    onFiltersChange(updatedFilters);
  };
  
  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    const updatedFilters = updateSearchQuery(currentFilters, query);
    onFiltersChange(updatedFilters);
  };
  
  // Handle reset filters
  const handleResetFilters = () => {
    setPriceInputs({ min: '', max: '' });
    onFiltersChange(resetFilters());
  };
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setIsExpanded({
      ...isExpanded,
      [section]: !isExpanded[section]
    });
  };
  
  return (
    <div className="product-filters bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset All
        </button>
      </div>
      
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={currentFilters.searchQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      
      {/* Categories Section */}
      <div className="filter-section mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer py-2 border-b"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="font-medium">Categories</h3>
          <span>{isExpanded.categories ? '−' : '+'}</span>
        </div>
        
        {isExpanded.categories && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {allCategories.map(category => {
              const categoryId = category._id || category.id;
              const isAvailable = availableOptions.categories.includes(categoryId);
              const isSelected = currentFilters.selectedCategories.includes(categoryId);
              const count = filterCounts?.categories[categoryId] || 0;
              
              return (
                <div 
                  key={categoryId} 
                  className={`flex items-center py-1 ${!isAvailable && !isSelected ? 'opacity-50' : ''}`}
                >
                  <input
                    type="checkbox"
                    id={`category-${categoryId}`}
                    checked={isSelected}
                    onChange={(e) => handleFilterToggle('category', categoryId, e.target.checked)}
                    disabled={!isAvailable && !isSelected}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`category-${categoryId}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {category.name}
                  </label>
                  <span className="text-xs text-gray-500">({count})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Types Section - Only show if categories are selected */}
      {(currentFilters.selectedCategories.length > 0 || currentFilters.selectedTypes.length > 0) && (
        <div className="filter-section mb-4">
          <div 
            className="flex justify-between items-center cursor-pointer py-2 border-b"
            onClick={() => toggleSection('types')}
          >
            <h3 className="font-medium">Types</h3>
            <span>{isExpanded.types ? '−' : '+'}</span>
          </div>
          
          {isExpanded.types && (
            <div className="mt-2 max-h-60 overflow-y-auto">
              {allTypes
                .filter(type => {
                  const typeId = type._id || type.id;
                  return availableOptions.types.includes(typeId) || currentFilters.selectedTypes.includes(typeId);
                })
                .map(type => {
                  const typeId = type._id || type.id;
                  const isSelected = currentFilters.selectedTypes.includes(typeId);
                  const count = filterCounts?.types[typeId] || 0;
                  
                  return (
                    <div key={typeId} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        id={`type-${typeId}`}
                        checked={isSelected}
                        onChange={(e) => handleFilterToggle('type', typeId, e.target.checked)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`type-${typeId}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {type.name}
                      </label>
                      <span className="text-xs text-gray-500">({count})</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
      
      {/* Brands Section */}
      <div className="filter-section mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer py-2 border-b"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="font-medium">Brands</h3>
          <span>{isExpanded.brands ? '−' : '+'}</span>
        </div>
        
        {isExpanded.brands && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {allBrands
              .filter(brand => {
                const brandId = brand._id || brand.id;
                return availableOptions.brands.includes(brandId) || currentFilters.selectedBrands.includes(brandId);
              })
              .map(brand => {
                const brandId = brand._id || brand.id;
                const isSelected = currentFilters.selectedBrands.includes(brandId);
                const count = filterCounts?.brands[brandId] || 0;
                
                return (
                  <div key={brandId} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      id={`brand-${brandId}`}
                      checked={isSelected}
                      onChange={(e) => handleFilterToggle('brand', brandId, e.target.checked)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor={`brand-${brandId}`}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {brand.name}
                    </label>
                    <span className="text-xs text-gray-500">({count})</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      
      {/* Countries Section */}
      <div className="filter-section mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer py-2 border-b"
          onClick={() => toggleSection('countries')}
        >
          <h3 className="font-medium">Countries</h3>
          <span>{isExpanded.countries ? '−' : '+'}</span>
        </div>
        
        {isExpanded.countries && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {allCountries
              .filter(country => availableOptions.countries.includes(country.id) || currentFilters.selectedCountries.includes(country.id))
              .map(country => {
                const isSelected = currentFilters.selectedCountries.includes(country.id);
                const count = filterCounts?.countries[country.id] || 0;
                
                return (
                  <div key={country.id} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      id={`country-${country.id}`}
                      checked={isSelected}
                      onChange={(e) => handleFilterToggle('country', country.id, e.target.checked)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor={`country-${country.id}`}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {country.name}
                    </label>
                    <span className="text-xs text-gray-500">({count})</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      
      {/* Price Range Section */}
      <div className="filter-section mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer py-2 border-b"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-medium">Price Range</h3>
          <span>{isExpanded.price ? '−' : '+'}</span>
        </div>
        
        {isExpanded.price && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceInputs.min}
                onChange={(e) => setPriceInputs({ ...priceInputs, min: e.target.value })}
                className="w-1/2 px-3 py-2 border rounded"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceInputs.max}
                onChange={(e) => setPriceInputs({ ...priceInputs, max: e.target.value })}
                className="w-1/2 px-3 py-2 border rounded"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      {/* Active Filters Summary */}
      {(currentFilters.selectedCategories.length > 0 || 
        currentFilters.selectedTypes.length > 0 || 
        currentFilters.selectedBrands.length > 0 || 
        currentFilters.selectedCountries.length > 0 ||
        currentFilters.priceRange.min !== null ||
        currentFilters.priceRange.max !== null) && (
        <div className="active-filters mt-4 pt-4 border-t">
          <h3 className="font-medium mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {currentFilters.selectedCategories.map(catId => {
              const category = allCategories.find(c => (c._id || c.id) === catId);
              return (
                <div key={catId} className="filter-pill bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <span>{category?.name || catId}</span>
                  <button 
                    onClick={() => handleFilterToggle('category', catId, false)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            
            {currentFilters.selectedTypes.map(typeId => {
              const type = allTypes.find(t => (t._id || t.id) === typeId);
              return (
                <div key={typeId} className="filter-pill bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <span>{type?.name || typeId}</span>
                  <button 
                    onClick={() => handleFilterToggle('type', typeId, false)}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            
            {currentFilters.selectedBrands.map(brandId => {
              const brand = allBrands.find(b => (b._id || b.id) === brandId);
              return (
                <div key={brandId} className="filter-pill bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <span>{brand?.name || brandId}</span>
                  <button 
                    onClick={() => handleFilterToggle('brand', brandId, false)}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            
            {currentFilters.selectedCountries.map(countryId => {
              const country = allCountries.find(c => c.id === countryId);
              return (
                <div key={countryId} className="filter-pill bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <span>{country?.name || countryId}</span>
                  <button 
                    onClick={() => handleFilterToggle('country', countryId, false)}
                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            
            {(currentFilters.priceRange.min !== null || currentFilters.priceRange.max !== null) && (
              <div className="filter-pill bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
                <span>
                  Price: 
                  {currentFilters.priceRange.min !== null ? ` $${currentFilters.priceRange.min}` : ' $0'} 
                  {' - '} 
                  {currentFilters.priceRange.max !== null ? `$${currentFilters.priceRange.max}` : 'Any'}
                </span>
                <button 
                  onClick={() => {
                    setPriceInputs({ min: '', max: '' });
                    onFiltersChange(updatePriceRange(currentFilters, null, null));
                  }}
                  className="ml-1 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters; 