import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
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
      setFilteredProducts(transformedData)
      setLoading(false)
    }
    loadProducts()
  }, [])

  // Get unique categories
  const categories = ['All', ...new Set(products.flatMap(product => 
    product.categories.map(cat => cat.name)
  ))]

  // Filter products by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => 
        product.categories.some(cat => cat.name === category)
      )
      setFilteredProducts(filtered)
    }
  }

  if (loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h2>Loading products...</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        💎 Our Jewelry Collection
      </h1>
      
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category === 'All' ? '🔍 All Products' : 
             category === 'Rings' ? '💍 Rings' :
             category === 'Necklaces' ? '📿 Necklaces' :
             category === 'Watches' ? '⌚ Watches' :
             category === 'Bracelets' ? '🔗 Bracelets' : category}
          </button>
        ))}
      </div>

      {/* Products Count */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} {selectedCategory === 'All' ? 'products' : selectedCategory.toLowerCase()}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {selectedCategory === 'All' 
              ? 'No products available. Make sure the backend is running.'
              : `No ${selectedCategory.toLowerCase()} found.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products