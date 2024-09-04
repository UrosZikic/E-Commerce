import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    const cartCurrent = localStorage.getItem("cart");
    return cartCurrent ? JSON.parse(cartCurrent) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync immediately
      return updatedCart;
    });
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (productName, productId) => productId !== id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync immediately
      return updatedCart;
    });
  };

  return { cart, addToCart, removeFromCart };
}
