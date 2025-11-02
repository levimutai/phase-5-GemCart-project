import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate login
    const userData = { name: 'John Doe', email }
    const token = 'sample-token-123'
    login(userData, token)
    navigate('/')
  }

  return (
    <div style={{padding: '40px', maxWidth: '400px', margin: '0 auto'}}>
      <h1 style={{fontSize: '32px', textAlign: 'center', marginBottom: '32px'}}>🔑 Login</h1>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{padding: '12px', border: '1px solid #ccc', borderRadius: '4px'}}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{padding: '12px', border: '1px solid #ccc', borderRadius: '4px'}}
          required
        />
        <button
          type="submit"
          style={{backgroundColor: '#3b82f6', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login