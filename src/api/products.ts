import axiosClient from "./axiosClient";
import type { Product } from "../types/product";

export const getProducts = async (page = 0, size = 20) => {
  const res = await axiosClient.get(`/products?page=${page}&size=${size}`);
  return res.data; // contiene { content, totalPages, ... }
};

export const getProductById = async (id: number) => {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const res = await axiosClient.post("/products", product);
  return res.data;
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, "id">,
) => {
  const res = await axiosClient.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axiosClient.delete(`/products/${id}`);
  return res.data;
};
