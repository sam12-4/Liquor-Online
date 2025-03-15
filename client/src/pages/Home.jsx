import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Home = () => {
  const navigate = useNavigate();

  // Handle category navigation
  const handleCategoryClick = (categoryPath, subcat = null) => {
    let path = `/product-category/${categoryPath}`;
    if (subcat) {
      // Use consistent query parameter format
      path += `?za=${subcat}`;
    }
    console.log('Home - Navigating to:', path);
    navigate(path);
  };

  // Hero slider settings
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  // Categories slider settings
  const categorySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  // Brand slider settings
  const brandSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  // Sample product data (you would fetch this from an API in real app)
  const featuredProducts = [
    {
      id: 1,
      name: '818 TEQUILA BLANCO 750 ML',
      price: 75.00,
      image: 'https://web-assets.same.dev/1985471812/3013702058.jpeg',
      category: 'Tequila',
      isHot: true,
    },
    {
      id: 2,
      name: '1884 ESTATE GROWN SYRAH 750 ML',
      price: 16.70,
      image: 'https://web-assets.same.dev/3676876019/561983296.jpeg',
      category: 'Wine',
      isHot: true,
    },
    {
      id: 3,
      name: '19 CRIMES PINOT NOIR',
      price: 19.35,
      image: 'https://web-assets.same.dev/282457355/677014880.jpeg',
      category: 'Wine',
      isHot: true,
    },
    {
      id: 4,
      name: '20 BEES JUICY WHITE',
      price: 10.45,
      image: 'https://web-assets.same.dev/2607398782/3925610433.jpeg',
      category: 'Wine',
      isHot: true,
    },
  ]

  const recommendedProducts = [
    {
      id: 5,
      name: 'A PURPUS ROSE VODKA SODA',
      price: 15.60,
      image: 'https://web-assets.same.dev/1330601140/485806587.jpeg',
      category: 'Vodka',
      isHot: true,
    },
    {
      id: 6,
      name: 'A PURPUS STRAWBERRY VODKA SODA',
      price: 15.60,
      image: 'https://web-assets.same.dev/856443968/2373395576.jpeg',
      category: 'Vodka',
      isHot: true,
    },
    {
      id: 7,
      name: 'ABSOLUT ELYX - SINGLE ESTATE HANDCRAFTED VODKA',
      price: 97.00,
      image: 'https://web-assets.same.dev/3237504018/683900238.jpeg',
      category: 'Vodka',
      isHot: true,
    },
    {
      id: 8,
      name: '818 TEQUILA REPOSADO 750 ML',
      price: 85.00,
      image: 'https://web-assets.same.dev/1214273369/2625015867.jpeg',
      category: 'Tequila',
      isHot: true,
    },
  ]

  return (
    <div>
      {/* Test Navigation Section */}
      <div className="bg-gray-100 p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Test Category Navigation</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleCategoryClick('spirits')}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Spirits (Button)
          </button>
          <Link 
            to="/product-category/wine" 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Wine (Link)
          </Link>
          <button 
            onClick={() => handleCategoryClick('beer')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Beer (Button)
          </button>
          <button 
            onClick={() => handleCategoryClick('spirits', 'tequila')}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Tequila (Button)
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-muted py-3">
        <div className="container-fluid text-center">
          <div className="grid grid-cols-2">
            <div className="text-sm font-medium">
              GROW YOUR SALES ONLINE! START SELLING LIQUOR ON YOUR OWN WEBSITE TODAY
            </div>
            <div className="text-sm font-medium">
              PRICES AND OTHER OPTIONS ARE AVAILABLE AT <a href="https://liquoronline.ca/pricing/" className="text-primary hover:underline">LIQUORONLINE.CA/PRICING</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="hero-slider">
        <Slider {...heroSettings}>
          <div>
            <img
              src="https://web-assets.same.dev/3179111030/4142659827.jpeg"
              alt="Banner 1"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <img
              src="https://web-assets.same.dev/3090790115/1355704146.jpeg"
              alt="Banner 2"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <img
              src="https://web-assets.same.dev/1364517605/3754063653.jpeg"
              alt="Banner 3"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </Slider>
      </div>

      {/* Product Categories */}
      <div className="py-12 bg-white">
        <div className="container-fluid">
          <div className="mb-8">
            <h2 className="section-title">POPULAR CATEGORIES</h2>
          </div>
          <Slider {...categorySettings}>
            <div className="px-2">
              <div className="text-center group">
                <button 
                  onClick={() => handleCategoryClick('beer')}
                  className="block w-full"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 border border-gray-200 hover:border-primary transition-colors">
                    <img
                      src="https://web-assets.same.dev/2434705900/2183896642.jpeg"
                      alt="Beer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium uppercase group-hover:text-primary">BEER</h3>
                </button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-center group">
                <button 
                  onClick={() => handleCategoryClick('wine', 'red')}
                  className="block w-full"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 border border-gray-200 hover:border-primary transition-colors">
                    <img
                      src="https://web-assets.same.dev/2652891786/3613466734.jpeg"
                      alt="Red Wine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium uppercase group-hover:text-primary">RED WINE</h3>
                </button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-center group">
                <button 
                  onClick={() => handleCategoryClick('spirits', 'cognac')}
                  className="block w-full"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 border border-gray-200 hover:border-primary transition-colors">
                    <img
                      src="https://web-assets.same.dev/2212790280/4266649089.jpeg"
                      alt="Cognac"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium uppercase group-hover:text-primary">COGNAC</h3>
                </button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-center group">
                <button 
                  onClick={() => handleCategoryClick('spirits', 'tequila')}
                  className="block w-full"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 border border-gray-200 hover:border-primary transition-colors">
                    <img
                      src="https://web-assets.same.dev/820632560/2752243979.jpeg"
                      alt="Tequila"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium uppercase group-hover:text-primary">TEQUILA</h3>
                </button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-center group">
                <button 
                  onClick={() => handleCategoryClick('spirits', 'rum')}
                  className="block w-full"
                >
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-2 border border-gray-200 hover:border-primary transition-colors">
                    <img
                      src="https://web-assets.same.dev/3865005611/190573520.jpeg"
                      alt="Rum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium uppercase group-hover:text-primary">RUM</h3>
                </button>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-background">
        <div className="container-fluid">
          <div className="mb-8">
            <h2 className="section-title">RECOMMENDATIONS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.isHot && <span className="hot-badge">Hot</span>}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain p-4"
                  />
                </Link>
                <div className="p-4 text-center">
                  <h3 className="font-medium mb-1 truncate hover:text-primary">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banners Grid */}
      <div className="py-12 bg-white">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden group">
              <img
                src="https://web-assets.same.dev/590687274/860825473.jpeg"
                alt="New Collections"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-10 text-white">
                <h3 className="text-2xl font-serif mb-1">Vintage<br />Collections</h3>
                <Link to="/product-tag/vintage-collection" className="bg-primary text-white px-4 py-2 inline-block mt-4 text-sm uppercase hover:bg-primary/90 transition-colors">
                  Shop now
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden group">
              <img
                src="https://web-assets.same.dev/1191264934/2294829792.jpeg"
                alt="Fine Wines"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-10 text-white">
                <h3 className="text-2xl font-serif mb-1">Fine Red & White<br />Wines</h3>
                <Link to="/product-category/wine?orderby=price-desc" className="bg-primary text-white px-4 py-2 inline-block mt-4 text-sm uppercase hover:bg-primary/90 transition-colors">
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="py-12 bg-background">
        <div className="container-fluid">
          <div className="mb-8">
            <h2 className="section-title">TRENDING PRODUCTS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.isHot && <span className="hot-badge">Hot</span>}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain p-4"
                  />
                </Link>
                <div className="p-4 text-center">
                  <h3 className="font-medium mb-1 truncate hover:text-primary">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="py-16 bg-muted">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl font-serif text-secondary mb-4">"</div>
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-secondary">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg mb-6">
              Liquor Online updated our full database and products to perfectly sync with LiquorConnect, BDL and all other major distributors. They saved us months of work!
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img src="https://web-assets.same.dev/1853023700/1478775059.jpeg" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="font-medium">GABRIEL FLORES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Brands Slider */}
      <div className="py-12 bg-white">
        <div className="container-fluid">
          <div className="mb-8">
            <h2 className="section-title">TOP BRANDS</h2>
          </div>
          <Slider {...brandSettings}>
            <div className="px-4">
              <img src="https://web-assets.same.dev/3462727922/1339275903.jpeg" alt="Jim Beam" className="h-12 object-contain mx-auto" />
            </div>
            <div className="px-4">
              <img src="https://web-assets.same.dev/416267130/3908385236.jpeg" alt="Corona" className="h-12 object-contain mx-auto" />
            </div>
            <div className="px-4">
              <img src="https://web-assets.same.dev/1949126179/1427655573.jpeg" alt="Johnnie Walker" className="h-12 object-contain mx-auto" />
            </div>
            <div className="px-4">
              <img src="https://web-assets.same.dev/4184878451/780048509.jpeg" alt="Crown Royal" className="h-12 object-contain mx-auto" />
            </div>
            <div className="px-4">
              <img src="https://web-assets.same.dev/4271822925/3975364061.jpeg" alt="Jack Daniels" className="h-12 object-contain mx-auto" />
            </div>
            <div className="px-4">
              <img src="https://web-assets.same.dev/4061215534/1233894968.jpeg" alt="Bushmills" className="h-12 object-contain mx-auto" />
            </div>
          </Slider>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-8 bg-muted">
        <div className="container-fluid">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">SIGN UP FOR OUR NEWSLETTER</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address..."
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
