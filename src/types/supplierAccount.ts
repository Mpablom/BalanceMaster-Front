import type { Movement } from "./movement";

export interface SupplierAccount {
  id: number;
  supplierId: number;
  supplierName?: string;
  balance: number;
  dueDate?: string;
  movements?: Movement[];
}

export interface SupplierAccountRequest {
  supplierId: number;
  balance: number;
  dueDate?: string;
}
