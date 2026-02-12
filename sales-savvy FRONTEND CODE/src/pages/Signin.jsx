import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username,
      password,
      role
    };
    const response = await fetch("http://localhost:8080/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await response.text();
    if (msg === "admin") {
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'admin');
      navigate('/admin_home');
    } else if (msg === "customer") {
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'customer');
      navigate('/customer_home');
    } else {
      alert(msg);
    }
  }

  return (
    <div className="auth-page">
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

      {/* Sign In Form */}
      <div className="auth-content">
        <div className="auth-form-container">
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to continue to Sales Savvy</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <label>Username:</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />

            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />

            <label>Select Role:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="role" value="admin" onChange={e => setRole(e.target.value)} required />
                <span>Admin</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="role" value="customer" onChange={e => setRole(e.target.value)} />
                <span>Customer</span>
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-shop-now">Sign In</button>
              <button type="button" className="btn-more-info" onClick={() => navigate('/')}>Back to Home</button>
            </div>
            
            <p className="auth-footer">
              Don't have an account? <a href="/Sign_up" onClick={(e) => { e.preventDefault(); navigate('/Sign_up'); }}>Sign Up</a>
            </p>
          </form>
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
