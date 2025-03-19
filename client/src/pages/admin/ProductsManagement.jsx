import React, { useState, useEffect } from 'react';
import ProductFilters from '../../components/admin/ProductFilters';
import { filterProducts, resetFilters, getFilterCounts } from '../../data/filterLogic';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import typeService from '../../services/typeService';
import brandService from '../../services/brandService';
import countryService from '../../services/countryService';

/**
 * ProductsManagement component provides a comprehensive interface for managing
 * the product catalog. Features include filtering, sorting, pagination, and bulk actions.
 * Integrates with backend services for real-time data management.
 */
const ProductsManagement = () => {
  // Filter state management
  const [currentFilters, setCurrentFilters] = useState(resetFilters());
  
  // Product and taxonomy data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // Filtered product view
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter counts for UI display
  const [filterCounts, setFilterCounts] = useState(null);
  
  // UI state management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Selection for bulk operations
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Sorting configuration
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  
  // Pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch products and taxonomies using our service files
        const [productsData, categoriesData, brandsData, typesData, countriesData] = await Promise.all([
          productService.getAllProducts(),
          categoryService.getAllCategories(),
          brandService.getAllBrands(),
          typeService.getAllTypes(),
          countryService.getAllCountries()
        ]);
        
        // Set data
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setTypes(typesData);
        setCountries(countriesData);
        
        // Apply initial filtering
        const filtered = filterProducts(productsData, currentFilters);
        setFilteredProducts(filtered);
        
        // Calculate filter counts
        const counts = getFilterCounts(productsData);
        setFilterCounts(counts);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products data. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Update filtered products when filters change or products are loaded
  useEffect(() => {
    if (products.length === 0) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API delay for better UX
    const timeoutId = setTimeout(() => {
      const filtered = filterProducts(currentFilters, products);
      
      // Check for image issues in filtered products
      if (filtered.length > 0) {
        const productsWithoutImages = filtered.filter(p => !p.images || !Array.isArray(p.images) || p.images.length === 0);
      }
      
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
      // Reset to first page when filters or sorting changes
      setCurrentPage(1);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [currentFilters, sortConfig, products]);
  
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
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(product => product.id));
    }
  };
  
  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setIsLoading(true);
      
      try {
        // In a real app, this would call an API to delete the products
        // await axios.post(`${API_URL}/products/bulk-delete`, { ids: selectedProducts });
        
        // For now, just remove them from the local state
        setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
        alert(`${selectedProducts.length} products deleted successfully`);
      } catch (error) {
        console.error('Error deleting products:', error);
        alert('Failed to delete products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Handle add new product
  const handleAddProduct = () => {
    // Navigate to product creation form
    window.location.href = '/admin/products/create';
  };
  
  // Handle product delete
  const handleProductDelete = async (productId) => {
    if (window.confirm(`Are you sure you want to delete this product?`)) {
      setIsLoading(true);
      
      try {
        // Call API to delete the product
        await productService.deleteProduct(productId);
        
        // Remove from the local state
        setProducts(prev => prev.filter(product => 
          product.id !== productId && product._id !== productId
        ));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  // Find related entities helper function
  const findRelatedEntities = (product) => {
    // Debugging
    if (product.name && product.name.includes('Johnnie Walker')) {
      console.log('Debug product:', { 
        id: product.id, 
        _id: product._id,
        categoryIds: product.categoryIds
      });
    }

    const productCategories = [];
    
    // Try to find categories
    if (product.categoryIds && Array.isArray(product.categoryIds)) {
      // Case 1: categoryIds contains category objects directly
      if (product.categoryIds.length > 0 && typeof product.categoryIds[0] === 'object') {
        // Just use the category objects directly
        productCategories.push(...product.categoryIds);
      } 
      // Case 2: categoryIds contains IDs as strings
      else {
        // Find the categories by ID
        product.categoryIds.forEach(categoryId => {
          const category = categories.find(c => 
            c.id === categoryId || 
            c._id === categoryId ||
            (c.id && categoryId && c.id.toString() === categoryId.toString())
          );
          
          if (category) {
            productCategories.push(category);
          }
        });
      }
    }
    
    // Find brand
    let productBrand = null;
    if (product.brandId) {
      // Handle both string ID and object with ID
      const brandId = typeof product.brandId === 'object' ? product.brandId._id || product.brandId.id : product.brandId;
      
      // Try to find brand by ID
      productBrand = brands.find(b => 
        b.id === brandId || 
        b._id === brandId ||
        (b.id && brandId && b.id.toString() === brandId.toString())
      );
    }
    
    return { productCategories, productBrand };
  };
  
  // Add this function at the component level, before the return statement
  const getDefaultProductImage = (product) => {
    // Check if product has categories and extract category slug properly
    let categorySlug = '';
    
    if (product.categoryIds && Array.isArray(product.categoryIds) && product.categoryIds.length > 0) {
      // First try to get the category object if categoryIds contains objects
      let firstCategoryId;
      
      if (typeof product.categoryIds[0] === 'object') {
        firstCategoryId = product.categoryIds[0]._id || product.categoryIds[0].id;
      } else {
        firstCategoryId = product.categoryIds[0];
      }
      
      const firstCategory = categories.find(c => 
        c.id === firstCategoryId || c._id === firstCategoryId
      );
      
      if (firstCategory && firstCategory.slug) {
        categorySlug = firstCategory.slug;
      }
    } else if (product.categoryId) {
      // Try using categoryId if categoryIds is not available
      let categoryId;
      
      if (typeof product.categoryId === 'object') {
        categoryId = product.categoryId._id || product.categoryId.id;
      } else {
        categoryId = product.categoryId;
      }
      
      const category = categories.find(c => 
        c.id === categoryId || c._id === categoryId
      );
      
      if (category && category.slug) {
        categorySlug = category.slug;
      }
    }
    
    // Default image mapping based on category
    const categoryImages = {
      'vodka': 'https://images.unsplash.com/photo-1613063020776-2eccbc3d0f9b?q=80&w=300',
      'whisky': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=300',
      'gin': 'https://images.unsplash.com/photo-1514218953589-2d7d87cf337e?q=80&w=300',
      'rum': 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?q=80&w=300',
      'tequila': 'https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=300',
      'liqueur': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=300'
    };
    
    // Return category-specific image or a generic alcohol image
    return categoryImages[categorySlug] || 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=300';
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
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <ProductFilters 
            allProducts={products}
            allCategories={categories}
            allTypes={types}
            allBrands={brands}
            allCountries={countries}
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
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
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
                        checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
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
                    <tr key="loading-row">
                      <td colSpan="7" className="px-4 py-4 text-center">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2">Loading products...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr key="no-products-row">
                      <td colSpan="7" className="px-4 py-4 text-center">
                        No products found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map(product => {
                      // Find related entities with debug
                      const { productCategories, productBrand } = findRelatedEntities(product);
                      console.log(`Product ${product.name}: Found ${productCategories.length} categories`);
                      
                      // Get default image based on product category
                      const defaultImage = getDefaultProductImage(product);
                      
                      // Get product image with better fallback handling
                      let productImage = null;
                      let productImageAlt = product.name;
                      
                      // Check if product has images array with the expected structure
                      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                        // Try to find primary image or use first image
                        const imageObj = product.images.find(img => img.isPrimary) || product.images[0];
                        
                        // Check if the image object has a url property (as per your database schema)
                        if (imageObj && imageObj.url) {
                          productImage = imageObj.url;
                          if (imageObj.alt) {
                            productImageAlt = imageObj.alt;
                          }
                        } 
                        // If it's just a string
                        else if (typeof imageObj === 'string') {
                          productImage = imageObj;
                        }
                        // If it's some other object structure
                        else if (imageObj) {
                          productImage = imageObj.url || imageObj.src || imageObj.path || null;
                        }
                      }
                      
                      // For debugging
                      if (!productImage) {
                        // No default fallback is used
                      }
                   
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
                              {/* Display product image with category-based fallback */}
                              <img 
                                src={productImage || defaultImage}
                                alt={productImageAlt} 
                                className="h-12 w-12 object-cover mr-3 rounded"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = defaultImage;
                                }}
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            ${product.price.toFixed(2)}
                            {product.salePrice > 0 && (
                              <div className="text-xs text-red-600">
                                Sale: ${product.salePrice.toFixed(2)}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {productCategories.length === 0 ? (
                                <span className="text-gray-400">No categories</span>
                              ) : (
                                productCategories.map(category => (
                                  <span 
                                    key={category.id} 
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {category.name}
                                  </span>
                                ))
                              )}
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
                            <div className="flex items-center space-x-2">
                              <a
                                href={`/admin/products/${product.id || product._id}/edit`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </a>
                              <button
                                type="button"
                                onClick={() => handleProductDelete(product.id || product._id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
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
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredProducts.length)}
                      </span> of{' '}
                      <span className="font-medium">{filteredProducts.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${
                          currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {/* Page numbers */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // Show first page, last page, and pages around current page
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={`page-${pageNumber}`}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border ${
                                currentPage === pageNumber
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                        
                        // Show ellipsis for skipped pages
                        if (
                          (pageNumber === 2 && currentPage > 3) ||
                          (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return (
                            <span
                              key={`ellipsis-${pageNumber}`}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        
                        return null;
                      })}
                      
                      <button 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${
                          currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
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