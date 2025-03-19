import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaRegHeart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || '/placeholder.svg?height=400&width=400'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm md:text-base font-medium text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < product.rating ? (
                    <FaStar className="text-yellow-400" />
                  ) : (
                    <FaRegStar className="text-gray-300" />
                  )}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
              className="p-2 bg-[#8B4513] text-white rounded-full hover:bg-[#6B3410] transition-colors"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 