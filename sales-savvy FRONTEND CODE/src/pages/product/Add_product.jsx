import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Add_product() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [category, setCategory] = React.useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name,
      description,
      price: parseInt(price),
      photo,
      category,
      reviews: []
    };
    const response = await fetch("http://localhost:8080/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await response.text();
    alert(msg);
    if (msg === "Product added successfully") {
      navigate('/pm');
    }
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input 
          type="text" 
          placeholder="Enter product name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required
        />

        <label>Description:</label>
        <textarea 
          placeholder="Enter product description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required
        />

        <label>Price (₹):</label>
        <input 
          type="number" 
          placeholder="Enter price" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          required
        />

        <label>Photo URL:</label>
        <input 
          type="text" 
          placeholder="Enter image URL" 
          value={photo} 
          onChange={e => setPhoto(e.target.value)} 
        />

        <label>Category:</label>
        <input 
          type="text" 
          placeholder="Enter category" 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          required
        />

        <div style={{ textAlign: 'center' }}>
          <button type="submit">Add Product</button>
          <button type="button" onClick={() => navigate('/pm')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
