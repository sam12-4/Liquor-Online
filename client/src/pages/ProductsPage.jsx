import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FaFilter, FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext.jsx';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart(); // Use the CartContext
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get query parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = parseInt(searchParams.get('perPage')) || 12;
    
    if (category) setSelectedCategories([category]);
    if (brand) setSelectedBrands([brand]);
    if (search) setSearchTerm(search);
    if (sort) setSortOption(sort);
    if (page) setCurrentPage(page);
    if (perPage) setProductsPerPage(perPage);
  }, [searchParams]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll get data from localStorage or use sample data
        let storedProducts = localStorage.getItem('products');
        
        if (storedProducts) {
          storedProducts = JSON.parse(storedProducts);
        } else {
          // Sample products if none in localStorage
          storedProducts = [
    {
      id: 1,
              name: 'Johnnie Walker Blue Label',
              category: 'Whisky',
              brand: 'Johnnie Walker',
              price: 180.99,
              salePrice: 170.99,
              image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 15,
              rating: 4.8,
              description: 'Premium blended Scotch whisky with a remarkably smooth flavor.',
              featured: true
    },
    {
      id: 2,
              name: 'Grey Goose Vodka',
              category: 'Vodka',
              brand: 'Grey Goose',
              price: 45.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1613063070402-86acc8a55e0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 28,
              rating: 4.5,
              description: 'Premium French vodka made from the finest ingredients.',
              featured: true
    },
    {
      id: 3,
              name: 'Hendrick\'s Gin',
              category: 'Gin',
              brand: 'Hendrick\'s',
              price: 39.99,
              salePrice: 34.99,
              image: 'https://images.unsplash.com/photo-1571577571750-0f2293980b63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80',
              inStock: 20,
              rating: 4.7,
              description: 'Scottish gin distilled with rose and cucumber for a distinctive flavor.',
              featured: false
    },
    {
      id: 4,
              name: 'Don Julio 1942 Tequila',
              category: 'Tequila',
              brand: 'Don Julio',
              price: 149.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1649197002381-9badf65d25ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
              inStock: 10,
              rating: 4.9,
              description: 'Luxury añejo tequila aged for a minimum of two and a half years.',
              featured: true
    },
    {
      id: 5,
              name: 'Bacardi Superior Rum',
              category: 'Rum',
              brand: 'Bacardi',
              price: 19.99,
              salePrice: 17.99,
              image: 'https://images.unsplash.com/photo-1598018553943-93e905b47a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 35,
              rating: 4.2,
              description: 'Classic white rum, perfect for cocktails and mixed drinks.',
              featured: false
    },
    {
      id: 6,
              name: 'Jack Daniel\'s Tennessee Whiskey',
              category: 'Whisky',
              brand: 'Jack Daniel\'s',
              price: 29.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1609954848895-15999ec5da9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 42,
              rating: 4.4,
              description: 'Iconic American whiskey with a smooth, mellow character.',
              featured: true
    },
    {
      id: 7,
              name: 'Patrón Silver Tequila',
              category: 'Tequila',
              brand: 'Patrón',
              price: 49.99,
              salePrice: 44.99,
              image: 'https://images.unsplash.com/photo-1656149481619-602f99984ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 18,
              rating: 4.6,
              description: 'Ultra-premium tequila, perfect for sipping or in cocktails.',
              featured: false
    },
    {
      id: 8,
              name: 'Absolut Vodka',
              category: 'Vodka',
              brand: 'Absolut',
              price: 24.99,
              salePrice: 21.99,
              image: 'https://images.unsplash.com/photo-1652542124945-bb20277153a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 30,
              rating: 4.3,
              description: 'Swedish vodka made from winter wheat, known for its clarity and purity.',
              featured: true
    },
    {
      id: 9,
              name: 'Bombay Sapphire Gin',
              category: 'Gin',
              brand: 'Bombay Sapphire',
              price: 32.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1659781894478-cad99e6a869e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 25,
              rating: 4.4,
              description: 'London dry gin infused with 10 exotic botanicals.',
              featured: false
    },
    {
      id: 10,
              name: 'The Macallan 12 Year',
              category: 'Whisky',
              brand: 'The Macallan',
              price: 75.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1659781894478-cad99e6a869e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 15,
              rating: 4.8,
              description: 'Luxurious single malt Scotch whisky aged in sherry oak casks.',
              featured: true
            },
            {
              id: 11,
              name: 'Maker\'s Mark Bourbon',
              category: 'Whisky',
              brand: 'Maker\'s Mark',
              price: 34.99,
              salePrice: 29.99,
              image: 'https://images.unsplash.com/photo-1651818749233-d9126c84e480?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 22,
              rating: 4.5,
              description: 'Handcrafted bourbon whisky with a smooth, rich flavor profile.',
              featured: false
            },
            {
              id: 12,
              name: 'Hennessy XO Cognac',
              category: 'Cognac',
              brand: 'Hennessy',
              price: 199.99,
              salePrice: 189.99,
              image: 'https://images.unsplash.com/photo-1602166242272-3033495b183d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 8,
              rating: 4.9,
              description: 'Exceptionally rich and complex cognac blend aged up to 30 years.',
              featured: true
            },
            {
              id: 13,
              name: 'Moët & Chandon Champagne',
              category: 'Champagne',
              brand: 'Moët & Chandon',
              price: 59.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 20,
              rating: 4.7,
              description: 'Iconic champagne with an elegant maturity and complex flavor profile.',
              featured: true
            },
            {
              id: 14,
              name: 'Baileys Irish Cream',
              category: 'Liqueur',
              brand: 'Baileys',
              price: 23.99,
              salePrice: 21.99,
              image: 'https://images.unsplash.com/photo-1608680291971-324f67a2acee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              inStock: 30,
              rating: 4.6,
              description: 'Smooth and creamy Irish whiskey-based liqueur.',
              featured: false
            },
            {
              id: 15,
              name: 'Tanqueray Gin',
              category: 'Gin',
              brand: 'Tanqueray',
              price: 27.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1621873495884-845a939ministeriodefomento@kbqpd1wre/uploads/2023/04/tanqueray-gin.webp',
              inStock: 25,
              rating: 4.5,
              description: 'Premium London dry gin with a distinctive citrus character.',
              featured: false
            },
            {
              id: 16,
              name: 'Woodford Reserve Bourbon',
              category: 'Whisky',
              brand: 'Woodford Reserve',
              price: 42.99,
              salePrice: 39.99,
              image: 'https://images.unsplash.com/photo-1609954848895-15999ec5da9e',
              inStock: 18,
              rating: 4.7,
              description: 'Small-batch premium bourbon with rich flavor and smooth finish.',
              featured: false
            },
            {
              id: 17,
              name: 'Bourbon Whiskey Reserve',
              category: 'Whisky',
              brand: 'Kentucky Gold',
              price: 59.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 22,
              rating: 4.7,
              description: 'Smooth Kentucky bourbon with notes of vanilla and caramel.',
              featured: true
            },
            {
              id: 18,
              name: 'Rosé Champagne',
              category: 'Champagne',
              brand: 'Moët & Chandon',
              price: 89.99,
              salePrice: 79.99,
              image: 'https://images.unsplash.com/photo-1592483648228-b35146a4344f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 12,
              rating: 4.8,
              description: 'Elegant rosé champagne with berry notes and a crisp finish.',
              featured: true
            },
            {
              id: 19,
              name: 'Spiced Rum',
              category: 'Rum',
              brand: 'Captain\'s Reserve',
              price: 27.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1598378028718-37a61e030860?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 30,
              rating: 4.3,
              description: 'Rich spiced rum with notes of vanilla, cinnamon, and clove.',
              featured: false
            },
            {
              id: 20,
              name: 'Chardonnay',
              category: 'Wine',
              brand: 'Napa Valley',
              price: 24.99,
              salePrice: 21.99,
              image: 'https://images.unsplash.com/photo-1600147132901-e4b851371fbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 24,
              rating: 4.4,
              description: 'Buttery Chardonnay with hints of oak and tropical fruits.',
              featured: false
            },
            {
              id: 21,
              name: 'Blanco Tequila',
              category: 'Tequila',
              brand: 'Casa Azul',
              price: 36.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1592196309033-d1cbe02dd6a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 18,
              rating: 4.5,
              description: 'Smooth, unaged tequila with bright citrus and agave notes.',
              featured: false
            },
            {
              id: 22,
              name: 'Honey Mead',
              category: 'Spirits',
              brand: 'Medieval Meadery',
              price: 19.99,
              salePrice: 17.99,
              image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 15,
              rating: 4.2,
              description: 'Traditional honey mead with a smooth, sweet finish.',
              featured: false
            },
            {
              id: 23,
              name: 'Porter Craft Beer',
              category: 'Beer',
              brand: 'Northwood Brewing',
              price: 14.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 36,
              rating: 4.3,
              description: 'Rich porter with notes of chocolate and coffee.',
              featured: false
            },
            {
              id: 24,
              name: 'Speyside Single Malt',
              category: 'Whisky',
              brand: 'Highland Reserve',
              price: 79.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1593941074084-d01cec4bf9bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 10,
              rating: 4.9,
              description: 'Aged 18 years in oak barrels with hints of honey and fruit.',
              featured: true
            },
            {
              id: 25,
              name: 'Orange Liqueur',
              category: 'Liqueur',
              brand: 'Citrus Gold',
              price: 29.99,
              salePrice: 25.99,
              image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 20,
              rating: 4.3,
              description: 'Sweet orange liqueur, perfect for cocktails or on its own.',
              featured: false
            },
            {
              id: 26,
              name: 'Italian Amaretto',
              category: 'Liqueur',
              brand: 'Sweet Almond',
              price: 32.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1514362453255-4cd6d2fb6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 18,
              rating: 4.4,
              description: 'Sweet almond liqueur with hints of vanilla and spice.',
              featured: false
            },
            {
              id: 27,
              name: 'Silver Tequila',
              category: 'Tequila',
              brand: 'Aztec Silver',
              price: 42.99,
              salePrice: 38.99,
              image: 'https://images.unsplash.com/photo-1665704774182-7843c58329e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 25,
              rating: 4.6,
              description: 'Clear, unaged tequila with a clean, crisp flavor profile.',
              featured: false
            },
            {
              id: 28,
              name: 'VSOP Cognac',
              category: 'Cognac',
              brand: 'French Reserve',
              price: 69.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1519740588644-c614d83f4e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 12,
              rating: 4.7,
              description: 'Smooth, aged cognac with notes of oak and dried fruit.',
              featured: true
            },
            {
              id: 29,
              name: 'Wheat Beer',
              category: 'Beer',
              brand: 'Bavarian Brew',
              price: 12.99,
              salePrice: 10.99,
              image: 'https://images.unsplash.com/photo-1574019607531-b86729908cb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 40,
              rating: 4.2,
              description: 'Cloudy wheat beer with citrus and clove notes.',
              featured: false
            },
            {
              id: 30,
              name: 'Rye Whiskey',
              category: 'Whisky',
              brand: 'Kentucky Gold',
              price: 48.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1527267207156-3372670819dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 16,
              rating: 4.6,
              description: 'Spicy rye whiskey with pepper and cinnamon notes.',
              featured: false
            },
            {
              id: 31,
              name: 'Premium Sake',
              category: 'Rice Wine',
              brand: 'Tokyo Traditions',
              price: 36.99,
              salePrice: 32.99,
              image: 'https://images.unsplash.com/photo-1600181922723-2025a2a46905?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 15,
              rating: 4.4,
              description: 'Premium Japanese sake with a clean, smooth flavor profile.',
              featured: false
            },
            {
              id: 32,
              name: 'Irish Whiskey',
              category: 'Whisky',
              brand: 'Dublin Distillery',
              price: 52.99,
              salePrice: null,
              image: 'https://images.unsplash.com/photo-1544282432-7a0d90ca004c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
              inStock: 18,
              rating: 4.7,
              description: 'Triple distilled Irish whiskey with a smooth, mellow character.',
              featured: true
            }
          ];
          
          // Save to localStorage for persistence
          localStorage.setItem('products', JSON.stringify(storedProducts));
        }
        
        setProducts(storedProducts);
        
        // Extract unique categories and brands
        const uniqueCategories = [...new Set(storedProducts.map(p => p.category))];
        const uniqueBrands = [...new Set(storedProducts.map(p => p.brand))];
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        
        // Set price range based on min and max prices
        const prices = storedProducts.map(p => p.price);
        setPriceRange([Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
    
    // Set up interval for real-time updates (every 30 seconds)
    const interval = setInterval(fetchProducts, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Apply filters
  useEffect(() => {
    if (products.length === 0) return;
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(search) || 
             p.brand.toLowerCase().includes(search) || 
             p.category.toLowerCase().includes(search)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Apply price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo, we're using ID as a proxy for newest
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
    
    // Calculate total pages
    const calculatedTotalPages = Math.ceil(filtered.length / productsPerPage);
    setTotalPages(calculatedTotalPages);
    
    // Adjust current page if it's now out of bounds
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(1);
    }
    
  }, [products, searchTerm, selectedCategories, selectedBrands, priceRange, sortOption, productsPerPage]);
  
  // Update displayed products based on pagination
  useEffect(() => {
    if (filteredProducts.length === 0) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage.toString());
    params.set('perPage', productsPerPage.toString());
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategories.length === 1) params.set('category', selectedCategories[0]);
    if (selectedBrands.length === 1) params.set('brand', selectedBrands[0]);
    if (sortOption !== 'featured') params.set('sort', sortOption);
    
    setSearchParams(params);
    
    // Scroll to top of products when pagination changes
    window.scrollTo({
      top: document.getElementById('products-grid').offsetTop - 100,
      behavior: 'smooth'
    });
    
  }, [filteredProducts, currentPage, productsPerPage, searchParams, searchTerm, selectedCategories, selectedBrands, sortOption]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
          } else {
        return [...prev, category];
      }
    });
    // Reset to first page when changing filters
    setCurrentPage(1);
  };
  
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
        } else {
        return [...prev, brand];
      }
    });
    // Reset to first page when changing filters
    setCurrentPage(1);
  };
  
  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    // Reset to first page when changing filters
    setCurrentPage(1);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already applied in the useEffect, 
    // but we might want to reset to first page
    setCurrentPage(1);
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    // Scroll to top of products when changing page
    document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Image error handler for fallback
  const handleImageError = (e) => {
    // Choose a placeholder based on product category for variety
    const category = e.target.dataset.category?.toLowerCase() || '';
    let placeholderUrl = 'https://images.unsplash.com/photo-1513704519535-f5c81d20bf37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    
    if (category.includes('whisky') || category.includes('whiskey')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('vodka')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1608885898945-0a13dd4c25f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('gin')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1605989251086-b2a3650712f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('tequila')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1585975772049-e863e4d2c9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('rum')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1629803536067-3909e4dd8132?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('champagne')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1622813626435-3e4d7f81aded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('liqueur')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1654618921388-8822bf487a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('beer')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('wine')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    }
    
    e.target.src = placeholderUrl;
    e.target.onerror = null; // Prevent infinite loop
  };

  // Add this new function for the cart functionality
  const handleAddToCart = (product) => {
    // Use the CartContext addItem function instead of directly manipulating localStorage
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      category: product.category
    }, 1);
    
    // Provide user feedback
    alert(`${product.name} added to cart!`);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
                <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Back
                </button>
              </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar for filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <FaFilter className="text-primary" />
        </div>

              {/* Search */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Search</h4>
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <button 
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors"
                >
                      Go
                </button>
              </div>
                </form>
              </div>
            
              {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                <input
                    type="range"
                    min={Math.min(...products.map(p => p.price)) || 0}
                    max={Math.max(...products.map(p => p.price)) || 1000}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={Math.min(...products.map(p => p.price)) || 0}
                    max={Math.max(...products.map(p => p.price)) || 1000}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
                    className="w-full"
                />
              </div>
            </div>

              {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                    <input 
                      type="checkbox" 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                    </label>
            </div>
                  ))}
            </div>
              </div>

              {/* Brands */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Brands</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
            </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {/* Sort and filter controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="text-sm mr-2">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
              </div>
                
              <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Show:</span>
                    <select
                      value={productsPerPage}
                      onChange={handleProductsPerPageChange}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={36}>36</option>
                  </select>
                </div>
                  
                  <span className="text-sm text-gray-600">
                    Showing {filteredProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0} - {
                      Math.min(currentPage * productsPerPage, filteredProducts.length)
                    } of {filteredProducts.length} products
                  </span>
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div id="products-grid">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
              ) : displayedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button 
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setSearchTerm('');
                      setPriceRange([
                        Math.min(...products.map(p => p.price)),
                        Math.max(...products.map(p => p.price))
                      ]);
                      setSortOption('featured');
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Reset Filters
                </button>
              </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <div key={product.id} className="product-card group">
                        <div className="relative">
                          <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                              className="w-full h-60 object-cover"
                              onError={handleImageError}
                              data-category={product.category}
                      />
                    </Link>
                          {product.salePrice && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                              Sale
                            </span>
                          )}
                          {product.inStock <= 5 && (
                            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                              Low Stock
                            </span>
                          )}
                          
                          {/* Add to cart button on hover - Home page style */}
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.preventDefault(); // Prevent navigation
                                handleAddToCart(product);
                              }}
                              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors transform hover:scale-105"
                            >
                              Add to Cart
                            </button>
                    </div>
                  </div>
                        
                        <div className="p-4 bg-white">
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm text-gray-500">{product.category}</span>
                            <span className="text-sm text-gray-500">{product.brand}</span>
              </div>
                          
                          <Link to={`/products/${product.id}`}>
                            <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors mb-1">
                              {product.name}
                            </h3>
                      </Link>
                          
                          <div className="flex items-center mb-2">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                    </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              {product.salePrice ? (
                                <div>
                                  <span className="text-lg font-semibold text-primary">${product.salePrice.toFixed(2)}</span>
                                  <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                      </div>
                              ) : (
                                <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                              )}
                            </div>
                            
                      <div className="flex space-x-2">
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                title="Add to Wishlist"
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`${product.name} added to wishlist!`);
                                }}
                              >
                                <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                              </button>
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-primary rounded-full hover:bg-primary-dark transition-colors"
                                title="Add to Cart"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                              >
                                <FaShoppingCart className="text-white" />
                              </button>
                            </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <div className="mb-4 md:mb-0">
                          <span className="text-sm text-gray-600">
                            Showing {filteredProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0} - {
                              Math.min(currentPage * productsPerPage, filteredProducts.length)
                            } of {filteredProducts.length} products
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm mr-2">Show:</span>
                          <select
                            value={productsPerPage}
                            onChange={handleProductsPerPageChange}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary mr-4"
                          >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <nav className="flex items-center bg-white rounded-md shadow px-2 py-1">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-md ${
                              currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            Previous
                          </button>
                          
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first 2 pages, last 2 pages, and pages around current page
                            if (
                              pageNumber <= 2 ||
                              pageNumber > totalPages - 2 ||
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => handlePageChange(pageNumber)}
                                  className={`px-3 py-2 rounded-md mx-1 ${
                                    currentPage === pageNumber
                                      ? 'bg-primary text-white'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              (pageNumber === 3 && currentPage > 4) ||
                              (pageNumber === totalPages - 2 && currentPage < totalPages - 3)
                            ) {
                              return <span key={pageNumber} className="px-2">...</span>;
                            }
                            return null;
                          })}
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-md ${
                              currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            Next
                          </button>
                        </nav>
                </div>
              </div>
                  )}
                </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductsPage;