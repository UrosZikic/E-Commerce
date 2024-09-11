import { useState, useEffect } from "react";

export function useOrders() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/php/orderApi.php");
        if (!response.ok) {
          throw new Error("Error 404");
        }
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { orderData, loading, error };
}
