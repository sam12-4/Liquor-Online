import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { ProductGrid, Pagination } from '../components/ui'
import { formatPrice } from '../utils/formatters'

const ProductsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { category, tag, brand } = useParams()
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [pageTitle, setPageTitle] = useState('Shop')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('default');
  const productsPerPage = 9
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    type: null,
    brand: null
  })

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search)
  const subcategory = queryParams.get('za') || queryParams.get('a-zzz')

  // Debug information
  console.log('ProductsPage rendered with:', {
    pathname: location.pathname,
    search: location.search,
    category,
    tag,
    brand,
    subcategory
  });

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };



  const sortProducts = (products) => {
    switch (sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'popularity':
        // Assuming you have a popularity metric
        return products.sort((a, b) => b.popularity - a.popularity);
      case 'latest':
        // Assuming you have a date or timestamp
        return products.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return products; // Default sorting logic
    }
  };

  // Category structure with types
  const categoryStructure = {
    wine: {
      name: 'Wine',
      count: 230,
      types: [
        { id: 'red', name: 'Red', count: 105 },
        { id: 'white', name: 'White', count: 67 },
        { id: 'rose', name: 'Rose', count: 19 },
        { id: 'sparkling', name: 'Sparkling', count: 11 },
        { id: 'blush', name: 'Blush', count: 7 },
        { id: 'sake', name: 'Sake', count: 1 }
      ]
    },
    spirits: {
      name: 'Spirits',
      count: 167,
      types: [
        { id: 'whisky', name: 'Whisky', count: 42 },
        { id: 'vodka', name: 'Vodka', count: 35 },
        { id: 'tequila', name: 'Tequila', count: 28 },
        { id: 'gin', name: 'Gin', count: 22 },
        { id: 'rum', name: 'Rum', count: 15 },
        { id: 'cognac', name: 'Cognac', count: 8 }
      ]
    },
    beer: {
      name: 'Beer',
      count: 297,
      types: [
        { id: 'domestic', name: 'Domestic', count: 150 },
        { id: 'imported', name: 'Imported', count: 147 }
      ]
    },
    cider: {
      name: 'Cider',
      count: 10,
      types: []
    },
    cooler: {
      name: 'Cooler',
      count: 24,
      types: []
    }
  }

  // Brands data
  const brandsData = [
    { id: '1800-milenio', name: '1800 MILENIO', count: 1, categories: ['spirits'] },
    { id: '1884-estate-grown', name: '1884 ESTATE GROWN', count: 1, categories: ['wine'] },
    { id: '19-crimes', name: '19 CRIMES', count: 3, categories: ['wine'] },
    { id: '20-bees', name: '20 BEES', count: 1, categories: ['wine'] },
    { id: '818-tequila', name: '818 TEQUILA', count: 2, categories: ['spirits'] }
  ]

  // Mock products - in a real app, you would fetch these based on the URL params
  const products = [
    {
      id: 1,
      name: '818 TEQUILA BLANCO 750 ML',
      price: 75.00,
      image: 'https://web-assets.same.dev/1985471812/3013702058.jpeg',
      category: 'spirits',
      type: 'tequila',
      brand: '818-tequila',
      isHot: true,
    },
    {
      id: 2,
      name: '1884 ESTATE GROWN SYRAH 750 ML',
      price: 16.70,
      image: 'https://web-assets.same.dev/3676876019/561983296.jpeg',
      category: 'wine',
      type: 'red',
      brand: '1884-estate-grown',
      isHot: true,
    },
    {
      id: 3,
      name: '19 CRIMES PINOT NOIR',
      price: 19.35,
      image: 'https://web-assets.same.dev/282457355/677014880.jpeg',
      category: 'wine',
      type: 'red',
      brand: '19-crimes',
      isHot: true,
    },
    {
      id: 4,
      name: '20 BEES JUICY WHITE',
      price: 10.45,
      image: 'https://web-assets.same.dev/2607398782/3925610433.jpeg',
      category: 'wine',
      type: 'white',
      brand: '20-bees',
      isHot: true,
    },
    {
      id: 5,
      name: 'A PURPUS ROSE VODKA SODA',
      price: 15.60,
      image: 'https://web-assets.same.dev/1330601140/485806587.jpeg',
      category: 'cider',
      type: null,
      brand: null,
      isHot: true,
    },
    {
      id: 6,
      name: 'A PURPUS STRAWBERRY VODKA SODA',
      price: 15.60,
      image: 'https://web-assets.same.dev/856443968/2373395576.jpeg',
      category: 'spirits',
      type: 'vodka',
      brand: null,
      isHot: true,
    },
    {
      id: 7,
      name: 'ABSOLUT ELYX - SINGLE ESTATE HANDCRAFTED VODKA',
      price: 97.00,
      image: 'https://web-assets.same.dev/3237504018/683900238.jpeg',
      category: 'spirits',
      type: 'vodka',
      brand: null,
      isHot: true,
    },
    {
      id: 8,
      name: '818 TEQUILA REPOSADO 750 ML',
      price: 85.00,
      image: 'https://web-assets.same.dev/1214273369/2625015867.jpeg',
      category: 'spirits',
      type: 'tequila',
      brand: '818-tequila',
      isHot: true,
    },
    {
      id: 9,
      name: 'CORONA EXTRA',
      price: 12.99,
      image: 'https://web-assets.same.dev/2434705900/2183896642.jpeg',
      category: 'beer',
      type: 'imported',
      brand: null,
      isHot: false,
    },
    {
      id: 10,
      name: 'MOLSON CANADIAN',
      price: 11.99,
      image: 'https://web-assets.same.dev/2434705900/2183896642.jpeg',
      category: 'beer',
      type: 'domestic',
      brand: null,
      isHot: false,
    },
  ]

  // Handle category click - this ensures proper navigation
  const handleCategoryClick = (categoryId, subcat = null) => {
    // Create a new categories array based on current selection
    let newCategories = [...selectedFilters.categories];
    const index = newCategories.indexOf(categoryId);

    if (index === -1) {
      // Add category if not already selected
      newCategories.push(categoryId);
    } else {
      // Remove category if already selected
      newCategories.splice(index, 1);
    }

    // Preserve existing type and brand when changing categories
    const newType = subcat || selectedFilters.type;
    const newBrand = selectedFilters.brand;

    // Update selected filters
    setSelectedFilters({
      categories: newCategories,
      type: newType,
      brand: newBrand
    });

    // Reset to first page when changing filters
    setCurrentPage(1);

    // Build the navigation path
    let path;
    if (newCategories.length === 1) {
      path = `/product-category/${newCategories[0]}`;
    } else if (newCategories.length > 1) {
      // For multiple categories, use query parameters
      const params = new URLSearchParams();
      params.set('categories', newCategories.join(','));
      path = `/shop?${params.toString()}`;
    } else {
      path = '/shop';
    }

    // Add subcategory if present
    if (subcat) {
      const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
      params.set('za', subcat);
      path = path.includes('?')
        ? `${path.split('?')[0]}?${params.toString()}`
        : `${path}?${params.toString()}`;
    }

    // Add brand if present
    if (newBrand) {
      const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
      params.set('brand', newBrand);
      path = path.includes('?')
        ? `${path.split('?')[0]}?${params.toString()}`
        : `${path}?${params.toString()}`;
    }

    console.log('Navigating to:', path);
    navigate(path);
  };

  // Handle type click
  const handleTypeClick = (typeId) => {
    // Toggle type selection
    const newType = selectedFilters.type === typeId ? null : typeId;

    // Preserve existing categories and brand
    setSelectedFilters(prev => ({
      ...prev,
      type: newType
    }));

    // Reset to first page when changing filters
    setCurrentPage(1);

    // Build the navigation path
    let path;
    if (selectedFilters.categories.length === 1) {
      path = `/product-category/${selectedFilters.categories[0]}`;
    } else if (selectedFilters.categories.length > 1) {
      const params = new URLSearchParams();
      params.set('categories', selectedFilters.categories.join(','));
      path = `/shop?${params.toString()}`;
    } else {
      path = '/shop';
    }

    // Add type if present
    if (newType) {
      const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
      params.set('za', newType);
      path = path.includes('?')
        ? `${path.split('?')[0]}?${params.toString()}`
        : `${path}?${params.toString()}`;
    }

    // Add brand if present
    if (selectedFilters.brand) {
      const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
      params.set('brand', selectedFilters.brand);
      path = path.includes('?')
        ? `${path.split('?')[0]}?${params.toString()}`
        : `${path}?${params.toString()}`;
    }

    console.log('Navigating to:', path);
    navigate(path);
  };

  // Handle brand click
  const handleBrandClick = (brandId) => {
    // Toggle brand selection
    const newBrand = selectedFilters.brand === brandId ? null : brandId;

    // Preserve existing categories and type
    setSelectedFilters(prev => ({
      ...prev,
      brand: newBrand
    }));

    // Reset to first page when changing filters
    setCurrentPage(1);

    // Build the navigation path
    let path;
    if (newBrand) {
      path = `/brand/${newBrand}`;

      // Add categories as query params if present
      if (selectedFilters.categories.length > 0) {
        const params = new URLSearchParams();
        params.set('categories', selectedFilters.categories.join(','));
        path = `${path}?${params.toString()}`;
      }

      // Add type if present
      if (selectedFilters.type) {
        const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
        params.set('za', selectedFilters.type);
        path = path.includes('?')
          ? `${path.split('?')[0]}?${params.toString()}`
          : `${path}?${params.toString()}`;
      }
    } else {
      // If no brand selected, go back to category or shop
      if (selectedFilters.categories.length === 1) {
        path = `/product-category/${selectedFilters.categories[0]}`;
      } else if (selectedFilters.categories.length > 1) {
        const params = new URLSearchParams();
        params.set('categories', selectedFilters.categories.join(','));
        path = `/shop?${params.toString()}`;
      } else {
        path = '/shop';
      }

      // Add type if present
      if (selectedFilters.type) {
        const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
        params.set('za', selectedFilters.type);
        path = path.includes('?')
          ? `${path.split('?')[0]}?${params.toString()}`
          : `${path}?${params.toString()}`;
      }
    }

    console.log('Navigating to brand:', path);
    navigate(path);
  };

  // Get accurate count of products for each category based on current filters
  const getCategoryCount = (categoryId) => {
    return products.filter(product =>
      product.category === categoryId &&
      (!selectedFilters.brand || product.brand === selectedFilters.brand) &&
      (!selectedFilters.type || product.type === selectedFilters.type)
    ).length;
  };

  // Get accurate count of products for each type based on current filters
  const getTypeCount = (typeId) => {
    return products.filter(product =>
      (selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.category)) &&
      product.type === typeId &&
      (!selectedFilters.brand || product.brand === selectedFilters.brand)
    ).length;
  };

  // Get accurate count of products for each brand based on current filters
  const getBrandCount = (brandId) => {
    return products.filter(product =>
      (selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.category)) &&
      (!selectedFilters.type || product.type === selectedFilters.type) &&
      product.brand === brandId
    ).length;
  };

  // Get relevant types for the selected categories
  const getRelevantTypes = () => {
    // If no categories selected, get all types from all categories
    if (selectedFilters.categories.length === 0) {
      const allTypes = [];
      Object.values(categoryStructure).forEach(category => {
        if (category.types) {
          category.types.forEach(type => {
            if (!allTypes.some(t => t.id === type.id) && getTypeCount(type.id) > 0) {
              allTypes.push({ ...type, count: getTypeCount(type.id) });
            }
          });
        }
      });
      return allTypes;
    }

    // Get types for selected categories
    const types = [];
    selectedFilters.categories.forEach(categoryId => {
      if (categoryStructure[categoryId] && categoryStructure[categoryId].types) {
        categoryStructure[categoryId].types.forEach(type => {
          if (!types.some(t => t.id === type.id)) {
            const count = getTypeCount(type.id);
            if (count > 0) {
              types.push({ ...type, count });
            }
          }
        });
      }
    });
    return types;
  };

  // Get relevant brands for the current filters
  const getRelevantBrands = () => {
    // Filter brands based on selected categories and type
    return brandsData.filter(brand => {
      // If no categories selected, check if brand has products with current type filter
      if (selectedFilters.categories.length === 0) {
        const count = getBrandCount(brand.id);
        return count > 0;
      }

      // Check if brand has products in selected categories with current type filter
      const hasProductsInSelectedCategories = brand.categories.some(cat =>
        selectedFilters.categories.includes(cat)
      );

      if (hasProductsInSelectedCategories) {
        const count = getBrandCount(brand.id);
        return count > 0;
      }

      return false;
    }).map(brand => ({
      ...brand,
      count: getBrandCount(brand.id)
    }));
  };

  // Update selected filters based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Parse categories
    const categoriesParam = params.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',') : [];

    // Parse type
    const type = params.get('za') || params.get('a-zzz') || params.get('type') || null;

    // Parse brand
    const brandParam = params.get('brand') || null;

    // Update filters based on URL params
    setSelectedFilters({
      categories: category ? [category] : categories,
      type: subcategory || type,
      brand: brand || brandParam
    });

    // Reset to first page when URL changes
    setCurrentPage(1);
  }, [location.search, category, subcategory, brand]);

  // Component mount/unmount tracking
  useEffect(() => {
    console.log('ProductsPage mounted');

    return () => {
      console.log('ProductsPage unmounted');
      // Clear any state or timeouts when component unmounts
      setFilteredProducts([]);
      setIsLoading(false);
    };
  }, []);

  // Filter products based on URL parameters
  useEffect(() => {
    console.log('Filter effect running with:', {
      selectedFilters,
      category,
      subcategory,
      tag,
      brand
    });

    // Set loading state
    setIsLoading(true);
    setFilteredProducts([]); // Clear products while loading

    // Simulate API call delay - using a cleanup function to handle component unmounting
    const timeoutId = setTimeout(() => {
      // Check if component is still mounted before updating state
      // This helps prevent memory leaks and state updates on unmounted components
      let filtered = [...products]
      let title = 'Shop'

      // Apply category filter
      if (selectedFilters.categories.length > 0) {
        filtered = filtered.filter(product =>
          selectedFilters.categories.includes(product.category)
        );

        if (selectedFilters.categories.length === 1) {
          const categoryId = selectedFilters.categories[0];
          title = categoryStructure[categoryId]?.name || categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        } else {
          title = 'Shop';
        }
      }

      // Apply type filter
      if (selectedFilters.type) {
        filtered = filtered.filter(product =>
          product.type && product.type.toLowerCase() === selectedFilters.type.toLowerCase()
        );

        // Find the type name for the title
        if (selectedFilters.categories.length === 1) {
          const categoryId = selectedFilters.categories[0];
          if (categoryStructure[categoryId]) {
            const typeObj = categoryStructure[categoryId].types.find(t => t.id === selectedFilters.type);
            if (typeObj) {
              title = `${title} - ${typeObj.name}`;
            }
          }
        } else {
          title = selectedFilters.type.charAt(0).toUpperCase() + selectedFilters.type.slice(1);
        }
      }

      // Filter by tag if provided
      if (tag) {
        // In a real app, you would filter by tags here
        title = `Tag: ${tag}`;
      }

      // Filter by brand if provided
      if (selectedFilters.brand) {
        filtered = filtered.filter(product =>
          product.brand === selectedFilters.brand
        );

        // Find the brand name for the title
        const brandObj = brandsData.find(b => b.id === selectedFilters.brand);
        if (brandObj) {
          if (selectedFilters.categories.length > 0 || selectedFilters.type) {
            title = `${title} - ${brandObj.name}`;
          } else {
            title = `Brand: ${brandObj.name}`;
          }
        }
      }

      console.log('Filtered products:', filtered.length);
      setFilteredProducts(filtered);
      setPageTitle(title);
      setIsLoading(false); // Ensure loading state is turned off
    }, 500);

    // Cleanup function to clear timeout if component unmounts
    return () => {
      console.log('Filter effect cleanup');
      clearTimeout(timeoutId);
      setIsLoading(false); // Ensure loading state is turned off when unmounting
    };
  }, [selectedFilters, category, subcategory, tag, brand, location.pathname]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const sortedProducts = sortProducts([...filteredProducts]);
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-8">
      <div className="container-fluid">
        {/* Debug Info - Only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-100 p-4 mb-4 rounded">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p><strong>Selected Categories:</strong> {selectedFilters.categories.join(', ') || 'none'}</p>
            <p><strong>Selected Type:</strong> {selectedFilters.type || 'none'}</p>
            <p><strong>Selected Brand:</strong> {selectedFilters.brand || 'none'}</p>
            <p><strong>URL Category:</strong> {category || 'none'}</p>
            <p><strong>URL Type:</strong> {subcategory || 'none'}</p>
            <p><strong>URL Tag:</strong> {tag || 'none'}</p>
            <p><strong>URL Brand:</strong> {brand || 'none'}</p>
            <p><strong>Products found:</strong> {filteredProducts.length}</p>
            <p><strong>Current Page:</strong> {currentPage} of {totalPages}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Test Direct Navigation:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <button
                  onClick={() => handleCategoryClick('spirits')}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                >
                  Spirits
                </button>
                <button
                  onClick={() => handleCategoryClick('wine')}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                >
                  Wine
                </button>
                <button
                  onClick={() => handleCategoryClick('spirits', 'tequila')}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                >
                  Tequila
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shop Banner */}
        <div className="h-48 bg-darkBg mb-8 flex items-center justify-center">
          <h1 className="text-white text-4xl font-serif">{pageTitle}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            {/* Clear Filters Button - Only show if filters are active */}
            {(selectedFilters.categories.length > 0 || selectedFilters.type || selectedFilters.brand) && (
              <div className="mb-6">
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Search...</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                {Object.entries(categoryStructure).map(([categoryId, categoryData]) => {
                  const count = getCategoryCount(categoryId);
                  if (count === 0 && selectedFilters.brand) return null;

                  return (
                    <li key={categoryId} className="flex items-center">
                      <input
                        type="checkbox"
                        id={categoryId}
                        className="mr-2"
                        checked={selectedFilters.categories.includes(categoryId)}
                        onChange={() => handleCategoryClick(categoryId)}
                      />
                      <label
                        htmlFor={categoryId}
                        className="cursor-pointer"
                      >
                        {categoryData.name.toUpperCase()} ({count})
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Type filters - Show relevant types based on selected categories or all types if no category selected */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 flex justify-between items-center">
                <span>Type</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <ul className="space-y-2">
                {getRelevantTypes().map(type => (
                  <li key={type.id}>
                    <button
                      onClick={() => handleTypeClick(type.id)}
                      className={`hover:text-primary ${selectedFilters.type === type.id ? 'text-primary font-bold' : ''}`}
                    >
                      {type.name.toUpperCase()} ({type.count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands section - Show relevant brands based on selected categories and type */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 flex justify-between items-center">
                <span>Brands</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <ul className="space-y-2">
                {getRelevantBrands().map(brandItem => (
                  <li key={brandItem.id}>
                    <button
                      onClick={() => handleBrandClick(brandItem.id)}
                      className={`hover:text-primary ${selectedFilters.brand === brandItem.id ? 'text-primary font-bold' : ''}`}
                    >
                      {brandItem.name} ({brandItem.count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Products */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} item(s)
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="default">Default Sorting</option>
                    <option value="price-asc">Sort by price: low to high</option>
                    <option value="price-desc">Sort by price: high to low</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="latest">Sort by latest</option>
                  </select>
                </div>
                {/* <div className="flex space-x-2">
                  <button
                    className={`p-1 border ${viewMode === 'grid' ? 'border-primary text-primary' : 'border-gray-300'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    className={`p-1 border ${viewMode === 'list' ? 'border-primary text-primary' : 'border-gray-300'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div> */}
                <div className="flex space-x-2">
                  <button
                    className={`p-1 border ${viewMode === 'grid' ? 'border-primary text-primary' : 'border-gray-300'}`}
                    onClick={toggleViewMode}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    className={`p-1 border ${viewMode === 'list' ? 'border-primary text-primary' : 'border-gray-300'}`}
                    onClick={toggleViewMode}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State - Only show when loading is true */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
                <p>Loading products...</p>
              </div>
            )}

            {/* No Products Message - Only show when not loading and no products found */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  No products match the selected filters. Try changing your filter criteria or browse all products.
                </p>
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Product Grid - Only show when not loading and products exist */}
            {!isLoading && (
              <ProductGrid 
                products={currentProducts} 
                isLoading={isLoading} 
                viewMode={viewMode} 
              />
            )}

            {/* Product List - Only show when not loading and products exist */}
            {/* {!isLoading && viewMode === 'list' && filteredProducts.length > 0 && (
              <div className="space-y-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex product-card">
                    <div className="w-1/3 relative">
                      {product.isHot && <span className="hot-badge">Hot</span>}
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-contain p-4"
                        />
                      </Link>
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-center">
                      <h3 className="font-medium mb-2 hover:text-primary">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <div className="text-lg font-bold text-primary mb-2">${product.price.toFixed(2)}</div>
                      <div className="mb-4 text-sm text-muted-foreground">
                        Category: {categoryStructure[product.category]?.name || product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        {product.type && ` > ${product.type.charAt(0).toUpperCase() + product.type.slice(1)}`}
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-primary py-1 px-3 text-sm">Add to cart</button>
                        <button className="btn-outline py-1 px-3 text-sm">Quick view</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )} */}

            {/* Pagination - Only show when not loading and products exist */}
            {!isLoading && filteredProducts.length > productsPerPage && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={paginate} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage