import { useState, useEffect } from "react";
import api from "../api/axiosClient";
import type { Product } from "../types/product";

export function useLowStock() {
  const [items, setItems] = useState<{ name: string; stock: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLowStock = async () => {
    setLoading(true);
    try {
      const res = await api.get<Product[] | { content: Product[] }>(
        "/products",
      );

      const products: Product[] = Array.isArray(res.data)
        ? res.data
        : res.data.content;

      const lowStock = products
        .filter((p) => (p.inventory?.quantity ?? 0) <= (p.minStock ?? 0))
        .map((p) => ({
          name: p.name,
          stock: p.inventory?.quantity ?? 0,
        }));

      setItems(lowStock);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return { items, loading };
}
