import api from "./axiosClient";
import type { Supplier, SupplierPage } from "../types/supplier";

export const getSuppliers = async (): Promise<SupplierPage> => {
  const res = await api.get<SupplierPage>("/supplier");
  return res.data;
};

export const addSupplier = async (
  data: Omit<Supplier, "id">,
): Promise<Supplier> => {
  const res = await api.post<Supplier>("/supplier", data);
  return res.data;
};

export const editSupplier = async (
  id: number,
  data: Omit<Supplier, "id">,
): Promise<Supplier> => {
  const res = await api.put<Supplier>(`/supplier/${id}`, data);
  return res.data;
};

export const removeSupplier = async (id: number): Promise<void> => {
  await api.delete(`/supplier/${id}`);
};
