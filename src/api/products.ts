import api from "./axiosClient";
import type { Product, PageResponse } from "../types";

// Obtener productos paginados
export const getProducts = async (page = 0): Promise<PageResponse<Product>> => {
  const res = await api.get(`/products?page=${page}`);
  return res.data;
};

// Crear producto
export const createProduct = async (
  product: Omit<Product, "id" | "deleted">,
) => {
  const res = await api.post("/products", product);
  return res.data;
};

// Actualizar producto
export const updateProduct = async (id: number, data: Partial<Product>) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

// Eliminar producto
export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};
