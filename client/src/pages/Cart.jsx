import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { formatPrice } from '../utils/formatters'

const Cart = () => {
  // Get cart state and methods from context
  const { cart, itemCount, total, updateQuantity, removeItem, clearCart } = useCart();

  // Handle image errors with category-specific fallbacks
  const handleImageError = (e, category) => {
    const categoryLower = category?.toLowerCase() || '';
    let placeholderUrl = 'https://placehold.co/400x400/252958/white?text=Liquor+Online';
    
    if (categoryLower.includes('whisky') || categoryLower.includes('whiskey')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('vodka')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1608885898945-0a13dd4c25f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('gin')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1605989251086-b2a3650712f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('tequila')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1585975772049-e863e4d2c9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('rum')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1629803536067-3909e4dd8132?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('wine')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1622813626435-3e4d7f81aded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    } else if (categoryLower.includes('beer')) {
      placeholderUrl = 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80';
    }
    
    e.target.src = placeholderUrl;
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <div className="py-8">
      <div className="container-fluid">
        {/* Cart Banner */}
        <div className="h-48 bg-darkBg mb-8 flex items-center justify-center">
          <h1 className="text-white text-4xl font-serif">Shopping Cart</h1>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded">
                <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/products" className="btn-primary px-6 py-2">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="py-3 text-left">Product</th>
                        <th className="py-3 text-center">Price</th>
                        <th className="py-3 text-center">Quantity</th>
                        <th className="py-3 text-center">Subtotal</th>
                        <th className="py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {/* Product */}
                          <td className="py-4">
                            <div className="flex items-center">
                              <Link to={`/products/${item.id}`}>
                                <img 
                                  src={item.image || "/placeholder.svg"} 
                                  alt={item.name}
                                  className="w-16 h-16 object-contain mr-4"
                                  onError={(e) => handleImageError(e, item.category)}
                                  data-category={item.category}
                                />
                              </Link>
                              <Link to={`/products/${item.id}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          
                          {/* Price */}
                          <td className="py-4 text-center">
                            ${item.price.toFixed(2)}
                          </td>
                          
                          {/* Quantity */}
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 border-t border-b text-center"
                              />
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          
                          {/* Subtotal */}
                          <td className="py-4 text-center font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          
                          {/* Actions */}
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between mb-8">
                  <div>
                    <Link to="/products" className="text-primary hover:underline">
                      ← Continue Shopping
                    </Link>
                  </div>
                  <div>
                    <button 
                      onClick={clearCart}
                      className="text-red-500 hover:underline"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Cart Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-medium mb-4">Cart Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total ? total.toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t">
                  <span>Total</span>
                  <span>${total ? total.toFixed(2) : '0.00'}</span>
                </div>
              </div>
              <Link 
                to="/checkout"
                className={`w-full btn-primary py-3 px-4 text-center block ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => cart.length === 0 && e.preventDefault()}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
