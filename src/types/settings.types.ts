/**
 * TIPOS DE CONFIGURACIÓN Y SETTINGS
 */

import type { AppSettings } from './database.types';

export interface UpdateSettingsRequest {
  showPrices?: boolean;
  whatsappUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  adminEmail?: string;
}

export interface SettingsResponse {
  success: boolean;
  settings?: AppSettings;
  message?: string;
  error?: string;
}

// Re-export
export type { AppSettings };
