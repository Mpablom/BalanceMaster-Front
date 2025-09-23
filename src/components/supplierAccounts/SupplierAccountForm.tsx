import { useState } from "react";
import type { SupplierAccount } from "../../types/supplierAccount";
import type { Supplier } from "../../types/supplier";
import { Card, CardContent } from "../ui/card";

interface Props {
  account?: SupplierAccount;
  suppliers: Supplier[];
  loadingSuppliers: boolean;
  onSubmit: (data: Omit<SupplierAccount, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function SupplierAccountForm({
  account,
  suppliers,
  loadingSuppliers,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Omit<SupplierAccount, "id">>({
    supplierId: account?.supplierId ?? 0,
    balance: account?.balance ?? 0,
    dueDate: account?.dueDate ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "balance" || name === "creditLimit"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.supplierId === 0) {
      alert("Debes seleccionar un proveedor válido");
      return;
    }
    await onSubmit(form);
  };

  return (
    <Card
      title={
        account ? "Editar cuenta de proveedor" : "Nueva cuenta de proveedor"
      }
    >
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Proveedor
            </label>
            <select
              name="supplierId"
              value={form.supplierId}
              onChange={handleChange}
              disabled={loadingSuppliers}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            >
              <option value={0}>
                {loadingSuppliers
                  ? "Cargando proveedores..."
                  : "Seleccionar proveedor"}
              </option>
              {suppliers.length === 0 && !loadingSuppliers ? (
                <option disabled>No hay proveedores disponibles</option>
              ) : (
                suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              value={form.balance}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {account ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600
                         text-gray-900 dark:text-white px-4 py-2 rounded shadow"
            >
              Cancelar
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
