import { useState } from "react";
import type { Customer } from "../types/customer";

const API_URL = "http://localhost:8080/api/customers";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCustomers(data.content ?? data);
    } catch (err) {
      console.error("Error cargando clientes", err);
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customer: Omit<Customer, "id">) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (!res.ok) throw new Error("Error al crear cliente");
      await fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const editCustomer = async (id: number, customer: Omit<Customer, "id">) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (!res.ok) throw new Error("Error al editar cliente");
      await fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const removeCustomer = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
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
