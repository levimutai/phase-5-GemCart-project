const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (response.ok) {
      const data = await response.json()
      return data.products || data || []
    }
    throw new Error('Backend not available')
  } catch (error) {
    console.log('Using sample data - backend not connected')
    // Fallback sample data
    return [
      { 
        id: 1, 
        name: "Diamond Engagement Ring", 
        title: "Diamond Engagement Ring",
        description: "Beautiful diamond ring with elegant design", 
        price: 2999, 
        inventory_count: 5,
        categories: [{ name: 'Rings' }],
        image_url: null 
      },
      { 
        id: 2, 
        name: "Gold Chain Necklace", 
        title: "Gold Chain Necklace",
        description: "Elegant 18k gold necklace", 
        price: 899, 
        inventory_count: 12,
        categories: [{ name: 'Necklaces' }],
        image_url: null 
      },
      { 
        id: 3, 
        name: "Luxury Swiss Watch", 
        title: "Luxury Swiss Watch",
        description: "Premium Swiss-made timepiece", 
        price: 5999, 
        inventory_count: 3,
        categories: [{ name: 'Watches' }],
        image_url: null 
      },
      { 
        id: 4, 
        name: "Pearl Bracelet Set", 
        title: "Pearl Bracelet Set",
        description: "Classic pearl bracelet with matching earrings", 
        price: 299, 
        inventory_count: 8,
        categories: [{ name: 'Bracelets' }],
        image_url: null 
      },
      { 
        id: 5, 
        name: "Sapphire Earrings", 
        title: "Sapphire Earrings",
        description: "Stunning blue sapphire drop earrings", 
        price: 1299, 
        inventory_count: 6,
        categories: [{ name: 'Earrings' }],
        image_url: null 
      },
      { 
        id: 6, 
        name: "Rose Gold Ring", 
        title: "Rose Gold Ring",
        description: "Delicate rose gold band with diamonds", 
        price: 799, 
        inventory_count: 15,
        categories: [{ name: 'Rings' }],
        image_url: null 
      }
    ]
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