import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { useCart } from '../contexts/CartContext.jsx'
import { formatPrice } from '../utils/formatters'

const ProductDetail = () => {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  // Mock product data - in a real app, you would fetch this based on the productId
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockProduct = {
        id: 1,
        name: '818 TEQUILA BLANCO 750 ML',
        price: 75.00,
        image: 'https://web-assets.same.dev/1985471812/3013702058.jpeg',
        category: 'Spirits',
        subcategory: 'tequila',
        country: 'MEXICO',
        type: 'TEQUILA',
        brand: '818 TEQUILA',
        sku: 'TEQSP10',
        inStock: 9,
        description: 'Hand-picked by jimadores. Slow roasted in adobe brick ovens. Aged in American oak barrels. Packaged in sustainable materials. And brought to you and your family straight from ours. We value every step of our process and respect those who make it possible, all while fulfilling our commitment to the earth. Ultimately, we are left with our award-winning 818, bringing you some of the smoothest and most enjoyable tequila in the world.',
        tags: ['Celebrity Spirits', 'LETEQ', 'Limited Editions'],
        isHot: true,
        relatedProducts: [
          {
            id: 8,
            name: '818 TEQUILA REPOSADO 750 ML',
            price: 85.00,
            image: 'https://web-assets.same.dev/1214273369/2625015867.jpeg',
            category: 'Spirits',
            subcategory: 'tequila',
            isHot: true,
          },
          {
            id: 5,
            name: 'A PURPUS ROSE VODKA SODA',
            price: 15.60,
            image: 'https://web-assets.same.dev/1330601140/485806587.jpeg',
            category: 'Spirits',
            subcategory: 'vodka',
            isHot: true,
          },
          {
            id: 6,
            name: 'A PURPUS STRAWBERRY VODKA SODA',
            price: 15.60,
            image: 'https://web-assets.same.dev/856443968/2373395576.jpeg',
            category: 'Spirits',
            subcategory: 'vodka',
            isHot: true,
          },
          {
            id: 7,
            name: 'ABSOLUT ELYX - SINGLE ESTATE HANDCRAFTED VODKA',
            price: 97.00,
            image: 'https://web-assets.same.dev/3237504018/683900238.jpeg',
            category: 'Spirits',
            subcategory: 'vodka',
            isHot: true,
          },
        ]
      };
      setProduct(mockProduct);
      setLoading(false);
    }, 300);
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= product.inStock) {
      setQuantity(value)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  const relatedProductsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="container-fluid">
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-fluid">
        <div className="mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <Link to={`/product-category/${product.category.toLowerCase()}`} className="hover:text-primary">
              {product.category.toUpperCase()}
            </Link>
            {product.subcategory && (
              <>
                <span className="mx-2">›</span>
                <Link 
                  to={`/product-category/${product.category.toLowerCase()}?za=${product.subcategory.toLowerCase()}`} 
                  className="hover:text-primary"
                >
                  {product.subcategory.toUpperCase()}
                </Link>
              </>
            )}
            <span className="mx-2">›</span>
            <span>{product.name}</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              {product.isHot && <span className="hot-badge">Hot</span>}
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif mb-4">{product.name}</h1>
              <div className="text-2xl text-primary font-bold mb-4">{formatPrice(product.price)}</div>

              <div className="mb-6">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="border-t border-b border-border py-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">
                      <span className="font-medium">Category:</span>{' '}
                      <Link to={`/product-category/${product.category.toLowerCase()}`} className="hover:text-primary">
                        {product.category}
                      </Link>
                    </p>
                    {product.subcategory && (
                      <p className="mb-2">
                        <span className="font-medium">Type:</span>{' '}
                        <Link 
                          to={`/product-category/${product.category.toLowerCase()}?za=${product.subcategory.toLowerCase()}`} 
                          className="hover:text-primary"
                        >
                          {product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}
                        </Link>
                      </p>
                    )}
                    <p className="mb-2"><span className="font-medium">Country:</span> <span>{product.country}</span></p>
                  </div>
                  <div>
                    <p className="mb-2"><span className="font-medium">Brand:</span> <Link to={`/brand/${product.brand.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">{product.brand}</Link></p>
                    <p className="mb-2"><span className="font-medium">SKU:</span> <span>{product.sku}</span></p>
                    <p className="mb-2"><span className="font-medium">Product Count:</span> <span>{product.inStock}</span></p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mb-6">
                <p className="text-green-600 mb-2">{product.inStock} in stock</p>
                <div className="flex items-center">
                  <div className="flex mr-4">
                    <button
                      className="border border-gray-300 px-3 py-2"
                      onClick={decreaseQuantity}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      max={product.inStock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 border-t border-b border-gray-300 text-center"
                    />
                    <button
                      className="border border-gray-300 px-3 py-2"
                      onClick={increaseQuantity}
                    >+</button>
                  </div>
                  <button 
                    className="btn-primary py-2 px-8 uppercase"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Buy Now Button */}
              <button className="w-full bg-accent text-white py-3 font-medium uppercase mb-6 hover:bg-accent/90 transition-colors">
                Buy Now
              </button>

              {/* Tags */}
              <div>
                <span className="font-medium text-sm mr-2">Tags:</span>
                {product.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/product-tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block text-sm bg-muted px-2 py-1 mr-2 mb-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="section-title">Related Products</h2>
          <Slider {...relatedProductsSettings}>
            {product.relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="px-2">
                <div className="product-card">
                  {relatedProduct.isHot && <span className="hot-badge">Hot</span>}
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-contain p-4"
                    />
                  </Link>
                  <div className="p-4 text-center">
                    <h3 className="font-medium mb-1 truncate hover:text-primary">
                      <Link to={`/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                    </h3>
                    <div className="text-lg font-bold text-primary">{formatPrice(relatedProduct.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
