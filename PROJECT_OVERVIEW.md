# Sales Savvy — Project Overview

This document gives a **high-level summary** of the Sales Savvy e-commerce project, its **file structure**, **roles and responsibilities** of main components, and how to get started (including **Razorpay**).

---

## High-Level Summary

**Sales Savvy** is a full-stack e-commerce application:

- **Frontend:** React (Vite) — UI for customers (browse, cart, checkout) and admins (user/product management).
- **Backend:** Java Spring Boot — REST API for users, products, cart, orders, and payment creation/verification.
- **Payments:** **Razorpay** — create order on backend, open Razorpay checkout on frontend, verify payment on backend.

Users can sign up, sign in, browse products, add to cart, and pay via Razorpay. Admins can manage users and products. The app uses MySQL for persistence and Razorpay for payments.

---

## Razorpay — Free Test Account

You can use **Razorpay** for payments without any cost during development:

- Create a **free test account** on the **official Razorpay website**:  
  **https://razorpay.com/**
- From the Razorpay Dashboard, get your **Test Key ID** and **Test Key Secret**.
- In the **backend** project, open `src/main/resources/application.properties` and set:
  - `razorpay.key.id` = your Key ID  
  - `razorpay.key.secret` = your Key Secret  

The frontend uses these (via the backend) to create and verify orders. No payment is actually charged in test mode.

---

## Repository Layout (Top Level)

```
E-commerce platform JAVA-REACT-RAZORPAY/
├── PROJECT_OVERVIEW.md          ← This file (structure, roles, summary)
├── com.sales-savvy BACKEND CODE/   ← Spring Boot API
│   ├── README.md                   ← Backend setup (edit application.properties!)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/sales_savvy/
│       └── resources/
│           └── application.properties   ← MUST EDIT (DB + Razorpay)
└── sales-savvy FRONTEND CODE/    ← React (Vite) app
    ├── README.md                   ← Frontend setup & run
    ├── package.json
    └── src/
```

---

## Backend — File Structure & Responsibilities

**Base package:** `com.sales_savvy`

| Layer / Folder   | Role | Main contents |
|------------------|------|----------------|
| **Application.java** | Entry point | Starts Spring Boot app. |
| **controller/** | REST API | Exposes HTTP endpoints. |
| **service/**    | Business logic | Implements use cases (users, products, cart, payments). |
| **repository/** | Data access | JPA repositories for DB (users, products, cart, orders). |
| **entity/**     | Domain & DB mapping | JPA entities: Users, Product, Cart, CartItem, Orders, etc. |
| **dto/**        | Request/response shapes | e.g. PaymentRequest, PaymentVerifyRequest. |
| **resources/application.properties** | Config | **You must edit:** MySQL URL/username/password, Razorpay key id/secret. |

### Controllers (responsibilities)

- **UsersController** — Sign up, sign in (e.g. `/signUp`, `/signIn`).
- **ProductController** — Product CRUD, list all, search (e.g. `/getAllProducts`, `/addProduct`, `/updateProduct`, `/deleteProduct`, `/searchProduct`).
- **PaymentController** — Create Razorpay order (`/payment/create`), verify payment (`/payment/verify`).
- Cart-related endpoints — e.g. `/getCart/{username}`, `/addToCart`.  
- Order summary — e.g. `/order/summary/{orderId}`.

### Services (responsibilities)

- **UsersService** — User registration, lookup.
- **ProductService** — Product business logic.
- **CartService** — Cart and cart items.
- **PaymentService** — Razorpay order creation and signature verification.

---

## Frontend — File Structure & Responsibilities

| Path | Role |
|------|------|
| **App.jsx** | Defines routes (Welcome, Sign in/up, Customer/Admin home, Cart, Order summary, User/Product management). |
| **main.jsx** | React entry; mounts `App`. |
| **pages/** | Screen-level components. |
| **component/** | Reusable UI (e.g. Cart, ProductCard). |
| **utils/** | Helpers (e.g. `loadRzp.js` for Razorpay script). |

### Pages (responsibilities)

- **Welcome.jsx** — Landing.
- **About.jsx** — About page.
- **Signin.jsx** / **Signup.jsx** — Login and registration (call backend `localhost:8080`).
- **Customer_home.jsx** — Product list, add to cart.
- **Admin_home.jsx** — Admin dashboard.
- **Cart.jsx** — Cart view, “Pay with Razorpay” flow (create order → Razorpay UI → verify).
- **OrderSummary.jsx** — Show order after payment (uses `orderId` from URL).
- **User_management.jsx** — Admin user management.
- **Product_management.jsx** — Admin product hub.
- **product/Add_product.jsx, Updat_product.jsx, Search_product.jsx, Delete_produt.jsx** — Product CRUD UI.

All API calls in the frontend currently target **http://localhost:8080**; the backend must be running and `application.properties` must be configured (including Razorpay keys).

---

## How to Run Locally (Summary)

1. **Backend**
   - Edit `com.sales-savvy BACKEND CODE/src/main/resources/application.properties` (MySQL + Razorpay keys).
   - Start MySQL, then run: `./mvnw spring-boot:run` in the backend folder. API: **http://localhost:8080**.

2. **Frontend**
   - In `sales-savvy FRONTEND CODE`: `npm install` then `npm run dev`. App: usually **http://localhost:5173**.

3. **Razorpay**
   - Create a free test account at **https://razorpay.com/** and put Key ID and Secret in backend `application.properties`.

For step-by-step instructions, see:
- **Backend:** `com.sales-savvy BACKEND CODE/README.md`
- **Frontend:** `sales-savvy FRONTEND CODE/README.md`
