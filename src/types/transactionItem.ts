import type { ProductResponseDTO } from "./product";

export interface TransactionItemRequestDTO {
  productId: number;
  amount: number;
  unitPrice: number;
  unitCost?: number;
}

export interface TransactionItemResponseDTO {
  id: number;
  product: ProductResponseDTO;
  amount: number;
  unitCost: number;
  unitPrice: number;
  subtotal: number;
}
