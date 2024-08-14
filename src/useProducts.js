import { useState, useEffect } from "react";

export function useProducts() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/php/api.php");
        if (!response.ok) {
          throw new Error("Error 404");
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { data: productData, loading, error };
}
