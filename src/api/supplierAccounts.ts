import axiosClient from "./axiosClient";
import type {
  SupplierAccount,
  SupplierAccountRequest,
} from "../types/supplierAccount";

export async function listSupplierAccounts(): Promise<SupplierAccount[]> {
  const res = await axiosClient.get("/supplier-account");
  return res.data.content ?? res.data;
}

export async function createSupplierAccount(
  data: SupplierAccountRequest,
): Promise<SupplierAccount> {
  const res = await axiosClient.post("/supplier-account", data);
  return res.data;
}

export async function editSupplierAccount(
  id: number,
  data: SupplierAccountRequest,
): Promise<SupplierAccount> {
  const res = await axiosClient.put(`/supplier-account/${id}`, data);
  return res.data;
}

export async function deleteSupplierAccount(id: number): Promise<void> {
  await axiosClient.delete(`/supplier-account/${id}`);
}
