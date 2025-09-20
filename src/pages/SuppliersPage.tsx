import { useState, useEffect } from "react";
import SupplierForm from "../components/suppliers/SupplierForm";
import SupplierTable from "../components/suppliers/SupplierTable";
import { useSuppliers } from "../hooks/useSuppliers";
import type { Supplier } from "../types/supplier";

export default function SuppliersPage() {
  const {
    suppliers,
    fetchSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
    loading,
  } = useSuppliers();
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAdd = () => {
    setEditingSupplier(null);
    setShowForm(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Supplier, "id">) => {
    if (editingSupplier) {
      await editSupplier(editingSupplier.id, data);
    } else {
      await addSupplier(data);
    }
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSupplier(null);
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;

  return (
    <div className="rounded-lg px-4 py-6 min-h-screen bg-transparent">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Proveedores
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            + Nuevo proveedor
          </button>
        )}
      </header>

      {showForm ? (
        <SupplierForm
          supplier={editingSupplier ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <SupplierTable
          suppliers={suppliers}
          onEdit={handleEdit}
          onDelete={removeSupplier}
        />
      )}
    </div>
  );
}
