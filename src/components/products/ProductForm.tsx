import React, { useState } from "react";
import type { Product } from "../../types/product";

interface Props {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    barcode: initialData?.barcode || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    purchasePrice: initialData?.purchasePrice || 0,
    salePrice: initialData?.salePrice || 0,
    minStock: initialData?.minStock || 0,
    deleted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name.includes("Price") || name === "minStock" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow-lg max-w-md mx-auto mt-6"
    >
      <label>Código de barras</label>
      <input
        type="text"
        name="barcode"
        placeholder="Código de barras"
        value={form.barcode}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />
      <label>Nombre</label>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />
      <label>Descripción</label>
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />
      <label>Precio de compra</label>
      <input
        type="number"
        name="purchasePrice"
        placeholder="Precio compra"
        value={form.purchasePrice}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />
      <label>Precio de venta</label>
      <input
        type="number"
        name="salePrice"
        placeholder="Precio venta"
        value={form.salePrice}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />
      <label>Stock minimo</label>
      <input
        type="number"
        name="minStock"
        placeholder="Stock mínimo"
        value={form.minStock}
        onChange={handleChange}
        className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
