import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

/**
 * ProductGrid component for displaying a grid of products
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 * @param {boolean} props.isLoading - Whether the products are loading
 * @param {string} props.viewMode - View mode ('grid' or 'list')
 * @returns {JSX.Element} ProductGrid component
 */
const ProductGrid = ({ products, isLoading, viewMode = 'grid' }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          No products match the selected filters. Try changing your filter criteria or browse all products.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isHorizontal={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 