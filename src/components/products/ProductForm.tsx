import { useState } from "react";
import type { Product } from "../../types/product";
import { Card, CardContent } from "../ui/card";

interface ProductFormData {
  barcode: string;
  name: string;
  description: string;
  purchasePrice: number | "";
  salePrice: number | "";
  minStock: number | "";
  initialStock: number | "";
  categoryId: number | "";
  deleted: boolean;
}

interface Props {
  product?: Product;
  categories?: { id: number; name: string }[];
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  categories = [],
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<ProductFormData>({
    barcode: product?.barcode ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    purchasePrice: product?.purchasePrice ?? "",
    salePrice: product?.salePrice ?? "",
    minStock: product?.minStock ?? "",
    initialStock: product?.inventory?.quantity ?? "",
    categoryId: product?.category?.id ?? 0,
    deleted: product?.deleted ?? false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "purchasePrice" ||
        name === "salePrice" ||
        name === "minStock" ||
        name === "initialStock" ||
        name === "categoryId"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categoryId === 0) {
      alert("Debe seleccionar una categoría");
      return;
    }

    const normalizedForm = {
      ...form,
      purchasePrice: form.purchasePrice === "" ? 0 : form.purchasePrice,
      salePrice: form.salePrice === "" ? 0 : form.salePrice,
      minStock: form.minStock === "" ? 0 : form.minStock,
      initialStock: form.initialStock === "" ? 0 : form.initialStock,
    };

    onSubmit(normalizedForm);
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
              value={form.barcode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
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
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
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
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
            />
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg text-gray-900 dark:text-gray-700">
                Precio compra
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={form.purchasePrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                           focus:border-purple-500 focus:ring-purple-500
                           dark:bg-gray-700 dark:text-white h-10"
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <label className="block text-lg text-gray-900 dark:text-gray-700">
                Precio venta
              </label>
              <input
                type="number"
                name="salePrice"
                value={form.salePrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                           focus:border-purple-500 focus:ring-purple-500
                           dark:bg-gray-700 dark:text-white h-10"
                min={0}
                step={0.01}
              />
            </div>
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
                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 shadow-lg
                           focus:border-purple-500 focus:ring-purple-500
                           dark:bg-gray-700 dark:text-white h-10"
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
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                             focus:border-purple-500 focus:ring-purple-500
                             dark:bg-gray-700 dark:text-white h-10"
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
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-lg
                         focus:border-purple-500 focus:ring-purple-500
                         dark:bg-gray-700 dark:text-white h-10"
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
