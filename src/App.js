import "./styles/App.css";
import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import { useCart } from "./useCart";

import Nav from "./components/nav.js";
import MainHeader from "./components/MainHeader.js";
import Footer from "./components/footer.js";
function App() {
  // const cookies = new Cookies();

  const { cart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  const { data, loading, error } = useProducts();

  return (
    <>
      <Nav data={data} navCart={navCart} />
      <MainHeader />
      <Footer />
    </>
  );
}

export default App;
