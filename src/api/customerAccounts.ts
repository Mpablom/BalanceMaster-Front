import axiosClient from "./axiosClient";
import type {
  CustomerAccount,
  CustomerAccountRequest,
} from "../types/customerAccount";

export async function listCustomerAccounts(): Promise<CustomerAccount[]> {
  const res = await axiosClient.get("/customer-accounts");
  return res.data.content ?? res.data;
}

export async function createCustomerAccount(
  data: CustomerAccountRequest,
): Promise<CustomerAccount> {
  const res = await axiosClient.post("/customer-accounts", data);
  return res.data;
}

export async function editCustomerAccount(
  id: number,
  data: CustomerAccountRequest,
): Promise<CustomerAccount> {
  const res = await axiosClient.put(`/customer-accounts/${id}`, data);
  return res.data;
}

export async function deleteCustomerAccount(id: number): Promise<void> {
  await axiosClient.delete(`/customer-accounts/${id}`);
}
