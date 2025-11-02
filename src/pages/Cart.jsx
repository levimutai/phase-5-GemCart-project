import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { state, cartTotal, removeFromCart } = useCart()
  const navigate = useNavigate()

  if (state.items.length === 0) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h1 style={{fontSize: '32px', marginBottom: '20px'}}>🛒 Your Cart</h1>
        <p style={{marginBottom: '20px'}}>Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          style={{backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div style={{padding: '40px'}}>
      <h1 style={{fontSize: '32px', marginBottom: '32px'}}>🛒 Your Cart</h1>
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px'}}>
        {state.items.map(item => (
          <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px'}}>
            <div>
              <h3 style={{fontWeight: 'bold'}}>{item.name}</h3>
              <p>${item.price} x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={{textAlign: 'right', marginBottom: '20px'}}>
        <h2 style={{fontSize: '24px'}}>Total: ${cartTotal}</h2>
      </div>
      <button
        onClick={() => navigate('/checkout')}
        style={{backgroundColor: '#10b981', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%'}}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Cart