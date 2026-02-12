import React from 'react'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import {Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Admin_home from "./pages/Admin_home";
import Customer_home from "./pages/Customer_home"
import User_management from './pages/User_management';
import Product_management from './pages/Product_management';
import Add_product from './pages/product/Add_product';
import Updat_product from './pages/product/Updat_product';
import Search_product from './pages/product/Search_product';
import Delete_produt from './pages/product/Delete_produt';
import './index.css'; 
import Cart from "./component/Cart";
import OrderSummary from "./pages/OrderSummary";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/about" element={<About />} />
      <Route path="/Sign_in" element={<Signin />} />
      <Route path="/Sign_up" element={<Signup />} />
      <Route path = "/admin_home" element = {<Admin_home />} />
      <Route path = "/customer_home" element = {<Customer_home />} />
      <Route path = "/um" element = {<User_management />} />
      <Route path = "/pm" element = {<Product_management />} />
      <Route path = "/addProduct" element = {<Add_product />} />
      <Route path = "/updateProduct" element = {<Updat_product />} />
      <Route path = "/searchProduct" element = {<Search_product />} />
      <Route path = "/deleteProduct" element = {<Delete_produt />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-summary/:orderId" element={<OrderSummary />} />
    </Routes>
    </>
  )
}

export default App
