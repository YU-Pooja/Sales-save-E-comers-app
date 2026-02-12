import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function User_management() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="nav-container">
        <h2 style={{ color: 'white', marginBottom: '15px' }}>User Management</h2>
        <button className="nav-button" onClick={() => navigate('/admin_home')}>Back to Dashboard</button>
      </div>

      <div className="card">
        <h3>User Management Features</h3>
        <p>Manage all users from this section (Coming Soon)</p>
      </div>
    </div>
  )
}
