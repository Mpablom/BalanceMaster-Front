import type { Product } from "../types";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded p-2 shadow-sm mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
