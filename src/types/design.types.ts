/**
 * TIPOS DE DISEÑOS PREDEFINIDOS
 */

import type { PredefinedDesign } from './database.types';

export interface CreateDesignRequest {
  name: string;
  category: string;
  imageUrl: string;
}

export interface UpdateDesignRequest extends Partial<CreateDesignRequest> {
  isActive?: boolean;
}

export interface DesignListResponse {
  data: PredefinedDesign[];
  total: number;
}

// Re-export
export type { PredefinedDesign };
