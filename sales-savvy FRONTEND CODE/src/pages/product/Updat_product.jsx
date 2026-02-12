import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Updat_product() {
  const [products, setProducts] = React.useState([]);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [category, setCategory] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("http://localhost:8080/getAllProducts");
    const data = await response.json();
    setProducts(data);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setPhoto(product.photo);
    setCategory(product.category);
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const data = {
      id: editingProduct.id,
      name,
      description,
      price: parseInt(price),
      photo,
      category,
      reviews: editingProduct.reviews
    };
    
    const response = await fetch("http://localhost:8080/updateProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await response.text();
    alert(msg);
    setEditingProduct(null);
    fetchProducts();
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Update Product</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/pm')}>Back to Product Management</button>
      </div>

      {!editingProduct ? (
        <div>
          <h4 style={{ textAlign: 'center' }}>Select a product to edit:</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
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
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>✏️ Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h4 style={{ textAlign: 'center' }}>Edit Product: {editingProduct.name}</h4>
          <form onSubmit={handleUpdate}>
            <label>Product Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />

            <label>Description:</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required
            />

            <label>Price (₹):</label>
            <input 
              type="number" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              required
            />

            <label>Photo URL:</label>
            <input 
              type="text" 
              value={photo} 
              onChange={e => setPhoto(e.target.value)} 
            />

            <label>Category:</label>
            <input 
              type="text" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              required
            />

            <div style={{ textAlign: 'center' }}>
              <button type="submit">💾 Save Changes</button>
              <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
