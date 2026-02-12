import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Delete_produt() {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("http://localhost:8080/getAllProducts");
    const data = await response.json();
    setProducts(data);
  }

  async function handleDelete(id, name) {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    
    if (confirmDelete) {
      const response = await fetch(`http://localhost:8080/deleteProduct?id=${id}`);
      const msg = await response.text();
      alert(msg);
      fetchProducts();
    }
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Delete Product</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/pm')}>Back to Product Management</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button 
                  className="danger-btn"
                  onClick={() => handleDelete(product.id, product.name)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
