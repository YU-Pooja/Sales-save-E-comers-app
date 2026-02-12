import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [role, setRole] = React.useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username,
      email,
      password,
      gender,
      dob,
      role
    };
    const response = await fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await response.text();
    if (msg === "User created successfully!") {
      alert("Signup successful!");
      navigate('/Sign_in');
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

      {/* Sign Up Form */}
      <div className="auth-content">
        <div className="auth-form-container">
          <h1 className="auth-title">Join Sales Savvy</h1>
          <p className="auth-subtitle">Create your account and start managing sales today!</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <label>Username:</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Choose a username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />

            <label>Email Address:</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />

            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a strong password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />

            <label>Gender:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="gender" value="M" onChange={e => setGender(e.target.value)} required />
                <span>Male</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" value="F" onChange={e => setGender(e.target.value)} />
                <span>Female</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" value="O" onChange={e => setGender(e.target.value)} />
                <span>Other</span>
              </label>
            </div>

            <label>Date of Birth:</label>
            <input 
              type="date" 
              name="dob" 
              value={dob} 
              onChange={e => setDob(e.target.value)} 
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
              <button type="submit" className="btn-shop-now">Create Account</button>
              <button type="button" className="btn-more-info" onClick={() => navigate('/')}>Back to Home</button>
            </div>
            
            <p className="auth-footer">
              Already have an account? <a href="/Sign_in" onClick={(e) => { e.preventDefault(); navigate('/Sign_in'); }}>Sign In</a>
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
