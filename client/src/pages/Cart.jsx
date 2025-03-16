import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { formatPrice } from '../utils/formatters'

const Cart = () => {
  // Get cart state and methods from context
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const { items, total, itemCount } = cart;

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
            {items.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded">
                <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/shop" className="btn-primary px-6 py-2">
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
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {/* Product */}
                          <td className="py-4">
                            <div className="flex items-center">
                              <Link to={`/product/${item.id}`}>
                                <img 
                                  src={item.image || "/placeholder.svg"} 
                                  alt={item.name}
                                  className="w-16 h-16 object-contain mr-4"
                                />
                              </Link>
                              <Link to={`/product/${item.id}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          
                          {/* Price */}
                          <td className="py-4 text-center">
                            {formatPrice(item.price)}
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
                            {formatPrice(item.price * item.quantity)}
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
                    <Link to="/shop" className="text-primary hover:underline">
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
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link 
                to="/checkout"
                className={`w-full btn-primary py-3 px-4 text-center block ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => items.length === 0 && e.preventDefault()}
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
