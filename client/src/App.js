import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import LandingPage from "./components/LandingPage";
import Products from "./components/products/Products";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import NewProduct from "./components/products/NewProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <TopMenu />
        <div style={{ padding: "10px" }}>
          <Routes>
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
            <Route path="/products/:page" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" exact element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
