import { useState } from "react";
import type { SupplierAccount } from "../../types/supplierAccount";
import type { Supplier } from "../../types/supplier";
import { Card, CardContent } from "../ui/card";

interface Props {
  account?: SupplierAccount;
  suppliers: Supplier[];
  onSubmit: (data: Omit<SupplierAccount, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function SupplierAccountForm({
  account,
  suppliers,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState({
    supplierId: account?.supplierId ?? 0,
    balance: account?.balance ?? 0,
    dueDate: account?.dueDate ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "supplierId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.supplierId === 0) {
      alert("Debe seleccionar un proveedor");
      return;
    }
    onSubmit(form);
  };

  return (
    <Card title={account ? "Editar cuenta" : "Nueva cuenta"}>
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            >
              <option value={0}>Seleccionar proveedor</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
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
              Vencimiento
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
