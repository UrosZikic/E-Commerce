import { useState, useEffect } from "react";

export function useReviews() {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/php/reviewsApi.php");
        if (!response.ok) {
          throw new Error("Error 404");
        }
        const data = await response.json();
        setReviewData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { reviewData };
}
