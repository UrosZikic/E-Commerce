import { useProducts } from "../useProducts";
import { useStored } from "../useStored";
import { useCart } from "../useCart";
import { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/cart.css";

const profileId = JSON.parse(localStorage.getItem("profile"));

export default function Cart() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);
  const [validateCheckout, setValidateCheckout] = useState(false);
  useEffect(() => setNavCart(cart.length), [cart]);

  const { stored } = useStored();
  const devices = {
    PC: "logo-windows",
    PS4: "logo-playstation",
    XBOX: "logo-xbox",
    nintendo: "logo-dropbox",
  };

  if (cart.length === 0) {
    window.location.href = "http://localhost:3000";
  }

  function initiateCheckOut() {
    if (profileId) {
      window.location.href = "/pages/CheckOut";
    } else {
      setValidateCheckout(true);
    }
  }
  return (
    <>
      <Nav data={data} navCart={navCart} />

      <div className="cartContainer defaultWidth defaultFlex flexColumn">
        {stored &&
          stored.map((item, id) => (
            <CartProduct key={id} id={id} item={item} devices={devices} />
          ))}
        <button onClick={initiateCheckOut}>Check out</button>
        {validateCheckout && (
          <p style={{ color: "white" }}>
            You must log-in or register to proceed
          </p>
        )}
      </div>
      <Footer navCart={navCart} cartValidate={true} />
    </>
  );
}
