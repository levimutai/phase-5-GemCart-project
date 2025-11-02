import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Simple state variables
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load saved data when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  // Simple login function
  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    setIsAuthenticated(true)
    
    // Save to browser storage
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
  }

  // Simple logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    
    // Clear browser storage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Easy API fetch with automatic auth headers
  const authFetch = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    // Add auth token if user is logged in
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, { ...options, headers })

    // Auto logout if token expired
    if (response.status === 401) {
      logout()
    }

    return response
  }

  // Provide all auth data and functions
  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    authFetch
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)