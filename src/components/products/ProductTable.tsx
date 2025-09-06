import type { Product } from "../../types/product";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-left border-collapse rounded shadow overflow-hidden mt-6">
      <thead>
        <tr className="bg-purple-600 text-white">
          <th className="p-2">Nombre</th>
          <th className="p-2">Código</th>
          <th className="p-2">Precio Compra</th>
          <th className="p-2">Precio Venta</th>
          <th className="p-2">Stock mínimo</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr
            key={p.id}
            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.barcode}</td>
            <td className="p-2">${p.purchasePrice}</td>
            <td className="p-2">${p.salePrice}</td>
            <td className="p-2">{p.minStock}</td>
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
  );
}
