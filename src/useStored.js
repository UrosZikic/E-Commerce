import { useCart } from "./useCart";
import { useProducts } from "./useProducts";
import { useState, useEffect } from "react";

export function useStored() {
  const { data } = useProducts();
  const { cart } = useCart();
  const [stored, setStored] = useState([]);

  useEffect(() => {
    if (data) {
      const storage = [];
      for (let i = 0; i < cart.length; i++) {
        storage.push(data[cart[i] - 1]);
      }
      setStored(storage);
    }
  }, [cart, data]);

  return { stored };
}
