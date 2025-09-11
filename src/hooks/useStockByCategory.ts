import { useMemo } from "react";
import type { Product, Category } from "../types/product";

export function useStockByCategory(
  products: Product[],
  categories: Category[],
) {
  return useMemo(() => {
    if (!products || !categories) return [];

    return categories.map((c) => ({
      name: c.name,
      value: products
        .filter((p) => p.category?.id === c.id && p.inventory)
        .reduce((acc, p) => acc + (p.inventory!.quantity ?? 0), 0),
    }));
  }, [products, categories]);
}
