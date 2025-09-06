import React, { useState } from "react";
import { useProducts, useCreateProduct } from "../hooks/useProducts";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useProducts(page);
  const createProduct = useCreateProduct();

  const handleAddProduct = async () => {
    const name = prompt("Nombre del producto?");
    const barcode = prompt("Código de barras (opcional)?");
    const description = prompt("Descripción (opcional)?");
    const purchasePrice = Number(prompt("Precio de compra?"));
    const salePrice = Number(prompt("Precio de venta?"));
    const minStock = Number(prompt("Stock mínimo?"));

    if (!name || isNaN(purchasePrice) || isNaN(salePrice) || isNaN(minStock)) {
      alert("Datos inválidos");
      return;
    }

    await createProduct.mutateAsync({
      name,
      barcode: barcode || null,
      description: description || null,
      purchasePrice,
      salePrice,
      minStock,
    });
  };

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error cargando productos</p>;

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={handleAddProduct}>Agregar Producto</button>
      <ul>
        {data?.content.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <br />
            Código: {product.barcode ?? "—"}
            <br />
            Compra: ${product.purchasePrice} | Venta: ${product.salePrice}
            <br />
            Stock mínimo: {product.minStock}
          </li>
        ))}
      </ul>

      <div>
        <button
          disabled={page === 0}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          Anterior
        </button>
        <span>
          Página {data?.number + 1} de {data?.totalPages}
        </span>
        <button
          disabled={page + 1 >= (data?.totalPages || 0)}
          onClick={() => setPage((old) => old + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
