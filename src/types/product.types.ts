/**
 * TIPOS DE PRODUCTO
 */

import type { Product } from './database.types';

export interface ProductFilters {
  search?: string; // búsqueda por nombre/descripción
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name';
  page?: number;
  pageSize?: number;
  showHidden?: boolean; // para admin, mostrar productos inactivos
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
  hasNextPage: boolean;
}

export interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  basePrice?: number;
  discountPrice?: number;
  showPrice: boolean;
}

// Re-export Product interface
export type { Product };

