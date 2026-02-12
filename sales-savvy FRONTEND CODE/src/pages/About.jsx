import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Navigation Header */}
      <header className="welcome-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-company">SALES</span>
          <span className="logo-savvy">SAVVY</span>
        </div>
        <nav className="welcome-nav">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>HOME</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>ABOUT</a>
          <a href="#shop">SHOP</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className="auth-buttons">
          <button className="btn-login" onClick={() => navigate('/Sign_in')}>LOGIN</button>
          <button className="btn-signup" onClick={() => navigate('/Sign_up')}>SIGN UP</button>
        </div>
      </header>

      {/* About Content */}
      <div className="about-content">
        <div className="about-container">
          <h1 className="about-main-title">About Sales Savvy</h1>
          <p className="about-intro">Your Ultimate Sales Management Solution</p>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">📦</div>
              <h3>Product Management</h3>
              <p>Effortlessly manage your entire product catalog with our intuitive interface. Add, update, search, and delete products with just a few clicks.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">📊</div>
              <h3>Sales Tracking</h3>
              <p>Monitor your sales performance in real-time. Get comprehensive insights into your business with powerful analytics and reporting tools.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">👥</div>
              <h3>User Management</h3>
              <p>Separate admin and customer interfaces ensure smooth operations. Admins can manage users and products while customers enjoy a seamless shopping experience.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">🛒</div>
              <h3>Easy Shopping</h3>
              <p>Customers can browse products by category, view detailed descriptions, check prices, and add items to their cart with an elegant and responsive interface.</p>
            </div>
          </div>

          <div className="about-cta">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join thousands of businesses already using Sales Savvy to streamline their operations</p>
            <div className="cta-buttons">
              <button className="btn-shop-now" onClick={() => navigate('/Sign_up')}>GET STARTED</button>
              <button className="btn-more-info" onClick={() => navigate('/Sign_in')}>LOGIN NOW</button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <span className="deco-plus plus-1">+</span>
        <span className="deco-plus plus-2">+</span>
        <span className="deco-plus plus-3">+</span>
        <span className="deco-plus plus-4">+</span>
        <span className="deco-minus minus-1">−</span>
        <span className="deco-minus minus-2">−</span>
        <span className="deco-minus minus-3">−</span>
        <span className="deco-minus minus-4">−</span>
        <span className="deco-dot dot-1">•</span>
        <span className="deco-dot dot-2">•</span>
        <span className="deco-dot dot-3">•</span>
      </div>
    </div>
  )
}
