import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export function usePurchasesChart() {
  const [data, setData] = useState<{ day: string; sales: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await api.get("/purchases/daily");
      const formatted = res.data.map((p: { day: string; amount: number }) => ({
        day: p.day,
        sales: p.amount,
      }));
      setData(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return { data, loading };
}
