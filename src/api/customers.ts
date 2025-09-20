import axiosClient from "./axiosClient";
import type { Customer } from "../types/customer";

export const listCustomers = async (): Promise<Customer[]> => {
  const { data } = await axiosClient.get("/customers");
  return data;
};

export const getCustomer = async (id: number): Promise<Customer> => {
  const { data } = await axiosClient.get(`/customers/${id}`);
  return data;
};

export const createCustomer = async (
  customer: Omit<Customer, "id">,
): Promise<Customer> => {
  const { data } = await axiosClient.post("/customers", customer);
  return data;
};

export const updateCustomer = async (
  id: number,
  customer: Omit<Customer, "id">,
): Promise<Customer> => {
  const { data } = await axiosClient.put(`/customers/${id}`, customer);
  return data;
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await axiosClient.delete(`/customers/${id}`);
};
