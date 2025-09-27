import type { PaymentMethod } from "./paymentMethod";
import type {
  TransactionItemRequestDTO,
  TransactionItemResponseDTO,
} from "./transactionItem";

export interface SaleRequestDTO {
  customerId?: number;
  items: TransactionItemRequestDTO[];
  paymentMothod: PaymentMethod;
  amountPaid: number;
}

export interface SaleResponsetDTO {
  id: string;
  customerId?: number;
  date: string;
  items: TransactionItemResponseDTO[];
  paymentMethod: PaymentMethod;
  amountPaid: number;
  completed: boolean;
  total: number;
}

export interface DailySalesDTO {
  day: string;
  sales: number;
}
