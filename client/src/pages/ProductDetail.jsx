import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShoppingCart, FaRegHeart, FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext.jsx';
import ProductService from '../services/ProductService';

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [inWishlist, setInWishlist] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState('description')
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Use ProductService to get product by ID
        const foundProduct = await ProductService.getProductById(parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          document.title = `${foundProduct.name} | Liquor Online Store`;
          
          // Get all products to find related ones
          const allProducts = await ProductService.getAllProducts();
          
          // Set related products from the same category
          const related = allProducts
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4);
          
          setRelatedProducts(related);
        } else {
          setError('Product not found');
          navigate('/products');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    
    fetchProduct();
    
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setInWishlist(wishlist.includes(parseInt(id)));
  }, [id, navigate]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= (product?.inStock || 0)) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < (product?.inStock || 0)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    // Check if product is in stock
    if (product.inStock <= 0) {
      alert('This product is out of stock');
      return;
    }
    
    // Check if requested quantity is available
    if (quantity > product.inStock) {
      alert(`Only ${product.inStock} items available`);
      return;
    }
    
    // Add to cart using CartContext
    try {
      addItem(product, quantity);
      alert(`${quantity} ${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Could not add item to cart');
    }
  };
  
  const handleAddToWishlist = () => {
    if (!product) return;
    
    try {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      
      // Check if product is already in wishlist
      if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      
      alert(`${product.name} added to wishlist!`);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  // Handle broken images
  const handleImageError = (e) => {
    // Choose a placeholder based on product category for variety
    const category = product?.category?.toLowerCase() || '';
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
    } else if (category.includes('cognac')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1693552924002-83d8505d9c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('beer')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (category.includes('wine')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    }
    
    e.target.src = placeholderUrl;
    e.target.onerror = null; // Prevent infinite loop
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

  if (loading) {
    return (
      <div className="container-fluid py-12">
        <div className="text-center">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-fluid py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-12">
      <div className="container-fluid">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Back to Products
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white p-4 rounded-lg shadow-sm">
              <div>
              <img
                src={product.image}
                alt={product.name}
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              </div>
              {product.inStock <= 5 && product.inStock > 0 ? (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-sm">
                  Only {product.inStock} left
                </div>
              ) : product.inStock <= 0 ? (
                <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-sm">
                  Out of stock
                </div>
              ) : null}
            </div>
              </div>

          <div className="w-full lg:w-1/2">
            <div className="mb-4">
                        <Link 
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-primary text-sm hover:underline"
                        >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Link>
                  </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
            
            <div className="text-2xl font-bold mb-4">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-primary mr-2">${product.salePrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-lg">${product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-primary text-white text-sm px-2 py-1 rounded">Save ${(product.price - product.salePrice).toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-gray-900">${product.price.toFixed(2)}</span>
              )}
              </div>

              <div className="mb-6">
              <p className="text-muted-foreground">{product.description || 'No description available for this product.'}</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <span className="mr-4 text-muted-foreground">Quantity:</span>
                <div className="flex border border-gray-300 rounded-md">
                    <button
                    className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                    <input
                      type="number"
                      min="1"
                      max={product.inStock}
                      value={quantity}
                      onChange={handleQuantityChange}
                    className="w-16 text-center focus:outline-none"
                    />
                    <button
                    className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.inStock}
                  >
                    +
                  </button>
                  </div>
                <span className="ml-4 text-sm text-muted-foreground">
                  {product.inStock} available
                </span>
                </div>
              </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                className={`px-6 py-3 rounded-md ${product.inStock > 0 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-gray-400 cursor-not-allowed'} transition-colors`}
                onClick={handleAddToCart}
                disabled={product.inStock <= 0}
              >
                {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button 
                className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                onClick={handleAddToWishlist}
              >
                Add to Wishlist
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <span className="w-32 text-muted-foreground">Brand:</span>
                <span className="font-medium">
                  <Link to={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:text-primary">
                    {product.brand}
                  </Link>
                </span>
              </div>
              <div className="flex">
                <span className="w-32 text-muted-foreground">Category:</span>
                <span className="font-medium">
                  <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Link>
                </span>
              </div>
              <div className="flex">
                <span className="w-32 text-muted-foreground">Type:</span>
                <span className="font-medium">{product.type || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex">
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'details' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('details')}
              >
                Additional Information
              </button>
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Product Description</h2>
                <p>{product.description || 'No detailed description available for this product.'}</p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Additional Information</h2>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium w-1/4">Brand</td>
                      <td className="py-2">{product.brand}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Category</td>
                      <td className="py-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Type</td>
                      <td className="py-2">{product.type || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Stock</td>
                      <td className="py-2">{product.inStock} units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Customer Reviews</h2>
                <p className="text-muted-foreground">There are no reviews yet.</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors mt-4">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="product-card group">
                  <div className="relative">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                        className="w-full h-60 object-cover"
                        onError={handleImageError}
                        data-category={relatedProduct.category}
                    />
                  </Link>
                    {relatedProduct.inStock <= 5 && relatedProduct.inStock > 0 ? (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Only {relatedProduct.inStock} left
                      </span>
                    ) : relatedProduct.inStock <= 0 ? (
                      <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                        Out of stock
                      </span>
                    ) : null}
                    
                    {/* Add to cart button on hover - Home page style */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation
                          try {
                            addItem(relatedProduct, 1);
                            alert(`${relatedProduct.name} added to cart!`);
                          } catch (error) {
                            console.error('Error adding item to cart:', error);
                          }
                        }}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <Link to={`/products/${relatedProduct.id}`} className="block">
                      <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">{relatedProduct.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <div>
                        {relatedProduct.salePrice ? (
                          <div className="flex items-center">
                            <span className="text-primary font-semibold">${relatedProduct.salePrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${relatedProduct.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-semibold">${relatedProduct.price.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {relatedProduct.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
