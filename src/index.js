import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Store from "./pages/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/App" element={<App />} />
        <Route path="/pages/Product" element={<Product />} />
        <Route path="/pages/Cart" element={<Cart />} />
        <Route path="/pages/Store" element={<Store />} />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
