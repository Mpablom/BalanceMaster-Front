export interface Supplier {
  id: number;
  name: string;
  phone?: string;
  email?: string;
}

export interface SupplierPage {
  content: Supplier[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
