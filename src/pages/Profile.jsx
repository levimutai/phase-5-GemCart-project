import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h1 style={{fontSize: '32px', marginBottom: '20px'}}>👤 Profile</h1>
        <p>Please login to view your profile</p>
      </div>
    )
  }

  return (
    <div style={{padding: '40px', maxWidth: '600px', margin: '0 auto'}}>
      <h1 style={{fontSize: '32px', marginBottom: '32px'}}>👤 Profile</h1>
      <div style={{backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px', marginBottom: '24px'}}>
        <h2 style={{fontSize: '20px', marginBottom: '16px'}}>User Information</h2>
        <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
      </div>
      <button
        onClick={logout}
        style={{backgroundColor: '#ef4444', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
      >
        Logout
      </button>
    </div>
  )
}

export default Profile