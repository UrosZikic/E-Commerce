import { useState, useEffect } from "react";

export function useProfiles() {
  const [dataProfile, setDataProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/php/userApi.php");
        if (!response.ok) {
          throw new Error("Error 404");
        }
        const data = await response.json();
        setDataProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { dataProfile, loading, error };
}
