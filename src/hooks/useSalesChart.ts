import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export function useSalesChart() {
  const [data, setData] = useState<{ day: string; sales: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sales/daily");
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return { data, loading };
}
