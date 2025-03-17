"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaChevronRight, FaChevronLeft, FaPlay } from "react-icons/fa"
import gsap from "gsap"

const ParallaxHero = ({ slides, onLoaded }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)
  const slideRefs = useRef([])
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const containerRef = useRef(null)

  // Preload all images
  useEffect(() => {
    const preloadImages = () => {
      if (!slides || slides.length === 0) {
        setAllImagesLoaded(true);
        if (onLoaded) onLoaded();
        return;
      }

      slides.forEach((slide, index) => {
        const img = new Image()
        img.src = slide.imageUrl
        img.onload = () => {
          setImagesLoaded((prev) => {
            const newCount = prev + 1
            if (newCount === slides.length) {
              setAllImagesLoaded(true)
              if (onLoaded) onLoaded()
            }
            return newCount
          })
        }
        img.onerror = () => {
          setImagesLoaded((prev) => {
            const newCount = prev + 1
            if (newCount === slides.length) {
              setAllImagesLoaded(true)
              if (onLoaded) onLoaded()
            }
            return newCount
          })
        }
      })
    }

    preloadImages()
  }, [slides, onLoaded])

  // Set up slide transition
  useEffect(() => {
    if (!allImagesLoaded || !slides || slides.length === 0) return

    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [currentSlide, isTransitioning, allImagesLoaded, slides])

  // Set up parallax effect
  useEffect(() => {
    if (!allImagesLoaded) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 20
      const yPos = (clientY / window.innerHeight - 0.5) * 20

      gsap.to(".hero-image", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      })

      gsap.to(".hero-content", {
        x: -xPos * 0.5,
        y: -yPos * 0.5,
        duration: 1,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [allImagesLoaded])

  // Handle scroll parallax
  useEffect(() => {
    if (!allImagesLoaded) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = 1 - Math.min(scrollY / 500, 1)
      const yPos = scrollY * 0.5

      if (containerRef.current) {
        containerRef.current.style.opacity = opacity
      }

      gsap.to(".hero-image", {
        y: yPos,
        duration: 0.1,
        ease: "none",
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [allImagesLoaded])

  // Handle video overlay
  useEffect(() => {
    if (!allImagesLoaded) return

    const handleVideoClick = () => {
      if (videoRef.current && overlayRef.current) {
        videoRef.current.play()
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none"
            }
          },
        })
      }
    }

    if (overlayRef.current) {
      overlayRef.current.addEventListener("click", handleVideoClick)
    }

    return () => {
      if (overlayRef.current) {
        overlayRef.current.removeEventListener("click", handleVideoClick)
      }
    }
  }, [allImagesLoaded])

  const nextSlide = () => {
    if (isTransitioning || !slides || slides.length === 0) return

    setIsTransitioning(true)
    const nextIndex = (currentSlide + 1) % slides.length

    if (slideRefs.current[currentSlide]) {
      // Animate out current slide
      gsap.to(slideRefs.current[currentSlide], {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlide(nextIndex)
          setIsTransitioning(false)
        },
      })
    } else {
      setCurrentSlide(nextIndex)
      setIsTransitioning(false)
    }
  }

  const prevSlide = () => {
    if (isTransitioning || !slides || slides.length === 0) return

    setIsTransitioning(true)
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length

    if (slideRefs.current[currentSlide]) {
      // Animate out current slide
      gsap.to(slideRefs.current[currentSlide], {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlide(prevIndex)
          setIsTransitioning(false)
        },
      })
    } else {
      setCurrentSlide(prevIndex)
      setIsTransitioning(false)
    }
  }

  // Loading animation
  if (!allImagesLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#aa4c40] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-white text-lg">Loading amazing experience...</p>
          <p className="text-white/60 text-sm">{slides && slides.length > 0 ? Math.round((imagesLoaded / slides.length) * 100) : 100}%</p>
        </div>
      </div>
    )
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Experience Premium Liquor</h1>
            <p className="text-xl mb-8">Discover our exquisite selection of fine spirits</p>
            <Link to="/products" className="inline-block px-6 py-3 bg-[#aa4c40] text-white font-medium transition-all duration-300 hover:bg-[#8a3d33]">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background video - optional */}
      {videoRef && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            poster={slides[0].imageUrl}
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer z-10"
          >
            <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <FaPlay className="text-white text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`absolute inset-0 ${index === currentSlide ? "z-10" : "z-0 opacity-0"}`}
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* Background image with parallax effect */}
              <div className="absolute inset-0">
                <img
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.title}
                  className="hero-image h-full w-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              </div>

              {/* Content */}
              <div className="hero-content absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                <motion.h1
                  className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl max-w-4xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="mb-8 text-xl md:text-2xl lg:text-3xl max-w-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    to={slide.buttonLink || "/products"}
                    className="inline-block px-8 py-3 bg-[#aa4c40] text-white font-medium transition-all duration-300 hover:bg-[#8a3d33] hover:shadow-lg"
                  >
                    {slide.buttonText || "Shop Now"}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/40"
      >
        <FaChevronLeft className="text-white text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/40"
      >
        <FaChevronRight className="text-white text-xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ParallaxHero

