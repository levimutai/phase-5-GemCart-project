import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Sample product data
  const product = {
    id: parseInt(id),
    name: 'Diamond Ring',
    price: 299,
    description: 'Beautiful diamond ring with elegant design',
    image: '💍'
  }

  const handleAddToCart = () => {
    addToCart(product)
    alert('Added to cart!')
  }

  return (
    <div style={{padding: '40px', maxWidth: '800px', margin: '0 auto'}}>
      <button
        onClick={() => navigate('/products')}
        style={{marginBottom: '20px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer'}}
      >
        ← Back to Products
      </button>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'}}>
        <div style={{textAlign: 'center', fontSize: '120px'}}>
          {product.image}
        </div>
        
        <div>
          <h1 style={{fontSize: '32px', marginBottom: '16px'}}>{product.name}</h1>
          <p style={{fontSize: '24px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '16px'}}>
            ${product.price}
          </p>
          <p style={{marginBottom: '24px', color: '#6b7280'}}>
            {product.description}
          </p>
          <button
            onClick={handleAddToCart}
            style={{backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'}}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail