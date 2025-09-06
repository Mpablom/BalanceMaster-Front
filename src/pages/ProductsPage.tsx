import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
import type { Product } from "../types/product";

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
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Product, "id">) => {
    if (editing) await editProduct(editing.id, data);
    else await addProduct(data);
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
        Productos
      </h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {!showForm && (
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

          {showForm && (
            <ProductForm
              initialData={editing ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
