import { useProducts } from "../useProducts";
import { useStored } from "../useStored";
import { useCart } from "../useCart";
import { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import Nav from "../components/nav";
import "../styles/cart.css";

export default function Cart() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  const { stored } = useStored();
  const devices = {
    PC: "logo-windows",
    PS4: "logo-playstation",
    XBOX: "logo-xbox",
    nintendo: "logo-dropbox",
  };

  return (
    <>
      <Nav data={data} navCart={navCart} />

      <div className="cartContainer defaultWidth defaultFlex flexColumn">
        {stored &&
          stored.map((item, id) => (
            <CartProduct key={id} id={id} item={item} devices={devices} />
          ))}
        <a href="./CheckOut">Check out</a>
      </div>
    </>
  );
}
