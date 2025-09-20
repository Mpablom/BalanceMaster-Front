import type { Supplier } from "../../types/supplier";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}: SupplierTableProps) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="sm:hidden space-y-4">
        {suppliers.map((s) => (
          <div
            key={s.id}
            className="bg-[#f1f1f1] rounded-xl p-4 shadow-md flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <span className="text-sm text-gray-500">{s.phone ?? "-"}</span>
            </div>
            <div className="text-sm space-y-1">
              <p>Email: {s.email ?? "-"}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(s)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(s.id)}
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
              <th className="p-2">Teléfono</th>
              <th className="p-2">Email</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr
                key={s.id}
                className="bg-[#f1f1f1] hover:bg-gray-300 text-gray-900"
              >
                <td className="p-2 font-semibold">{s.name}</td>
                <td className="p-2">{s.phone ?? "-"}</td>
                <td className="p-2">{s.email ?? "-"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
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
