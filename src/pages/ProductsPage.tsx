import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
import type { Product } from "../types/product";
import ThemeToggle from "../components/ThemeToggle";

export default function ProductsPage() {
  const {
    products,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
    loading,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Product, "id">) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="rounded-lg p-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Productos
        </h1>
        <ThemeToggle />
      </header>

      {loading && !showForm ? (
        <p>Cargando...</p>
      ) : (
        <>
          {showForm ? (
            <ProductForm
              initialData={editingProduct ?? undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <button
                onClick={handleAdd}
                className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                + Nuevo producto
              </button>
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={removeProduct}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
