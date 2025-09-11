import { useEffect, useState } from "react";
import CategoryForm from "../components/categories/CategoryForm";
import CategoryTable from "../components/categories/CategoryTable";
import { useCategories } from "../hooks/useCategories";
import type { Category } from "../types/category";

export default function CategoriesPage() {
  const {
    categories,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    loading,
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Category, "id">) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, data);
    } else {
      await addCategory(data);
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;

  return (
    <div className="rounded-lg p-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Categorías
        </h1>
      </header>

      {showForm ? (
        <CategoryForm
          category={editingCategory ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <button
            onClick={handleAdd}
            className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            + Nueva categoría
          </button>
          <CategoryTable
            categories={categories}
            onEdit={handleEdit}
            onDelete={removeCategory}
          />
        </>
      )}
    </div>
  );
}
