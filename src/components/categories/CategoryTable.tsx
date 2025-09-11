import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTable({ categories, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-left border-collapse rounded-lg shadow-lg overflow-hidden mt-6">
      <thead>
        <tr className="bg-purple-600 text-white">
          <th className="p-2">Nombre</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Margen %</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr
            key={c.id}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <td className="p-2 font-semibold">{c.name}</td>
            <td className="p-2">{c.description ?? "-"}</td>
            <td className="p-2">
              {c.marginPercentage != null ? `${c.marginPercentage}%` : "-"}
            </td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => onEdit(c)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
