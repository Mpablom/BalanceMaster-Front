import { Card, CardContent } from "../ui/card";
import type { ProductResponseDTO } from "../../types/product";

interface Props {
  product: ProductResponseDTO;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card title={product.name}>
      <CardContent>
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {product.description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            Compra: ${product.purchasePrice}
          </span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            Venta: ${product.salePrice}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Stock actual: {product.inventory?.quantity ?? 0}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Categoría: {product.category?.name ?? "Sin categoría"}
        </div>
      </CardContent>
    </Card>
  );
}
