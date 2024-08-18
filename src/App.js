import "./styles/App.css";
import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import Nav from "./components/nav.js";

function App() {
  const { data, loading, error } = useProducts();

  return (
    <>
      <Nav data={data} />
    </>
  );
}

export default App;
