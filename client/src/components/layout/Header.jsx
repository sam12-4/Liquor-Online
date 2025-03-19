import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif text-[#8B4513]">LIQUOR ONLINE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              Products
            </Link>
            <Link to="/collections" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              Collections
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              <FaShoppingCart className="text-xl" />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-[#8B4513] transition-colors">
              <FaUser className="text-xl" />
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-[#8B4513] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:text-[#8B4513] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/collections"
                className="block px-3 py-2 text-gray-700 hover:text-[#8B4513] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-[#8B4513] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-[#8B4513] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
