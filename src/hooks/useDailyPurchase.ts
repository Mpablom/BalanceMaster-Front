import { useState, useEffect } from "react";
import api from "../api/axiosClient";

interface DailyPurchase {
  day: string;
  total: number;
}

export function useDailyPurchases() {
  const [data, setData] = useState<DailyPurchase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDailyPurchases = async () => {
    setLoading(true);
    try {
      const res = await api.get<DailyPurchase[]>("/purchases/daily");
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyPurchases();
  }, []);

  return { data, loading };
}
