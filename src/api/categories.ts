import api from "./axiosClient";
import type { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};
