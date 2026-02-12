# Sales Savvy - Payment Integration Implementation Guide

## Overview
This document provides a complete step-by-step guide for implementing Razorpay payment integration in the Sales Savvy frontend application. The implementation follows the commit reference: [60e4a0a2ec2b7d564da45aa86324f734a38b99bd](https://github.com/deep473/sales-savvy-fe/commit/60e4a0a2ec2b7d564da45aa86324f734a38b99bd)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend APIs Used](#backend-apis-used)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [File Structure](#file-structure)
5. [Testing Guide](#testing-guide)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- Node.js (v16 or higher)
- npm (v7 or higher)
- Running backend server on `http://localhost:8080`

### Backend Requirements
Ensure your backend has the following APIs configured:

1. **Cart API**: `GET /api/cart/getCart/{username}`
2. **Payment Creation**: `POST /api/payment/create`
3. **Payment Verification**: `POST /api/payment/verify`
4. **Razorpay Key**: `GET /api/payment/key`
5. **Order Details**: `GET /api/order/{orderId}`

---

## Backend APIs Used

### 1. Get Cart API
```java
@GetMapping("/api/cart/getCart/{username}")
public List<CartItem> getCart(@PathVariable String username) {
    Users u = uService.getUser(username);
    if (u == null || u.getCart() == null) return new ArrayList<>();
    return u.getCart().getCartItems();
}
```

**Response Example:**
```json
[
  {
    "product": {
      "id": 1,
      "name": "Product Name",
      "price": 1999,
      "photo": "url"
    },
    "quantity": 2
  }
]
```

### 2. Payment Controller APIs

#### Create Payment Order
```java
@PostMapping("/api/payment/create")
public ResponseEntity<?> createOrder(@RequestBody PaymentRequest req)
```

**Request Body:**
```json
{
  "username": "john_doe",
  "amount": 199900
}
```

**Response:**
```json
{
  "id": "order_xyz123",
  "amount": 199900,
  "currency": "INR",
  "status": "CREATED"
}
```

#### Verify Payment
```java
@PostMapping("/api/payment/verify")
public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerifyRequest req)
```

**Request Body:**
```json
{
  "orderId": "order_xyz123",
  "paymentId": "pay_abc456",
  "signature": "signature_string",
  "username": "john_doe"
}
```

#### Get Razorpay Key
```java
@GetMapping("/api/payment/key")
public ResponseEntity<Map<String, String>> getKey()
```

**Response:**
```json
{
  "key": "rzp_test_xxxxxxxxxxxxx"
}
```

---

## Step-by-Step Implementation

### Step 1: Install Dependencies

```bash
cd /Users/pooja.yu/Desktop/JAVA/sales-savvy-front-end/sales-savvy
npm install --registry=https://registry.npmjs.org/ razorpay react-razorpay
```

**What this does:**
- Installs `razorpay` SDK for payment processing
- Installs `react-razorpay` React wrapper components
- Uses the default npm registry to avoid custom registry issues

**Expected Output:**
```
+ razorpay@2.9.6
+ react-razorpay@3.0.1
```

---

### Step 2: Create Razorpay Utility Loader

**File:** `src/utils/loadRzp.js`

```javascript
/**
 * Dynamically loads Razorpay's checkout.js exactly once.
 * Returns a Promise that resolves `true` if the script is ready,
 * or `false` if it failed to load.
 */
export default function loadRazorpay() {
  return new Promise((resolve) => {
    // already present?
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
```

**Purpose:**
- Dynamically loads Razorpay SDK on demand
- Prevents multiple script loads
- Returns promise for async handling
- Loads the Razorpay checkout script from CDN

**Key Points:**
- Only loads once (checks `window.Razorpay`)
- Non-blocking script loading
- Error handling included

---

### Step 3: Update Cart Component

**File:** `src/component/Cart.jsx`

#### Key Changes:

1. **Import the loadRazorpay utility**
```javascript
import loadRazorpay from "../utils/loadRzp";
```

2. **Update Cart Fetching to use new API**
```javascript
const fetchCart = async () => {
  try {
    if (!username) {
      alert("Please login first");
      navigate("/Sign_in");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/cart/getCart/${username}`);
    const data = await response.json();
    setItems(data);
  } catch (error) {
    console.error("Error fetching cart:", error);
  } finally {
    setLoading(false);
  }
};
```

3. **Add Payment Handler Function**
```javascript
async function payNow() {
  if (!items.length) return;

  // 1) load Razorpay SDK
  const ok = await loadRazorpay();
  if (!ok) return alert("Razorpay SDK failed to load. Check your internet.");

  // 2) ask backend to create order
  const res = await fetch("http://localhost:8080/api/payment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, amount: Math.round(calculateTotal() * 100) })
  });
  if (!res.ok) return alert(await res.text());
  const order = await res.json();

  // 3) get Razorpay key
  const keyRes = await fetch("http://localhost:8080/api/payment/key");
  const { key } = await keyRes.json();

  // 4) open Razorpay checkout
  const options = {
    key,
    amount: order.amount,
    currency: order.currency,
    name: "Sales Savvy",
    description: "Purchase Products",
    order_id: order.id,
    handler: async function (response) {
      // 5) verify payment
      const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          username
        })
      });
      if (!verifyRes.ok) return alert("Payment verification failed");
      const orderId = await verifyRes.text();
      navigate(`/order-summary/${orderId}`);
    },
    prefill: {
      name: username,
      email: "user@example.com"
    },
    theme: { color: "#4facfe" }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
```

4. **Update the UI Button**
```javascript
<button className="checkout-btn" onClick={payNow}>Pay Now</button>
```

**Payment Flow:**
1. Load Razorpay SDK dynamically
2. Create order on backend (gets Razorpay order ID)
3. Fetch Razorpay API key
4. Open Razorpay checkout modal
5. On successful payment, verify signature on backend
6. Clear cart and redirect to order summary

---

### Step 4: Create Order Summary Page

**File:** `src/pages/OrderSummary.jsx`

```javascript
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`http://localhost:8080/api/order/${orderId}`);
        if (!r.ok) throw new Error("Unable to fetch order");
        const json = await r.json();
        if (json.error) throw new Error("Order not found");
        setData(json);
      } catch (e) { 
        setErr(e.message); 
      }
    })();
  }, [orderId]);

  if (err) {
    return (
      <div className="order-summary-container">
        <div className="order-error">
          <h2>❌ Error</h2>
          <p>{err}</p>
          <Link to="/customer_home" className="btn-back">Back to Products</Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="order-summary-container">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2>Payment Successful!</h2>
        <p className="thank-you">Thank you for your purchase</p>
        
        <div className="order-details">
          <h3>Order Details</h3>
          <div className="detail-row">
            <span className="label">Order ID:</span>
            <span className="value">{data.id}</span>
          </div>
          <div className="detail-row">
            <span className="label">Payment ID:</span>
            <span className="value">{data.paymentId}</span>
          </div>
          <div className="detail-row">
            <span className="label">Amount:</span>
            <span className="value">₹{(data.amount / 100).toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className="value status-paid">{data.status}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/customer_home")} className="btn-primary">
            Continue Shopping
          </button>
          <button onClick={() => window.print()} className="btn-secondary">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Features:**
- Displays order confirmation with success animation
- Shows order ID, payment ID, amount, and status
- Provides options to continue shopping or print receipt
- Error handling for failed order fetches
- Loading state while fetching order details

---

### Step 5: Update App Router

**File:** `src/App.jsx`

1. **Add OrderSummary Import**
```javascript
import OrderSummary from "./pages/OrderSummary";
```

2. **Add Route**
```javascript
<Route path="/order-summary/:orderId" element={<OrderSummary />} />
```

**Complete Routes Section:**
```javascript
<Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/about" element={<About />} />
  <Route path="/Sign_in" element={<Signin />} />
  <Route path="/Sign_up" element={<Signup />} />
  <Route path="/admin_home" element={<Admin_home />} />
  <Route path="/customer_home" element={<Customer_home />} />
  <Route path="/um" element={<User_management />} />
  <Route path="/pm" element={<Product_management />} />
  <Route path="/addProduct" element={<Add_product />} />
  <Route path="/updateProduct" element={<Updat_product />} />
  <Route path="/searchProduct" element={<Search_product />} />
  <Route path="/deleteProduct" element={<Delete_produt />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/order-summary/:orderId" element={<OrderSummary />} />
</Routes>
```

---

### Step 6: Add Styling

**File:** `src/index.css`

Add the following styles at the end of your CSS file:

```css
/* Order Summary Styles */
.order-summary-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.order-success,
.order-error {
  background: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.6s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 48px;
  font-weight: bold;
  animation: scaleIn 0.5s ease 0.2s both;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.order-success h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 32px;
}

.thank-you {
  color: #7f8c8d;
  font-size: 18px;
  margin-bottom: 30px;
}

.order-details {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  margin: 30px 0;
  text-align: left;
}

.order-details h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  color: #7f8c8d;
  font-weight: 600;
}

.detail-row .value {
  color: #2c3e50;
  font-weight: 500;
}

.status-paid {
  color: #27ae60 !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 14px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.order-error {
  text-align: center;
}

.order-error h2 {
  color: #e74c3c;
  margin-bottom: 15px;
}

.order-error p {
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 16px;
}

.btn-back {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .order-success,
  .order-error {
    padding: 30px 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
```

**Styling Features:**
- Gradient background matching app theme
- Smooth animations (slideUp, scaleIn)
- Responsive design for mobile devices
- Success icon with animation
- Clean order details layout
- Print-friendly receipt option
- Hover effects on buttons

---

## File Structure

After implementation, your project structure should look like:

```
sales-savvy/
├── package.json                    (Updated with razorpay dependencies)
├── src/
│   ├── App.jsx                     (Updated with OrderSummary route)
│   ├── index.css                   (Updated with OrderSummary styles)
│   ├── component/
│   │   ├── Cart.jsx                (Updated with payment integration)
│   │   └── Cart.css
│   ├── pages/
│   │   ├── Customer_home.jsx
│   │   ├── OrderSummary.jsx        (NEW - Order confirmation page)
│   │   └── ...other pages
│   └── utils/
│       └── loadRzp.js              (NEW - Razorpay SDK loader)
```

---

## Testing Guide

### Prerequisites for Testing
1. Backend server running on `http://localhost:8080`
2. Razorpay test credentials configured in backend
3. User logged in with username in localStorage

### Step-by-Step Testing

#### 1. Test Cart Loading
```
1. Login to the application
2. Add products to cart from Customer Home
3. Click "View Cart" button
4. Verify cart items display correctly
5. Check total amount calculation
```

#### 2. Test Payment Flow
```
1. On Cart page, click "Pay Now" button
2. Verify Razorpay checkout modal opens
3. Use test card details:
   - Card Number: 4111 1111 1111 1111
   - CVV: 123
   - Expiry: Any future date
4. Complete payment
5. Verify redirect to Order Summary page
```

#### 3. Test Order Summary
```
1. After successful payment, check Order Summary displays:
   - Success icon with animation
   - Order ID
   - Payment ID
   - Amount paid
   - Status: PAID
2. Click "Continue Shopping" - should navigate to Customer Home
3. Click "Print Receipt" - should trigger print dialog
```

#### 4. Test Error Scenarios
```
1. Payment Failure:
   - Click "Pay Now"
   - Close Razorpay modal without payment
   - Verify no navigation occurs
   
2. Invalid Order:
   - Navigate to /order-summary/invalid_id
   - Verify error message displays
   - Check "Back to Products" button works
   
3. Network Error:
   - Stop backend server
   - Try to load cart
   - Verify error handling
```

### Test Card Details (Razorpay Test Mode)

**Successful Payment:**
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: Any future date

**Failed Payment:**
- Card: 4000 0000 0000 0002
- CVV: 123
- Expiry: Any future date

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Razorpay SDK Not Loading
**Error:** "Razorpay SDK failed to load"

**Solutions:**
```javascript
// Check internet connection
// Verify CDN is accessible
// Check browser console for script loading errors
```

#### 2. Payment Creation Failed
**Error:** "Unable to create order"

**Check:**
- Backend server is running
- Payment API endpoint is correct: `http://localhost:8080/api/payment/create`
- Request body contains username and amount
- Backend has valid Razorpay credentials

**Debug:**
```javascript
// Add console.log in Cart.jsx payNow function
console.log('Creating order:', { username, amount: Math.round(calculateTotal() * 100) });
```

#### 3. Payment Verification Failed
**Error:** "Payment verification failed"

**Possible Causes:**
- Signature mismatch (backend validation)
- Wrong payment ID or order ID
- Network timeout

**Solution:**
```javascript
// Check backend logs for signature verification
// Ensure all three parameters are passed correctly:
// - razorpay_order_id
// - razorpay_payment_id
// - razorpay_signature
```

#### 4. Cart Not Loading
**Error:** Cart shows loading indefinitely

**Check:**
```javascript
// Verify API endpoint
const response = await fetch(`http://localhost:8080/api/cart/getCart/${username}`);

// Check if username exists in localStorage
console.log('Username:', localStorage.getItem('username'));

// Check backend response
console.log('Cart data:', data);
```

#### 5. Order Summary Not Displaying
**Error:** Order details not showing

**Solutions:**
- Check orderId in URL parameter
- Verify backend has order fetching API
- Check console for fetch errors
- Ensure order exists in database

#### 6. NPM Registry Issues
**Error:** "404 Not Found" during npm install

**Solution:**
```bash
# Set registry to default npm
npm config set registry https://registry.npmjs.org/

# Or use --registry flag
npm install --registry=https://registry.npmjs.org/ razorpay react-razorpay
```

#### 7. CORS Errors
**Error:** "CORS policy: No 'Access-Control-Allow-Origin'"

**Backend Fix:**
```java
@CrossOrigin  // Add this annotation to PaymentController
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    // ...
}
```

---

## Demo Presentation Checklist

### Pre-Demo Setup
- [ ] Backend server running and healthy
- [ ] Database populated with products
- [ ] Test user account created
- [ ] Razorpay test mode configured
- [ ] Frontend dev server running
- [ ] Browser console open for debugging

### Demo Flow

**1. Introduction (2 minutes)**
- Show project overview
- Explain payment integration goals

**2. Cart Functionality (3 minutes)**
- Login to application
- Browse products on Customer Home
- Add multiple products to cart
- Navigate to cart page
- Show cart items with quantities and prices
- Demonstrate total calculation

**3. Payment Integration (5 minutes)**
- Click "Pay Now" button
- Explain Razorpay modal loading
- Show test card entry
- Complete payment
- Highlight signature verification process
- Show automatic cart clearing

**4. Order Confirmation (3 minutes)**
- Display Order Summary page with animations
- Point out order details (ID, payment ID, amount)
- Show status as PAID
- Demonstrate "Continue Shopping" button
- Test "Print Receipt" functionality

**5. Code Walkthrough (7 minutes)**
- Show `loadRzp.js` utility
- Explain `Cart.jsx` payment flow
- Walk through `OrderSummary.jsx` component
- Highlight backend API integration points
- Show CSS animations

**6. Q&A (5 minutes)**
- Address questions
- Show error handling if time permits

### Key Points to Emphasize
1. **Security**: Payment signature verification on backend
2. **UX**: Smooth animations and loading states
3. **Error Handling**: Graceful failures with user feedback
4. **Integration**: Clean separation of concerns
5. **Responsiveness**: Mobile-friendly design

---

## Summary of Changes

### New Files Created
1. `src/utils/loadRzp.js` - Razorpay SDK loader utility
2. `src/pages/OrderSummary.jsx` - Order confirmation page

### Files Modified
1. `package.json` - Added razorpay dependencies
2. `src/App.jsx` - Added OrderSummary route
3. `src/component/Cart.jsx` - Added payment integration
4. `src/index.css` - Added OrderSummary styling

### Dependencies Added
- `razorpay@^2.9.6`
- `react-razorpay@^3.0.1`

---

## Next Steps

### Potential Enhancements
1. Add order history page
2. Implement order tracking
3. Add email notifications
4. Create invoice generation
5. Add multiple payment methods
6. Implement refund functionality
7. Add order cancellation
8. Create admin order management

### Security Improvements
1. Add CSRF token validation
2. Implement rate limiting
3. Add payment amount validation
4. Enhance error logging
5. Add fraud detection

---

## Contact and Support

For issues or questions:
- Check browser console for errors
- Review backend logs
- Verify API endpoints
- Test with Razorpay test cards
- Check Razorpay dashboard for payment logs

---

**Implementation Date:** January 15, 2026
**Version:** 1.0.0
**Status:** ✅ Complete and Ready for Demo
