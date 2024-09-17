import Nav from "../components/nav";
import Footer from "../components/footer";
import ContactUs from "../components/ContactUs";
import { useProducts } from "../useProducts";
import { useCart } from "../useCart";
import { useState } from "react";

export default function Contact() {
  const { data } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);

  return (
    <>
      <Nav data={data} navCart={navCart} />
      <ContactUs />
      <Footer dataDisplay="0" />
    </>
  );
}
