import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems(prev => [...prev, { ...product, quantity: 1 }])
  }

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)

  const dispatch = (action) => {
    if (action.type === 'CLEAR_CART') {
      clearCart()
    } else if (action.type === 'ADD_ITEM') {
      const existingItem = items.find(item => item.id === action.payload.id)
      if (existingItem) {
        setItems(prev => prev.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      } else {
        setItems(prev => [...prev, action.payload])
      }
    }
  }

  const value = {
    state: { items },
    dispatch,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)