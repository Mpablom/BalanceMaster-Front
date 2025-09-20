import { useEffect, useState } from "react";
import type { Customer } from "../types/customer";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const list: Customer[] = Array.isArray(res.data)
        ? res.data
        : (res.data.content ?? []);
      setCustomers(list);
    } catch (err) {
      console.error("Error cargando clientes", err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async (customer: Omit<Customer, "id">) => {
    try {
      await axios.post(API_URL, customer, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchCustomers();
    } catch (err) {
      console.error("Error al crear cliente", err);
    }
  };

  const editCustomer = async (id: number, customer: Omit<Customer, "id">) => {
    try {
      await axios.put(`${API_URL}/${id}`, customer, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchCustomers();
    } catch (err) {
      console.error("Error al editar cliente", err);
    }
  };

  const removeCustomer = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar cliente", err);
    }
  };

  return {
    customers,
    loading,
    fetchCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
}
