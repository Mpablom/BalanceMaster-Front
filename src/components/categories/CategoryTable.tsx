import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTable({ categories, onEdit, onDelete }: Props) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="grid gap-4 sm:hidden">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-gray-100 dark:bg-gray-200 p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-purple-700 dark:text-purple-800">
                {c.name}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>Descripción: {c.description ?? "-"}</p>
              <p>
                Margen:{" "}
                {c.marginPercentage != null
                  ? `${(c.marginPercentage * 100).toFixed(1)}%`
                  : "-"}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
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
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden sm:block overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse rounded-lg shadow-2xl">
          <thead>
            <tr className="bg-purple-900 text-white">
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
                className="bg-[#f1f1f1] hover:bg-gray-300 text-gray-900"
              >
                <td className="p-2 font-semibold">{c.name}</td>
                <td className="p-2">{c.description ?? "-"}</td>
                <td className="p-2">
                  {c.marginPercentage != null
                    ? `${(c.marginPercentage * 100).toFixed(1)}%`
                    : "-"}
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
      </div>
    </>
  );
}
