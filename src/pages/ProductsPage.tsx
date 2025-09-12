import { useState, useEffect } from "react";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
import type { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

export default function ProductsPage() {
  const {
    products,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
    loading,
  } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();

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

  const handleSubmit = async (
    data: Omit<Product, "id"> & { categoryId: number; initialStock?: number },
  ) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
    } else {
      await addProduct({ ...data, initialStock: data.initialStock ?? 0 });
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading || loadingCategories) return <p>Cargando...</p>;

  return (
    <div className="rounded-lg px-4 py-6 min-h-screen bg-transparent">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Productos
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            + Nuevo producto
          </button>
        )}
      </header>

      {showForm ? (
        <ProductForm
          product={editingProduct ?? undefined}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={removeProduct}
        />
      )}
    </div>
  );
}
