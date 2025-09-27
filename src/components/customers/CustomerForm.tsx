import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import type { Customer } from "../../types/customer";

interface Props {
  customer?: Customer;
  onSubmit: (data: Omit<Customer, "id">) => void;
  onCancel: () => void;
}

export default function CustomerForm({ customer, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState({
    name: customer?.name ?? "",
    contactInfo: customer?.contactInfo ?? "",
    creditLimit: customer?.creditLimit?.toString() ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      alert("El nombre es obligatorio");
      return;
    }
    onSubmit({
      ...form,
      creditLimit: Number(form.creditLimit),
    });
  };

  return (
    <Card title={customer ? "Editar cliente" : "Nuevo cliente"}>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500
                         dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            />
          </div>

          {/* Contacto */}
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Contacto
            </label>
            <input
              type="text"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500
                         dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          {/* Límite de crédito */}
          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Límite de crédito
            </label>
            <input
              type="number"
              name="creditLimit"
              value={form.creditLimit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-purple-500
                         dark:bg-gray-200 dark:text-gray-700 h-10"
              min={0}
              step={0.01}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {customer ? "Actualizar" : "Crear"}
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
