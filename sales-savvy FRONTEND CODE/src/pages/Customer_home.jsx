import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Customer_home() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [quantities, setQuantities] = React.useState({});
  const username = localStorage.getItem('username');

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("http://localhost:8080/getAllProducts");
    const data = await response.json();
    setProducts(data);
    // Initialize quantities for all products
    const initialQuantities = {};
    data.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }

  const defaultImage = "https://via.placeholder.com/300x200/4facfe/ffffff?text=No+Image";

  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  async function handleAddToCart(product) {
    try {
      const cartData = {
        username: username,
        productId: product.id,
        quantity: quantities[product.id] || 1
      };

      console.log('Adding to cart:', cartData);
      const response = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartData)
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <span className="logo-company">SALES</span>
          <span className="logo-savvy">SAVVY</span>
        </div>
        <h2 className="dashboard-title">Customer Dashboard</h2>
        <button className="btn-logout" onClick={() => {
          localStorage.removeItem('username');
          localStorage.removeItem('role');
          navigate('/');
        }}>Logout</button>
          <button onClick={() => navigate("/cart")} className="view-cart-btn">
          View Cart
        </button>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Discover Amazing Products 🛍️</h1>
          <p>Browse our exclusive collection and find what you love</p>
        </div>
      
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={product.photo || defaultImage} 
                alt={product.name}
                onError={(e) => { e.target.src = defaultImage; }}
              />
              <h4>{product.name}</h4>
              <p className="category"><strong>Category:</strong> {product.category}</p>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <div className="cart-actions">
                <div className="qty-control">
                  <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                </div>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
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
