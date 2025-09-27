export interface Inventory {
  productName: string;
  quantity: number;
  lastUpdated: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  marginPercentage?: number;
}

export interface ProductResponseDTO {
  id: number;
  barcode?: string | null;
  name: string;
  description?: string | null;
  purchasePrice: number;
  salePrice: number;
  minStock: number;
  deleted?: boolean;
  inventory?: Inventory;
  category?: Category;
}

export interface ProductRequestDTO {
  barcode?: string | null;
  name: string;
  description?: string | null;
  purchasePrice: number;
  minStock: number;
  initialStock?: number;
  categoryId?: number;
}
