import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts()
      // Transform data to match ProductCard expectations
      const transformedData = data.map(product => ({
        ...product,
        title: product.name || product.title,
        inventory_count: product.inventory_count || 15,
        categories: product.categories || [{ name: 'Rings' }]
      }))
      setProducts(transformedData)
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h2>Loading products...</h2>
      </div>
    )
  }

  return (
    <div style={{padding: '40px'}}>
      <h1 style={{fontSize: '36px', color: '#2563eb', textAlign: 'center', marginBottom: '40px'}}>
        Our Products
      </h1>
      {products.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p>No products available. Make sure the backend is running.</p>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products