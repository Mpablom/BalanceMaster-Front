import type { Product } from "../../types/product";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="grid gap-4 sm:hidden">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-100 dark:bg-gray-200 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-purple-700 dark:text-purple-400">
                {p.name}
              </span>
              <span
                className={`text-sm font-semibold ${
                  p.inventory?.quantity === p.minStock
                    ? "text-red-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {p.inventory?.quantity ?? 0} en stock
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>Código: {p.barcode ?? "-"}</p>
              <p>Compra: ${p.purchasePrice}</p>
              <p>Venta: ${p.salePrice}</p>
              <p>Stock mínimo: {p.minStock}</p>
              <p>Categoría: {p.category?.name ?? "Sin categoría"}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-lg shadow-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2">Nombre</th>
              <th className="p-2">Código</th>
              <th className="p-2">Precio Compra</th>
              <th className="p-2">Precio Venta</th>
              <th className="p-2">Stock actual</th>
              <th className="p-2">Stock mínimo</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={`${
                  p.inventory?.quantity === p.minStock ? "text-red-600" : ""
                } bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.barcode ?? "-"}</td>
                <td className="p-2">${p.purchasePrice}</td>
                <td className="p-2">${p.salePrice}</td>
                <td className="p-2">{p.inventory?.quantity ?? 0}</td>
                <td className="p-2">{p.minStock}</td>
                <td className="p-2">{p.category?.name ?? "Sin categoría"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
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
