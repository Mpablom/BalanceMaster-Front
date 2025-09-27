import { useState } from "react";
import type {
  ProductRequestDTO,
  ProductResponseDTO,
} from "../../types/product";
import { Card, CardContent } from "../ui/card";

interface Props {
  product?: ProductResponseDTO;
  categories?: { id: number; name: string }[];
  onSubmit: (data: ProductRequestDTO) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  categories = [],
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState({
    barcode: product?.barcode ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    purchasePrice: product?.purchasePrice?.toString() ?? "",
    minStock: product?.minStock?.toString() ?? "",
    initialStock: product?.inventory?.quantity.toString() ?? "",
    categoryId: product?.category?.id?.toString() ?? "0",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.categoryId === "0") {
      alert("Debe seleccionar una categoría");
      return;
    }

    const dto: ProductRequestDTO = {
      barcode: form.barcode || undefined,
      name: form.name,
      description: form.description || undefined,
      purchasePrice: Number(form.purchasePrice) || 0,
      minStock: Number(form.minStock) || 0,
      initialStock: form.initialStock ? Number(form.initialStock) : undefined,
      categoryId: Number(form.categoryId),
    };

    onSubmit(dto);
  };
  return (
    <Card title={product ? "Editar producto" : "Nuevo producto"}>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código de barras */}
          <div>
            <label className="block text-lg text-gray-900 dark:text-gray-700">
              Código de barras
            </label>
            <input
              type="text"
              name="barcode"
              value={form.barcode ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-lg text-gray-900 dark:text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-lg text-gray-900 dark:text-gray-700">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
            />
          </div>

          {/* Precio compra */}
          <div>
            <label className="block text-lg text-gray-900 dark:text-gray-700">
              Precio compra
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={form.purchasePrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              min={0}
              step={0.01}
              required
            />
          </div>

          {/* Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-gray-900 dark:text-gray-700">
                Stock mínimo
              </label>
              <input
                type="number"
                name="minStock"
                value={form.minStock}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
                min={0}
              />
            </div>
            {!product && (
              <div>
                <label className="block text-lg text-gray-900 dark:text-gray-700">
                  Stock inicial
                </label>
                <input
                  type="number"
                  name="initialStock"
                  value={form.initialStock}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
                  min={0}
                />
              </div>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-lg text-gray-900 dark:text-gray-700">
              Categoría
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-purple-500 dark:bg-gray-200 dark:text-gray-700 h-10"
              required
            >
              <option value={0}>Seleccionar categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
            >
              {product ? "Actualizar" : "Crear"}
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
