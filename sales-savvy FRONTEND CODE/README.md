# Sales Savvy — Frontend

React (Vite) web app for the Sales Savvy e-commerce platform. Supports customer shopping, cart, checkout with **Razorpay**, and admin flows for users and products.

---

## Prerequisites

- **Node.js** (v18+ recommended) and **npm**
- Backend API running at **http://localhost:8080** (see `com.sales-savvy BACKEND CODE/README.md` for setup)

---

## Local Setup

### 1. Open the frontend project

Navigate to the `sales-savvy FRONTEND CODE` folder.

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Vite will start the app (usually at **http://localhost:5173**). Open that URL in your browser.

### 4. Use the app

- **Backend must be running** at `http://localhost:8080` for sign-in, products, cart, and payments to work.
- If your backend runs on a different host or port, you’ll need to update the `fetch` URLs in the frontend (e.g. in `Customer_home.jsx`, `Cart.jsx`, `Signin.jsx`, `Signup.jsx`, and the product/order pages) to point to that base URL.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

- **React 19**
- **Vite 7**
- **React Router DOM**
- **Razorpay** (react-razorpay / Razorpay SDK) for checkout

---

## Main Features

- **Welcome / About** — Landing and info pages
- **Sign up / Sign in** — User registration and login (backend at `localhost:8080`)
- **Customer home** — Browse products, add to cart
- **Cart** — View cart, proceed to Razorpay checkout, verify payment
- **Order summary** — View order details after payment
- **Admin** — User management, product management (add / update / search / delete products)

---

## Project structure (high level)

- `src/App.jsx` — Routes and main app
- `src/pages/` — Signin, Signup, Welcome, Customer_home, Admin_home, Cart-related, Order summary, User/Product management
- `src/component/` — Cart, ProductCard
- `src/utils/` — e.g. Razorpay loader (`loadRzp.js`)

For full file structure, roles, and a high-level project summary, see the root **PROJECT_OVERVIEW.md**.

---

## Razorpay (payments)

Payments are processed via **Razorpay**. You can create a **free test account** on the [official Razorpay website](https://razorpay.com/) and use the test Key ID and Secret in the **backend** `application.properties`. The frontend uses the same Razorpay keys (via the backend) for creating and verifying orders. See **PROJECT_OVERVIEW.md** for more details.
