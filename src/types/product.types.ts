/**
 * TIPOS DE PRODUCTO
 */

import type { Product } from './database.types';

export interface ProductFilters {
  category?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name';
  page?: number;
}

export interface CreateProductRequest {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price?: number;
  sizes: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
}

// Re-export Product interface
export type { Product };

