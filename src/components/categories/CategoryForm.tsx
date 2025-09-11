import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import type { Category } from "../../types/category";

interface Props {
  category?: Category;
  onSubmit: (data: Omit<Category, "id">) => void;
  onCancel: () => void;
}

export default function CategoryForm({ category, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Category, "id">>({
    name: category?.name ?? "",
    description: category?.description ?? "",
    marginPercentage: category?.marginPercentage ?? undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "marginPercentage" ? Number(value) : value,
    }));
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
    <Card title={category ? "Editar categoría" : "Nueva categoría"}>
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
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-gray-700 font-semibold">
              Margen de ganancia (%)
            </label>
            <input
              type="number"
              name="marginPercentage"
              value={form.marginPercentage ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {category ? "Actualizar" : "Crear"}
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
