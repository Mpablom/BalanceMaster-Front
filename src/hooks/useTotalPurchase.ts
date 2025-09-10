import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export function useTotalPurchases() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTotal = async () => {
    setLoading(true);
    try {
      const res = await api.get("/purchases/total");
      setTotal(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return { total, loading };
}
