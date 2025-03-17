"use client"

import { createContext, useState, useContext, useEffect } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Load cart from local storage on initial load
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart))
    
    // Calculate total items in cart
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [cart])

  const addItem = (item, quantity = 1) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity,
      }
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    const updatedCart = cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        calculateTotal,
        total: calculateTotal(),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}

