import { Edit, Trash } from "lucide-react";
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
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 font-medium">{supplier.name}</td>
                <td className="px-4 py-2">{supplier.phone ?? "-"}</td>
                <td className="px-4 py-2">{supplier.email ?? "-"}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(supplier)}
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(supplier.id)}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-500 italic"
              >
                No hay proveedores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
