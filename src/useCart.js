import { useState, useEffect } from "react";

export function useCart(product) {
  const [cart, setCart] = useState(() => {
    const cartCurrent = localStorage.getItem("cart");
    return cartCurrent ? JSON.parse(cartCurrent) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  return { cart, addToCart };
}
