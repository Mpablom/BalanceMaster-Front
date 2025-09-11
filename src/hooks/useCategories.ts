import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Omit<Category, "id">) => {
    const newCategory = await createCategory(category);
    setCategories((prev) => [...prev, newCategory]);
  };

  const editCategory = async (id: number, category: Omit<Category, "id">) => {
    const updated = await updateCategory(id, category);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const removeCategory = async (id: number) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
}
