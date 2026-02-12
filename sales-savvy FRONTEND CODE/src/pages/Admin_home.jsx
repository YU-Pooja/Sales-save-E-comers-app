import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin_home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <span className="logo-company">SALES</span>
          <span className="logo-savvy">SAVVY</span>
        </div>
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <button className="btn-logout" onClick={() => navigate('/')}>Logout</button>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Welcome, Admin! 👋</h1>
          <p>Manage your platform efficiently with powerful tools</p>
        </div>

        <div className="dashboard-cards">
          <div className="dash-card" onClick={() => navigate('/um')}>
            <div className="dash-icon">👥</div>
            <h3>User Management</h3>
            <p>View, add, update, and manage all users</p>
            <button className="btn-shop-now">Manage Users</button>
          </div>

          <div className="dash-card" onClick={() => navigate('/pm')}>
            <div className="dash-icon">📦</div>
            <h3>Product Management</h3>
            <p>Add, update, search, and delete products</p>
            <button className="btn-shop-now">Manage Products</button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <span className="deco-plus plus-1">+</span>
        <span className="deco-plus plus-2">+</span>
        <span className="deco-plus plus-3">+</span>
        <span className="deco-minus minus-1">−</span>
        <span className="deco-minus minus-2">−</span>
        <span className="deco-dot dot-1">•</span>
        <span className="deco-dot dot-2">•</span>
      </div>
    </div>
  )
}
