import "./styles/App.css";
import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import Cookies from "universal-cookie";

import Nav from "./components/nav.js";

function App() {
  const cookies = new Cookies();

  console.log(cookies.get("ordered"), "1st"); // Pacman

  const { data, loading, error } = useProducts();

  return (
    <>
      <Nav data={data} />
    </>
  );
}

export default App;
