"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://ext.same-assets.com/2086064594/3125804342.jpeg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-6"
          >
            Premium Liquor Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover our exquisite selection of fine wines, spirits, and craft cocktails
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="px-8 py-4 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors text-lg font-medium"
            >
              Shop Now
            </Link>
            <Link
              to="/collections"
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-medium"
            >
              View Collections
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

