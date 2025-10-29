const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}