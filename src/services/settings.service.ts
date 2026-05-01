/**
 * SERVICIO DE CONFIGURACIÓN GLOBAL
 * Settings singleton de la aplicación
 */

import { type Db } from 'mongodb';
import type { AppSettings } from '@/types/database.types';
import { DB_COLLECTIONS } from '@/constants/database.constants';
import { env } from '@/lib/env';

const SETTINGS_QUERY = { _id: 'global_settings' };

export class SettingsService {
  constructor(private db: Db) {}

  /**
   * Obtener configuración global (crea si no existe)
   */
  async getSettings(): Promise<AppSettings> {
    const collection = this.db.collection<AppSettings>(DB_COLLECTIONS.SETTINGS);

    const settings = await collection.findOne(SETTINGS_QUERY);

    if (settings) {
      return settings;
    }

    // Si no existe, crear
    const newSettings: AppSettings = {
      _id: 'global_settings',
      showPrices: true,
      whatsappUrl: env.public.whatsappUrl,
      instagramUrl: env.public.instagramUrl,
      facebookUrl: env.public.facebookUrl,
      adminEmail: env.admin.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newSettings);

    return newSettings;
  }

  /**
   * Actualizar configuración
   */
  async updateSettings(data: Partial<Omit<AppSettings, '_id' | 'createdAt'>>): Promise<AppSettings> {
    const collection = this.db.collection<AppSettings>(DB_COLLECTIONS.SETTINGS);

    const result = await collection.findOneAndUpdate(
      SETTINGS_QUERY,
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (result) {
      return result;
    }

    // Si no existe, crear y retornar
    return this.getSettings();
  }

  /**
   * Toggle de visibilidad de precios
   */
  async togglePriceVisibility(): Promise<boolean> {
    const settings = await this.getSettings();
    const newValue = !settings.showPrices;

    await this.updateSettings({ showPrices: newValue });

    return newValue;
  }

  /**
   * Verificar si los precios están visibles
   */
  async showPrices(): Promise<boolean> {
    const settings = await this.getSettings();
    return settings.showPrices;
  }
}
