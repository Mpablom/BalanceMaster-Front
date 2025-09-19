import { useState, useEffect } from "react";
import type { Supplier } from "../types/supplier";
import {
  getSuppliers,
  addSupplier,
  editSupplier,
  removeSupplier,
} from "../api/suppliers";

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(data.content);
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplier: Omit<Supplier, "id">) => {
    const newSupplier = await addSupplier(supplier);
    setSuppliers((prev) => [...prev, newSupplier]);
  };

  const updateSupplier = async (id: number, supplier: Omit<Supplier, "id">) => {
    const updated = await editSupplier(id, supplier);
    setSuppliers((prev) => prev.map((s) => (s.id === id ? updated : s)));
  };

  const deleteSupplier = async (id: number) => {
    await removeSupplier(id);
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    fetchSuppliers,
    addSupplier: createSupplier,
    editSupplier: updateSupplier,
    removeSupplier: deleteSupplier,
  };
};
