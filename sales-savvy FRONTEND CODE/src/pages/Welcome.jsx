import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SALES SAVVY</h1>
          <h2 className="hero-subtitle">Your Ultimate Sales Management Solution</h2>
          <p className="hero-description">
            Transform your business with our comprehensive sales management platform.
            <br/>
            Track products, manage inventory, and boost your sales effortlessly.
          </p>
          <div className="hero-buttons">
            <button className="btn-more-info" onClick={() => navigate('/about')}>MORE INFO</button>
            <button className="btn-shop-now" onClick={() => navigate('/Sign_in')}>SHOP NOW</button>
          </div>
          <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=700&fit=crop" alt="Shopping" />
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
