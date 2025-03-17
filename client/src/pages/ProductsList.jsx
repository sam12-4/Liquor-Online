import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaFilter, FaSort, FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import ProductService from "../services/ProductService";

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    document.title = "All Products | Liquor Online Store";
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Use ProductService to get products
        const allProducts = await ProductService.getAllProducts();
        setProducts(allProducts);
        
        // Initial filtering based on URL params
        const category = searchParams.get("category") || "all";
        const premium = searchParams.get("premium") === "true";
        
        let filtered = [...allProducts];
        
        if (category !== "all") {
          filtered = filtered.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        if (premium) {
          filtered = filtered.filter(product => product.premium);
        }
        
        setFilteredProducts(filtered);
        setCategoryFilter(category);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-20":
          filtered = filtered.filter(product => product.price < 20);
          break;
        case "20-50":
          filtered = filtered.filter(product => product.price >= 20 && product.price <= 50);
          break;
        case "50-100":
          filtered = filtered.filter(product => product.price > 50 && product.price <= 100);
          break;
        case "over-100":
          filtered = filtered.filter(product => product.price > 100);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, categoryFilter, priceFilter, sortOption]);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  // Generate a list of all unique categories
  const categories = products.length > 0 
    ? ["all", ...new Set(products.map(product => product.category))]
    : ["all"];

  return (
    <div className="bg-[#f9f9f7] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Link to="/" className="hover:text-[#aa4c40]">Home</Link>
            <span className="mx-2">/</span>
            <span>Products</span>
          </div>
        </div>
        
        {/* Filters and sorting */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <button 
            className="flex items-center mb-4 md:mb-0 bg-white px-4 py-2 rounded shadow-sm hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="mr-2" />
            <span>Filter</span>
          </button>
          
          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-700" />
            <select 
              className="border-none bg-white px-4 py-2 rounded shadow-sm focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        
        {/* Filter panel - toggles visibility */}
        {isFilterOpen && (
          <div className="bg-white p-6 mb-6 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`category-${category}`} 
                        name="category" 
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`} className="capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Price</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="price-all" 
                      name="price" 
                      checked={priceFilter === "all"}
                      onChange={() => setPriceFilter("all")}
                      className="mr-2"
                    />
                    <label htmlFor="price-all">All Prices</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="price-under-20" 
                      name="price" 
                      checked={priceFilter === "under-20"}
                      onChange={() => setPriceFilter("under-20")}
                      className="mr-2"
                    />
                    <label htmlFor="price-under-20">Under $20</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="price-20-50" 
                      name="price" 
                      checked={priceFilter === "20-50"}
                      onChange={() => setPriceFilter("20-50")}
                      className="mr-2"
                    />
                    <label htmlFor="price-20-50">$20 - $50</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="price-50-100" 
                      name="price" 
                      checked={priceFilter === "50-100"}
                      onChange={() => setPriceFilter("50-100")}
                      className="mr-2"
                    />
                    <label htmlFor="price-50-100">$50 - $100</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="price-over-100" 
                      name="price" 
                      checked={priceFilter === "over-100"}
                      onChange={() => setPriceFilter("over-100")}
                      className="mr-2"
                    />
                    <label htmlFor="price-over-100">Over $100</label>
                  </div>
                </div>
              </div>
              
              {/* Additional filters can be added here */}
            </div>
          </div>
        )}
        
        {/* Product grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-t-[#aa4c40] border-gray-200 rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Link to={`/products/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  
                  {/* Product badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">New</span>
                    )}
                    {product.featured && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Featured</span>
                    )}
                    {product.premium && (
                      <span className="bg-[#aa4c40] text-white text-xs px-2 py-1 rounded">Premium</span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {product.discount}% Off
                      </span>
                    )}
                  </div>
                  
                  {/* Wishlist button */}
                  <button 
                    className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart className="text-[#aa4c40]" />
                    ) : (
                      <FaRegHeart className="text-gray-600 hover:text-[#aa4c40]" />
                    )}
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="mb-2 text-sm font-medium hover:text-[#aa4c40]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex justify-between items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500">{product.volume}ml</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-base font-medium text-[#aa4c40]">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm line-through text-gray-500">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-medium text-[#aa4c40]">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      className="bg-[#aa4c40] text-white p-2 rounded-full hover:bg-[#8a3d33]"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded shadow text-center">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
            <button 
              className="bg-[#aa4c40] text-white px-4 py-2 rounded hover:bg-[#8a3d33]"
              onClick={() => {
                setCategoryFilter("all");
                setPriceFilter("all");
                setSortOption("featured");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList; 