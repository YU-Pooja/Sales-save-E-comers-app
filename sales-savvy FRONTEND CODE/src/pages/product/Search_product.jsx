import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search_product() {
  const [searchId, setSearchId] = React.useState('');
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    if (!searchId) {
      alert("Please enter product ID");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/searchProduct?id=${searchId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        alert("Product not found");
        setProduct(null);
      }
    } catch (error) {
      alert("Error searching product");
      setProduct(null);
    }
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Search Product</h2>
      
      <form onSubmit={handleSearch} style={{ maxWidth: '500px' }}>
        <label>Enter Product ID:</label>
        <input 
          type="number" 
          placeholder="Product ID" 
          value={searchId} 
          onChange={e => setSearchId(e.target.value)} 
          required
        />
        <div style={{ textAlign: 'center' }}>
          <button type="submit">🔍 Search</button>
          <button type="button" onClick={() => navigate('/pm')}>Back</button>
        </div>
      </form>

      {product && (
        <div className="product-card" style={{ maxWidth: '600px', margin: '30px auto' }}>
          <h3>Product Details</h3>
          {product.photo && <img src={product.photo} alt={product.name} style={{ maxWidth: '300px', display: 'block', margin: '20px auto' }} />}
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#89986D' }}>Price: ₹{product.price}</p>
        </div>
      )}
    </div>
  )
}
