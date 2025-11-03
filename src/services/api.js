import { sampleProducts } from '../data/sampleProducts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const fetchProducts = async () => {
  // Always use sample data for now (backend connection will be added later)
  console.log('Using sample data')
  return sampleProducts
}

export const fetchCategories = async () => {
  // Return sample categories
  return [
    { id: 1, name: 'Rings' },
    { id: 2, name: 'Necklaces' },
    { id: 3, name: 'Watches' },
    { id: 4, name: 'Bracelets' },
    { id: 5, name: 'Earrings' }
  ]
}

// Authentication API
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    return await response.json()
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password })
    })
    return await response.json()
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Products API
export const createProduct = async (productData, token) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    return await response.json()
  } catch (error) {
    console.error('Create product error:', error)
    throw error
  }
}

export const updateProduct = async (id, productData, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    return await response.json()
  } catch (error) {
    console.error('Update product error:', error)
    throw error
  }
}

export const deleteProduct = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Delete product error:', error)
    throw error
  }
}

// Orders API
export const createOrder = async (orderData, token) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })
    return await response.json()
  } catch (error) {
    console.error('Create order error:', error)
    throw error
  }
}

export const fetchUserOrders = async (token) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Fetch orders error:', error)
    throw error
  }
}