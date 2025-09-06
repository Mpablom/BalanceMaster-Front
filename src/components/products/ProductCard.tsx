import React from "react";
import { Card, CardContent } from "../ui/card";
import type { Product } from "../../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
        )}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            Compra: ${product.purchasePrice}
          </span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            Venta: ${product.salePrice}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Stock mínimo: {product.minStock}
        </div>
      </CardContent>
    </Card>
  );
}
