import type { Movement } from "./movement";

export interface CustomerAccount {
  id: number;
  customerId: number;
  customerName?: string;
  balance: number;
  creditLimit: number;
  dueDate?: string;
  availableCredit?: number;
  movements?: Movement[];
}

export interface CustomerAccountRequest {
  customerId: number;
  balance: number;
  creditLimit: number;
  dueDate?: string;
}
