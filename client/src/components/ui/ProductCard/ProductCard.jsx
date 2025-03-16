import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext.jsx';
import { formatPrice } from '../../../utils/formatters';

/**
 * ProductCard component for displaying product information
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {boolean} props.isHorizontal - Whether to display the card horizontally
 * @returns {JSX.Element} ProductCard component
 */
const ProductCard = ({ product, isHorizontal = false }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (isHorizontal) {
    return (
      <div className="flex product-card">
        <div className="w-1/3 relative">
          {product.isHot && <span className="hot-badge">Hot</span>}
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-contain p-4"
            />
          </Link>
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center">
          <h3 className="font-medium mb-2 hover:text-primary">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <div className="text-lg font-bold text-primary mb-2">{formatPrice(product.price)}</div>
          <div className="mb-4 text-sm text-muted-foreground">
            {product.category && `Category: ${product.category}`}
            {product.type && ` > ${product.type}`}
          </div>
          <div className="flex space-x-2">
            <button 
              className="btn-primary py-1 px-3 text-sm"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <Link 
              to={`/product/${product.id}`}
              className="btn-outline py-1 px-3 text-sm"
            >
              Quick view
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      {product.isHot && <span className="hot-badge">Hot</span>}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-64 object-contain p-4"
        />
      </Link>
      <div className="p-4 text-center">
        <h3 className="font-medium mb-1 truncate hover:text-primary">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="text-lg font-bold text-primary">{formatPrice(product.price)}</div>
        <button 
          className="mt-3 btn-primary py-1 px-3 text-sm"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 