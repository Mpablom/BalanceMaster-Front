export interface Product {
  id: number;
  barcode?: string | null;
  name: string;
  description?: string | null;
  purchasePrice: number;
  salePrice: number;
  minStock: number;
  deleted: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
