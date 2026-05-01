/**
 * TIPOS DE GALERÍA
 */

import type { GalleryItem } from './database.types';

export interface CreateGalleryItemRequest {
  imageUrl: string;
  description: string;
  category: string;
}

export interface UpdateGalleryItemRequest extends Partial<CreateGalleryItemRequest> {
  isActive?: boolean;
}

export interface GalleryListResponse {
  data: GalleryItem[];
  total: number;
}

// Re-export
export type { GalleryItem };
