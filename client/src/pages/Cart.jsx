import { useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  // State for cart items (in a real app, this would likely be managed globally)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '818 TEQUILA BLANCO 750 ML',
      price: 75.00,
      image: 'https://web-assets.same.dev/1985471812/3013702058.jpeg',
      quantity: 2,
    },
    {
      id: 3,
      name: '19 CRIMES PINOT NOIR',
      price: 19.35,
      image: 'https://web-assets.same.dev/282457355/677014880.jpeg',
      quantity: 1,
    },
  ])

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = subtotal > 75 ? 0 : 10.00
  const total = subtotal + shipping

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="py-16">
        <div className="container-fluid">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-2xl font-serif mb-6">Your cart is currently empty.</h1>
            <p className="text-muted-foreground mb-8">Before proceeding to checkout, you must add some products to your shopping cart.</p>
            <Link to="/shop" className="btn-primary px-6 py-3">
              Return to shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-fluid">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-center">Cart</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-8/12">
            <div className="bg-white border border-border">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="p-4 text-left" colSpan="2">Product</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 text-left">Subtotal</th>
                    <th className="p-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b border-border">
                      <td className="p-4 w-24">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                        </Link>
                      </td>
                      <td className="p-4">
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-primary">
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-4">${item.price.toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <button
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-12 h-8 border-t border-b border-gray-300 text-center"
                          />
                          <button
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <button
                          className="text-gray-500 hover:text-primary"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <div>
                <button className="btn-outline px-4 py-2">Update Cart</button>
              </div>
              <div>
                <Link to="/shop" className="btn-outline px-4 py-2">Continue Shopping</Link>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white border border-border p-6">
              <h2 className="text-xl font-serif mb-4">Cart Totals</h2>

              <div className="border-b border-border py-3 flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="border-b border-border py-3">
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {shipping === 0
                    ? "Free shipping applied!"
                    : "Free shipping for orders over $75.00"
                  }
                </p>
              </div>

              <div className="py-3 flex justify-between text-lg font-medium">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-white text-center py-3 font-medium uppercase hover:bg-primary/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
