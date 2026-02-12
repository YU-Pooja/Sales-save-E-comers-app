import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Product_management() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="nav-container">
        <h2 style={{ color: 'white', marginBottom: '15px' }}>Product Management</h2>
        <button className="nav-button" onClick={() => navigate('/admin_home')}>Back to Dashboard</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/addProduct')}>
          <h3>➕ Add Product</h3>
          <p>Add new products to inventory</p>
        </div>

        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/searchProduct')}>
          <h3>🔍 Search Product</h3>
          <p>Find products by ID</p>
        </div>

        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/updateProduct')}>
          <h3>✏️ Update Product</h3>
          <p>Edit existing products</p>
        </div>

        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/deleteProduct')}>
          <h3>🗑️ Delete Product</h3>
          <p>Remove products from inventory</p>
        </div>
      </div>
    </div>
  )
}
