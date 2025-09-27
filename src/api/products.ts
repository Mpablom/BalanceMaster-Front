import axiosClient from "./axiosClient";
import type { ProductResponseDTO, ProductRequestDTO } from "../types/product";

export const getProducts = async (
  page = 0,
  size = 20,
): Promise<ProductResponseDTO[]> => {
  const res = await axiosClient.get(`/products?page=${page}&size=${size}`);
  return res.data;
};

export const getProductById = async (
  id: number,
): Promise<ProductResponseDTO> => {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (
  product: ProductRequestDTO,
): Promise<ProductResponseDTO> => {
  const res = await axiosClient.post("/products", product);
  return res.data;
};

export const updateProduct = async (
  id: number,
  product: ProductRequestDTO,
): Promise<ProductResponseDTO> => {
  const res = await axiosClient.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};
