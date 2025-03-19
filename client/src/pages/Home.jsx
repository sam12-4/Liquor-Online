"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext.jsx"
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaRegHeart,
  FaHeart,
  FaChevronRight,
  FaChevronLeft,
  FaQuoteLeft,
  FaWineGlass,
  FaChevronUp,
  FaGlassMartini,
  FaGlassCheers,
} from "react-icons/fa"
import { motion } from "framer-motion"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import CustomCursor from "../components/CustomCursor"
import HeroSection from "../components/HeroSection.jsx"
import PremiumShowcase from "../components/PremiumShowcase.jsx"
import LuxuryBackground from "../components/LuxuryBackground.jsx"
import WineGallery from "../components/Wine-gallery.jsx"
import ErrorBoundary from "../components/ErrorBoundary"
import Product from "../models/Product"
import productService from "../services/productService"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const { addItem } = useCart()

  // Refs for GSAP animations
  const heroRef = useRef(null)
  const categoryRef = useRef(null)
  const collectionsRef = useRef(null)
  const productsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const brandsRef = useRef(null)
  const newsletterRef = useRef(null)
  const premiumRef = useRef(null)

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // GSAP animations setup
  useEffect(() => {
    if (!heroLoaded) return

    // Category links animations
    gsap.fromTo(
      ".category-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoryRef.current,
          start: "top 80%",
        },
      },
    )

    // Collections animation
    gsap.fromTo(
      ".collection-item",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: collectionsRef.current,
          start: "top 75%",
        },
      },
    )

    // Product showcase animation
    gsap.fromTo(
      ".product-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
      },
    )

    // Testimonials section animation
    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      },
    )

    // Brands section animation
    gsap.fromTo(
      ".brand-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: brandsRef.current,
          start: "top 85%",
        },
      },
    )

    // Newsletter section animation
    gsap.fromTo(
      newsletterRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 85%",
          onEnter: () => setIsNewsletterVisible(true),
        },
      },
    )

    // Premium section animation
    gsap.fromTo(
      premiumRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: premiumRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate section headers
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
          },
        },
      )
    })

    // Animate section descriptions
    gsap.utils.toArray(".section-description").forEach((desc) => {
      gsap.fromTo(
        desc,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: desc,
            start: "top 85%",
          },
        },
      )
    })
  }, [heroLoaded])

  // Handle image errors with category-specific fallbacks
  const handleImageError = (e, category) => {
    const categoryLower = category?.toLowerCase() || ""
    let placeholderUrl =
      "https://images.unsplash.com/photo-1513704519535-f5c81d20bf37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"

    if (categoryLower.includes("whisky") || categoryLower.includes("whiskey")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("vodka")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1608885898945-0a13dd4c25f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("gin")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1605989251086-b2a3650712f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("tequila")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1585975772049-e863e4d2c9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("rum")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1629803536067-3909e4dd8132?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("wine")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1622813626435-3e4d7f81aded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("beer")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("champagne")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1626149537265-82423371f65e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    } else if (categoryLower.includes("cognac")) {
      placeholderUrl =
        "https://images.unsplash.com/photo-1602166242272-3033495b183d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    }

    e.target.src = placeholderUrl
    e.target.onerror = null // Prevent infinite loop
  }

  // Handle adding a product to cart with advanced animation
  const handleAddToCart = (product) => {
    try {
      // Add item using CartContext
      addItem(product, 1)

      // Create a floating element for animation
      const productElement = document.querySelector(`#product-${product.id}`)
      if (productElement) {
        const rect = productElement.getBoundingClientRect()
        const floatingEl = document.createElement("div")
        floatingEl.className = "fixed z-50 pointer-events-none"
        floatingEl.style.width = `${rect.width}px`
        floatingEl.style.height = `${rect.height}px`
        floatingEl.style.top = `${rect.top}px`
        floatingEl.style.left = `${rect.left}px`
        floatingEl.innerHTML = productElement.innerHTML

        document.body.appendChild(floatingEl)

        // Get cart button position
        const cartButton = document.querySelector(".cart-button")
        if (cartButton) {
          const cartRect = cartButton.getBoundingClientRect()

          // Animate the floating element to the cart
          gsap.to(floatingEl, {
            duration: 0.8,
            x: cartRect.left - rect.left,
            y: cartRect.top - rect.top,
            scale: 0.2,
            opacity: 0,
            ease: "power3.in",
            onComplete: () => {
              document.body.removeChild(floatingEl)

              // Animate cart button
              gsap.to(cartButton, {
                scale: 1.5,
                duration: 0.3,
                ease: "back.out",
                onComplete: () => {
                  gsap.to(cartButton, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                },
              })

              // Show toast notification
              const toast = document.createElement("div")
              toast.className =
                "fixed bottom-4 right-4 bg-[#aa4c40] text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center"
              toast.innerHTML = `
                <div class="mr-3 text-xl">✓</div>
                <div>
                  <div class="font-medium">${product.name}</div>
                  <div class="text-sm opacity-80">Added to your cart</div>
                </div>
              `
              document.body.appendChild(toast)

              gsap.fromTo(toast, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" })

              setTimeout(() => {
                gsap.to(toast, {
                  opacity: 0,
                  y: 20,
                  duration: 0.3,
                  ease: "power2.in",
                  onComplete: () => {
                    if (document.body.contains(toast)) {
                      document.body.removeChild(toast)
                    }
                  },
                })
              }, 3000)
            },
          })
        }
      }
    } catch (error) {
      console.error("Error adding item to cart:", error)
      alert("Could not add item to cart")
    }
  }

  // Toggle wishlist item with heart animation
  const toggleWishlist = (productId) => {
    const isInWishlist = wishlist.includes(productId)
    const heartIcon = document.querySelector(`#heart-${productId}`)

    if (heartIcon) {
      if (isInWishlist) {
        // Remove from wishlist with animation
        gsap.to(heartIcon, {
          scale: 0,
          duration: 0.3,
          ease: "back.in",
          onComplete: () => {
            setWishlist(wishlist.filter((id) => id !== productId))
            gsap.to(heartIcon, {
              scale: 1,
              duration: 0.3,
              ease: "back.out",
            })
          },
        })
      } else {
        // Add to wishlist with animation
        gsap.to(heartIcon, {
          scale: 1.5,
          duration: 0.3,
          ease: "back.out",
          onComplete: () => {
            setWishlist([...wishlist, productId])
            gsap.to(heartIcon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          },
        })
      }
    } else {
      // Fallback if animation can't be applied
      if (isInWishlist) {
        setWishlist(wishlist.filter((id) => id !== productId))
      } else {
        setWishlist([...wishlist, productId])
      }
    }
  }

  // Handle newsletter subscription with confetti effect
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value

    if (email) {
      // Create confetti effect
      const confettiColors = ["#aa4c40", "#f8f8f8", "#333333", "#d4af37"]
      const confettiContainer = document.createElement("div")
      confettiContainer.className = "fixed inset-0 pointer-events-none z-50"
      document.body.appendChild(confettiContainer)

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div")
        confetti.className = "absolute"
        confetti.style.width = `${Math.random() * 10 + 5}px`
        confetti.style.height = `${Math.random() * 10 + 5}px`
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)]
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0"
        confetti.style.top = `${Math.random() * 100}%`
        confetti.style.left = `${Math.random() * 100}%`

        confettiContainer.appendChild(confetti)

        gsap.fromTo(
          confetti,
          {
            y: -100,
            x: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            y: Math.random() * 500 + 200,
            x: (Math.random() - 0.5) * 500,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: Math.random() * 1.5 + 1,
            ease: "power2.out",
            onComplete: () => {
              if (confetti.parentNode === confettiContainer) {
                confettiContainer.removeChild(confetti)
              }

              // Remove container when all confetti are gone
              if (confettiContainer.childNodes.length === 0) {
                if (document.body.contains(confettiContainer)) {
                  document.body.removeChild(confettiContainer)
                }
              }
            },
          },
        )
      }

      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "text-green-500 mt-2 font-medium"
      successMsg.textContent = "Thank you for subscribing!"
      e.target.appendChild(successMsg)

      // Clear form
      e.target.reset()

      // Remove message after 3 seconds
      setTimeout(() => {
        if (e.target.contains(successMsg)) {
          e.target.removeChild(successMsg)
        }
      }, 3000)
    }
  }

  useEffect(() => {
    document.title = "Best Online Liquor Store In Canada | Buy Liquor Online"
    
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Use ProductService to get products
        const allProducts = await productService.getAllProducts()
        setProducts(allProducts)
        
        // Set featured products
        setFeaturedProducts(
          allProducts.filter(p => p.featured || (p.category && p.category.toLowerCase() === "wine")).slice(0, 8)
        )
        
        // Set new arrivals 
        setNewArrivals(
          allProducts.filter(p => p.isNew).length > 0 
            ? allProducts.filter(p => p.isNew).slice(0, 8)
            : allProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 8)
        )
        
        // Set trending products
        setTrendingProducts(
          allProducts.filter(p => p.isTrending).length > 0
            ? allProducts.filter(p => p.isTrending).slice(0, 8)
            : allProducts.filter(p => p.rating > 4.5).slice(0, 8)
        )
        
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Render star ratings
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
    }

    return <div className="flex">{stars}</div>
  }

  // Product card component with framer-motion animations
  const ProductCard = ({ product }) => (
    <motion.div
      id={`product-${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
            onError={(e) => handleImageError(e, product.category)}
            data-category={product.category}
          />
        </Link>

        {/* Badges for special product types */}
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
          id={`heart-${product.id}`}
          className="absolute top-2 right-2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md transition-all duration-300 hover:bg-opacity-100"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlist.includes(product.id) ? (
            <FaHeart className="text-[#aa4c40]" />
          ) : (
            <FaRegHeart className="text-gray-600 hover:text-[#aa4c40]" />
          )}
        </button>

        {/* Add to cart button on hover */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
          <button
            className="flex items-center justify-center bg-[#aa4c40] w-full py-2 text-sm text-white transition hover:bg-[#8a3d33]"
            onClick={() => handleAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <FaShoppingCart className="mr-2" /> ADD TO CART
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="mb-2 text-sm font-medium hover:text-[#aa4c40] transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-center mb-2">{renderStars(product.rating)}</div>

        <div className="flex justify-center items-center gap-2">
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
      </div>
    </motion.div>
  )

  // Product slider settings
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  // Testimonial slider settings
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    fade: true,
  }

  // Custom slider arrows
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md cursor-pointer"
        style={{ ...style }}
        onClick={onClick}
        aria-label="Next slide"
      >
        <FaChevronRight className="text-[#aa4c40]" />
      </div>
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md cursor-pointer"
        style={{ ...style }}
        onClick={onClick}
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-[#aa4c40]" />
      </div>
    )
  }

  // Hero slides
  const heroSlides = [
    {
      id: 1,
      imageUrl: "https://ext.same-assets.com/1037586591/507660624.jpeg",
      title: "GROW YOUR SALES ONLINE!",
      subtitle: "START SELLING LIQUOR ON YOUR OWN WEBSITE TODAY",
      buttonText: "SHOP NOW",
      buttonLink: "/products",
    },
    {
      id: 2,
      imageUrl: "https://ext.same-assets.com/3504656457/4053454332.jpeg",
      title: "Special Collection",
      subtitle: "Fine Red & White Wines",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=wine",
    },
    {
      id: 3,
      imageUrl: "https://ext.same-assets.com/3018128558/52223168.jpeg",
      title: "Premium Scotch",
      subtitle: "Explore Our Collection",
      buttonText: "VIEW PRODUCTS",
      buttonLink: "/products?category=whisky",
    },
  ]

  // Category links
  const categoryLinks = [
    {
      id: 1,
      name: "Wines",
      link: "/products?category=wine",
      image: "https://ext.same-assets.com/2652891786/3613466734.jpeg",
      icon: <FaWineGlass className="text-2xl mb-2" />,
    },
    {
      id: 2,
      name: "Scotch",
      link: "/products?category=whisky",
      image: "https://ext.same-assets.com/1145394987/458812689.png",
      icon: <FaGlassMartini className="text-2xl mb-2" />,
    },
    {
      id: 3,
      name: "Champagnes",
      link: "/products?category=champagne",
      image: "https://ext.same-assets.com/3604435295/2543097601.jpeg",
      icon: <FaGlassCheers className="text-2xl mb-2" />,
    },
    {
      id: 4,
      name: "Cognac",
      link: "/products?category=cognac",
      image: "https://ext.same-assets.com/2212790280/4266649089.jpeg",
      icon: <FaGlassMartini className="text-2xl mb-2" />,
    },
    {
      id: 5,
      name: "Spirits",
      link: "/products?category=spirits",
      image: "https://ext.same-assets.com/3865005611/190573520.jpeg",
      icon: <FaWineGlass className="text-2xl mb-2" />,
    },
  ]

  // Popular product showcase items - use the same IDs as in ProductService
  const showcaseProducts = [
    new Product({
      id: 101, // Same ID as in ProductService
      name: "Ciroc Vodka",
      category: "Vodka",
      price: 49.99,
      image: "https://ext.same-assets.com/1047146297/1330207975.jpeg",
      rating: 4.7,
      premium: true,
      volume: 750,
      alcoholContent: 40,
      brand: "Ciroc",
      inStock: 25
    }),
    new Product({
      id: 102, // Same ID as in ProductService
      name: "Taylor Fladgate Port",
      category: "Port",
      price: 119.99,
      image: "https://ext.same-assets.com/3434292717/3503400393.jpeg",
      rating: 4.9,
      premium: true,
      year: 2015,
      volume: 750,
      alcoholContent: 20,
      brand: "Taylor Fladgate",
      vintage: true,
      inStock: 12
    }),
    new Product({
      id: 103, // Same ID as in ProductService
      name: "Jack Daniel's Whiskey",
      category: "Whiskey",
      price: 42.99,
      image: "https://ext.same-assets.com/1566952495/3881411991.jpeg",
      rating: 4.6,
      volume: 700,
      alcoholContent: 40,
      brand: "Jack Daniel's",
      featured: true,
      inStock: 36
    }),
    new Product({
      id: 104, // Same ID as in ProductService
      name: "Remy Martin Cognac",
      category: "Cognac",
      price: 89.99,
      image: "https://ext.same-assets.com/3619194637/1276720586.jpeg",
      rating: 4.8,
      premium: true,
      volume: 700,
      alcoholContent: 40,
      brand: "Remy Martin",
      featured: true,
      inStock: 18
    }),
    new Product({
      id: 105, // Same ID as in ProductService
      name: "Clase Azul Tequila",
      category: "Tequila",
      price: 159.99,
      image: "https://ext.same-assets.com/1831445163/1357801528.jpeg",
      rating: 4.9,
      premium: true,
      volume: 750,
      alcoholContent: 40,
      brand: "Clase Azul",
      featured: true,
      inStock: 8
    })
  ]

  // Featured brands
  const featuredBrands = [
    {
      id: 1,
      name: "Johnnie Walker",
      logo: "https://ext.same-assets.com/3866796577/2044621091.jpeg",
      link: "/brands/johnnie-walker",
    },
    {
      id: 2,
      name: "Hennessy",
      logo: "https://ext.same-assets.com/3619194637/1276720586.jpeg",
      link: "/brands/hennessy",
    },
    {
      id: 3,
      name: "Dom Pérignon",
      logo: "https://ext.same-assets.com/3604435295/2543097601.jpeg",
      link: "/brands/dom-perignon",
    },
    {
      id: 4,
      name: "Grey Goose",
      logo: "https://ext.same-assets.com/1047146297/1330207975.jpeg",
      link: "/brands/grey-goose",
    },
    {
      id: 5,
      name: "Macallan",
      logo: "https://ext.same-assets.com/1145394987/458812689.png",
      link: "/brands/macallan",
    },
    {
      id: 6,
      name: "Patrón",
      logo: "https://ext.same-assets.com/1831445163/1357801528.jpeg",
      link: "/brands/patron",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      text: "You've definitely put a lot of thought and effort into your product selection, specially your wine selection. Both online shopping or deliveries our expectations were met.",
      author: "Angela Stewart",
      position: "Wine Collector",
      image: "https://ext.same-assets.com/842530391/2569500952.jpeg",
    },
    {
      id: 2,
      text: "Couldn't fault a single thing! It arrived to me within a day. Already excited to make my next order, nothing's too much trouble for them. 10/10.",
      author: "Richard Davis",
      position: "Whiskey Enthusiast",
      image: "https://ext.same-assets.com/2073331866/3344384424.jpeg",
    },
    {
      id: 3,
      text: "We were never able to have our order ready for collection within 30 minutes before using Liquor Online. Process was seamless, we were able to add notes for our order. Great job!",
      author: "Samantha Roberts",
      position: "Customer",
      image: "https://ext.same-assets.com/972996334/852397517.jpeg",
    },
    {
      id: 4,
      text: "Liquor Online has made a thousands of dollars more sales possible each month and this system along to do with that result. Highly recommend!",
      author: "Michael Thompson",
      position: "Store Owner",
      image: "https://ext.same-assets.com/1741569894/3672850778.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f9f7] relative overflow-hidden">
      {/* Custom Cursor */}
      <ErrorBoundary fallback={<div></div>}>
        <CustomCursor />
      </ErrorBoundary>

      {/* Luxury Background */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none">
        <ErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-b from-gray-100 to-white"></div>}>
          <LuxuryBackground />
        </ErrorBoundary>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen">
        <ErrorBoundary fallback={
          <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="text-center p-8">
              <h1 className="text-4xl font-bold mb-4">Premium Liquor Collection</h1>
              <p className="mb-8 text-xl">Discover our exquisite selection</p>
              <Link to="/products" className="inline-block px-6 py-3 bg-[#aa4c40] text-white transition hover:bg-[#8a3d33]">
                Shop Now
              </Link>
            </div>
          </div>
        }>
          <HeroSection slides={heroSlides} onLoaded={() => setHeroLoaded(true)} />
        </ErrorBoundary>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Links */}
        <div ref={categoryRef} className="my-16">
          <div className="text-center mb-10">
            <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">EXPLORE CATEGORIES</h2>
            <p className="section-description text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of premium spirits, wines, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoryLinks.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="category-item group relative overflow-hidden rounded-lg shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg?height=400&width=400"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                                  </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:opacity-90">
                  <div className="flex h-full flex-col items-center justify-end p-4 text-center text-white">
                    {category.icon}
                    <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                    <span className="flex items-center text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Shop Collection <FaChevronRight className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Collection Showcase */}
        <div ref={premiumRef} className="my-16 py-12 relative overflow-hidden rounded-lg shadow-xl">
          <ErrorBoundary fallback={
            <div className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Premium Collection</h2>
              <p className="mb-6 max-w-lg mx-auto">Experience our finest selection of premium spirits.</p>
              <Link to="/products?premium=true" className="inline-block px-6 py-3 bg-[#aa4c40] text-white hover:bg-[#8a3d33]">
                Discover Premium
              </Link>
            </div>
          }>
            <PremiumShowcase />
          </ErrorBoundary>
        </div>

        {/* Featured Collections */}
        <div ref={collectionsRef} className="my-16">
          <div className="text-center mb-10">
            <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">FEATURED COLLECTIONS</h2>
            <p className="section-description text-gray-600 max-w-2xl mx-auto">
              Curated selections of our finest products for every occasion.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Vintage Collection */}
            <div className="collection-item relative overflow-hidden rounded-lg shadow-lg">
              <div className="h-[400px] overflow-hidden">
                <img
                  src="https://ext.same-assets.com/3866796577/2044621091.jpeg"
                  alt="Vintage Collection"
                  className="h-full w-full object-cover transition duration-700 ease-in-out hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-black/70 to-transparent p-10">
                <div className="text-white">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider">Vintage</div>
                  <h2 className="mb-4 text-3xl font-bold">Collections</h2>
                  <Link
                    to="/products?collection=vintage"
                    className="inline-block border border-white px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden group"
                  >
                    <span className="relative z-10">Shop now</span>
                    <span className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Fine Wines Collection */}
            <div className="collection-item relative overflow-hidden rounded-lg shadow-lg">
              <div className="h-[400px] overflow-hidden">
                <img
                  src="https://ext.same-assets.com/2086064594/3125804342.jpeg"
                  alt="Fine Wines Collection"
                  className="h-full w-full object-cover transition duration-700 ease-in-out hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-black/70 to-transparent p-10">
                <div className="text-white">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider">Special Selection</div>
                  <h2 className="mb-4 text-3xl font-bold">
                    Fine Red & White
                    <br />
                    Wines
                  </h2>
                  <Link
                    to="/products?category=wine&sort=price-high-low"
                    className="inline-block border border-white px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden group"
                  >
                    <span className="relative z-10">Shop now</span>
                    <span className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wine Gallery */}
        <div className="my-16">
          <ErrorBoundary fallback={
            <div className="py-16 bg-[#f9f9f7] text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Wine Collection</h2>
              <p className="mb-6 text-gray-600 max-w-lg mx-auto">
                Explore our handpicked selection of exceptional wines.
              </p>
            </div>
          }>
            <WineGallery />
          </ErrorBoundary>
        </div>

        {/* Popular Categories - Product Showcase */}
        <div ref={productsRef} className="my-16">
          <div className="text-center mb-10">
            <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">POPULAR CATEGORIES</h2>
            <p className="section-description text-gray-600 max-w-2xl mx-auto">
              Our most sought-after products, handpicked for your enjoyment.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2 md:space-x-4">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === "all" ? "bg-[#aa4c40] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === "wine" ? "bg-[#aa4c40] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={() => setActiveCategory("wine")}
              >
                Wine
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === "whiskey" ? "bg-[#aa4c40] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={() => setActiveCategory("whiskey")}
              >
                Whiskey
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === "vodka" ? "bg-[#aa4c40] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={() => setActiveCategory("vodka")}
              >
                Vodka
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === "tequila" ? "bg-[#aa4c40] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                onClick={() => setActiveCategory("tequila")}
              >
                Tequila
              </button>
            </div>
          </div>

          <div className="relative px-8">
            <Slider {...productSliderSettings}>
              {showcaseProducts.map((product) => (
                <div key={product.id} className="product-item px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block px-6 py-3 border-2 border-[#aa4c40] text-[#aa4c40] font-medium transition-all duration-300 hover:bg-[#aa4c40] hover:text-white"
            >
              View All Products
            </Link>
          </div>
        </div>

        {/* Featured Brands */}
        <div ref={brandsRef} className="my-16">
          <div className="text-center mb-10">
            <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">FEATURED BRANDS</h2>
            <p className="section-description text-gray-600 max-w-2xl mx-auto">
              Discover premium brands that represent excellence and quality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredBrands.map((brand) => (
              <Link key={brand.id} to={brand.link} className="brand-item group">
                <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center h-32">
                  <img
                    src={brand.logo || "/placeholder.svg?height=200&width=200"}
                    alt={brand.name}
                    className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center mt-2 text-sm font-medium text-gray-700">{brand.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="my-16 rounded-lg bg-[#f2f2f0] py-16 shadow-inner">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center">
              <FaQuoteLeft size={36} className="text-[#aa4c40]" />
            </div>
            <h2 className="section-header mb-12 text-3xl font-bold text-gray-800">CUSTOMER TESTIMONIALS</h2>

            <Slider {...testimonialSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4">
                  <blockquote className="mb-8 text-lg italic text-gray-600">"{testimonial.text}"</blockquote>
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#aa4c40]">
                      <img
                        src={testimonial.image || "/placeholder.svg?height=200&width=200"}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <div className="font-bold text-gray-800">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div ref={newsletterRef} className="my-16">
          <div className="bg-[#aa4c40] rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="mb-6">
                  Stay updated with our latest products, exclusive offers, and expert recommendations.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                      aria-label="Email address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-white text-[#aa4c40] font-medium rounded-md transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>

              <div className="md:w-1/2 relative h-48 md:h-auto">
                <img
                  src="https://ext.same-assets.com/2086064594/3125804342.jpeg"
                  alt="Newsletter"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/90 p-6 rounded-lg text-center max-w-xs">
                    <FaWineGlass className="mx-auto text-[#aa4c40] text-3xl mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Join Our Wine Club</h3>
                    <p className="text-sm text-gray-600">
                      Get exclusive access to limited edition wines and special member discounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <Link
        to="/cart"
        className="cart-button fixed bottom-8 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#aa4c40] text-white shadow-lg transition-all duration-300 hover:bg-[#8a3d33] hover:scale-110"
      >
        <FaShoppingCart size={24} />
      </Link>

      {/* Back to top button */}
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
        className="fixed bottom-8 left-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#aa4c40] shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-110"
        aria-label="Back to top"
      >
        <FaChevronUp size={24} />
      </button>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="text-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-8 border-[#aa4c40] border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-800">Loading products...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

