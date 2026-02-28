import { useState } from "react";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Setting from "./pages/Setting";
import Login from "./pages/login/Login";
import AddProduct from "./pages/product/AddProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Dashboard />}></Route>
            <Route path="category" element={<Category />}></Route>
            <Route path="product" element={<Product />} />
            <Route path="settings" element={<Setting />} />
            <Route path="product/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
