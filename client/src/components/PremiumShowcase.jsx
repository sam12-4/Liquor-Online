"use client"
import React, { Suspense } from 'react';
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaArrowRight, FaGlassMartini, FaWineGlass, FaGlassCheers } from "react-icons/fa"
import ErrorBoundary from './ErrorBoundary';
import GlassShowcase from './GlassShowcase';

const PremiumShowcase = () => {
  const premiumItems = [
    {
      id: 1,
      name: "Aged Whiskey",
      description: "Discover our collection of rare and aged whiskeys from around the world.",
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      icon: <FaGlassMartini className="text-4xl mb-4" />,
      link: "/products?category=whiskey&premium=true",
    },
    {
      id: 2,
      name: "Fine Wines",
      description: "Explore our selection of exceptional wines from prestigious vineyards.",
      image:
        "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      icon: <FaWineGlass className="text-4xl mb-4" />,
      link: "/products?category=wine&premium=true",
    },
    {
      id: 3,
      name: "Luxury Champagnes",
      description: "Celebrate with our premium champagnes and sparkling wines.",
      image:
        "https://images.unsplash.com/photo-1626149537265-82423371f65e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      icon: <FaGlassCheers className="text-4xl mb-4" />,
      link: "/products?category=champagne&premium=true",
    },
  ]

  return (
    <div className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      <ErrorBoundary fallback={
        <div className="py-16 px-8 md:px-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Premium Collection</h2>
          <p className="mb-6 text-gray-300 max-w-lg mx-auto">
            Discover our exquisite selection of fine wines, aged whiskeys, and champagnes. Each bottle tells a story of
            heritage, craftsmanship, and unparalleled quality.
          </p>
          <Link
            to="/products?premium=true"
            className="inline-flex items-center px-8 py-3 bg-[#aa4c40] text-white font-medium transition-all duration-300 hover:bg-[#8a3d33] hover:shadow-lg group"
          >
            <span>Discover Premium</span>
            <FaArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      }>
        <GlassShowcase />
      </ErrorBoundary>
    </div>
  )
}

export default PremiumShowcase

