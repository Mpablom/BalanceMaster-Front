import { useState } from "react";
import type { Product } from "../types/product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (
    productData: Omit<Product, "id"> & {
      categoryId: number;
      initialStock: number;
    },
  ) => {
    const newProduct = await createProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = async (
    id: number,
    productData: Omit<Product, "id"> & { categoryId: number },
  ) => {
    const updated = await updateProduct(id, productData);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const removeProduct = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products,
    loading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
};
