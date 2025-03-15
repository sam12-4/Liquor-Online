import React, { useState, useEffect } from 'react';
import ProductFilters from '../../components/admin/ProductFilters';
import { filterProducts, resetFilters, getFilterCounts } from '../../data/filterLogic';

// Sample data - in a real app, this would come from an API
import sampleProducts from '../../data/sampleProducts';
import sampleCategories from '../../data/sampleCategories';
import sampleTypes from '../../data/sampleTypes';
import sampleBrands from '../../data/sampleBrands';
import sampleCountries from '../../data/sampleCountries';

const ProductsManagement = () => {
  // State for filters
  const [currentFilters, setCurrentFilters] = useState(resetFilters());
  
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // State for filter counts
  const [filterCounts, setFilterCounts] = useState(null);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(true);
  
  // State for selected products (for bulk actions)
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  
  // Calculate filter counts on initial load
  useEffect(() => {
    const counts = getFilterCounts(sampleProducts, {
      categories: sampleCategories,
      types: sampleTypes,
      brands: sampleBrands,
      countries: sampleCountries
    });
    setFilterCounts(counts);
    setIsLoading(false);
  }, []);
  
  // Update filtered products when filters change
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timeoutId = setTimeout(() => {
      const filtered = filterProducts(currentFilters, sampleProducts);
      
      // Apply sorting
      const sortedProducts = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      
      setFilteredProducts(sortedProducts);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [currentFilters, sortConfig]);
  
  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setCurrentFilters(newFilters);
  };
  
  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Handle product selection
  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
  
  // Handle select all products
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };
  
  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    
    // In a real app, this would call an API to delete the products
    alert(`Deleting ${selectedProducts.length} products`);
    
    // For demo purposes, just remove them from the filtered list
    setFilteredProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
  };
  
  // Handle add new product
  const handleAddProduct = () => {
    // In a real app, this would navigate to a product creation form
    alert('Navigate to add product form');
  };
  
  return (
    <div className="admin-products-page">
      <div className="bg-white p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <button 
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Product
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <ProductFilters 
            allProducts={sampleProducts}
            allCategories={sampleCategories}
            allTypes={sampleTypes}
            allBrands={sampleBrands}
            allCountries={sampleCountries}
            currentFilters={currentFilters}
            onFiltersChange={handleFiltersChange}
            filterCounts={filterCounts}
          />
        </div>
        
        {/* Products List */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white p-4 rounded shadow">
            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded flex justify-between items-center">
                <span className="text-sm">{selectedProducts.length} products selected</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedProducts([])}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Clear Selection
                  </button>
                  <button 
                    onClick={handleBulkDelete}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}
            
            {/* Products Count & View Options */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} products`}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Sort by:</label>
                <select 
                  value={`${sortConfig.key}-${sortConfig.direction}`}
                  onChange={(e) => {
                    const [key, direction] = e.target.value.split('-');
                    setSortConfig({ key, direction });
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="dateAdded-desc">Newest First</option>
                  <option value="dateAdded-asc">Oldest First</option>
                </select>
              </div>
            </div>
            
            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                        className="mr-2"
                      />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Product Name
                      {sortConfig.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      {sortConfig.key === 'price' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-4 text-center">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2">Loading products...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-4 text-center">
                        No products found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => {
                      // Find related entities
                      const productCategories = product.categoryIds.map(catId => 
                        sampleCategories.find(c => c.id === catId)
                      ).filter(Boolean);
                      
                      const productBrand = sampleBrands.find(b => b.id === product.brandId);
                      
                      return (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input 
                              type="checkbox" 
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleProductSelect(product.id)}
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.images && product.images[0] && (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                  className="h-10 w-10 object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {productCategories.map(category => (
                                <span 
                                  key={category.id} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {category.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {productBrand ? productBrand.name : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.stock > 10 ? 'bg-green-100 text-green-800' : 
                              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.stock > 0 ? product.stock : 'Out of stock'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">{filteredProducts.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement; 