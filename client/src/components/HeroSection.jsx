"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

/**
 * HeroSection component with parallax effects
 */
const HeroSection = ({ slides = [], onLoaded = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const slideRefs = useRef([]);
  const containerRef = useRef(null);
  const loadedImages = useRef(0);
  
  // Initialize slide refs array
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides.length]);

  // Handle image loading
  const handleImageLoad = () => {
    loadedImages.current += 1;
    if (loadedImages.current >= slides.length) {
      setIsLoading(false);
      onLoaded();
    }
  };

  // Set up slide transitions
  useEffect(() => {
    if (!isLoading) {
      // Initial animation for first slide
      gsap.to(slideRefs.current[currentSlide], {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out'
      });
      
      // Set up slide interval
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      
      return () => clearInterval(slideInterval);
    }
  }, [isLoading, slides.length, currentSlide]);

  // Handle slide transitions
  useEffect(() => {
    if (!isLoading && slides.length > 0) {
      // Hide all slides
      slideRefs.current.forEach((ref, index) => {
        if (index !== currentSlide) {
          gsap.to(ref, {
            opacity: 0,
            scale: 1.1,
            duration: 1.5,
            ease: 'power3.out'
          });
        }
      });
      
      // Show current slide
      gsap.to(slideRefs.current[currentSlide], {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out'
      });
    }
  }, [currentSlide, isLoading, slides.length]);

  // Hero motion variants
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen overflow-hidden"
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="animate-spin w-12 h-12 border-4 border-t-[#aa4c40] border-gray-200 rounded-full"></div>
        </div>
      )}
      
      {/* Hero slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={el => slideRefs.current[index] = el}
          className={`absolute inset-0 ${index === 0 ? 'z-0' : '-z-10'} transition-opacity duration-1000`}
          style={{ opacity: 0, transform: 'scale(1.1)' }}
        >
          {/* Background image */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center text-white px-4 max-w-4xl"
              initial="hidden"
              animate={currentSlide === index && !isLoading ? "visible" : "hidden"}
              variants={heroTextVariants}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4"
                variants={itemVariants}
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8"
                variants={itemVariants}
              >
                {slide.subtitle}
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <Link
                  to={slide.buttonLink}
                  className="inline-block px-8 py-3 bg-[#aa4c40] text-white font-medium transition-all duration-300 hover:bg-[#8a3d33] hover:shadow-lg"
                >
                  {slide.buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-[#aa4c40] w-6' : 'bg-white bg-opacity-70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

