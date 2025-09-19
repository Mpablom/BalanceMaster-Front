import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import type { Supplier } from "../../types/supplier";

interface Props {
  supplier?: Supplier;
  onSubmit: (data: Omit<Supplier, "id">) => void;
  onCancel: () => void;
}

export default function SupplierForm({ supplier, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Supplier, "id">>({
    name: supplier?.name ?? "",
    phone: supplier?.phone ?? "",
    email: supplier?.email ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      alert("El nombre es obligatorio");
      return;
    }
    onSubmit(form);
  };

  return (
    <Card title={supplier ? "Editar proveedor" : "Nuevo proveedor"}>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {supplier ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded shadow"
            >
              Cancelar
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
