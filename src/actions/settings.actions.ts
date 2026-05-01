'use server';

import { revalidatePath } from 'next/cache';
import { getMongoDb } from '@/lib/mongodb';
import { SettingsService } from '@/services/settings.service';
import {
  updateSettingsSchema,
  type UpdateSettingsInput,
} from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import type { AppSettings } from '@/types/database.types';

/**
 * Get current global settings
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const db = await getMongoDb();
    const service = new SettingsService(db);
    const settings = await service.getSettings();

    if (!settings) {
      throw new Error('Configuración no disponible');
    }

    return settings;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo configuración';
    throw new Error(message);
  }
}

/**
 * Update global settings (admin)
 */
export async function updateSettings(input: UpdateSettingsInput): Promise<AppSettings> {
  try {
    const validated = updateSettingsSchema.parse(input);
    const db = await getMongoDb();
    const service = new SettingsService(db);

    const settings = await service.updateSettings(
      validated as Partial<Omit<AppSettings, '_id' | 'createdAt'>>
    );

    if (!settings) {
      throw new Error('Error actualizando configuración');
    }

    // Revalidate entire site since settings affect price visibility globally
    revalidatePath(ROUTES.CATALOG);
    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.ADMIN_SETTINGS);

    return settings;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando configuración';
    throw new Error(message);
  }
}

/**
 * Toggle price visibility (admin shortcut)
 */
export async function togglePriceVisibility(): Promise<AppSettings> {
  try {
    const db = await getMongoDb();
    const service = new SettingsService(db);

    const current = await service.getSettings();
    if (!current) {
      throw new Error('Configuración no disponible');
    }

    const settings = await service.updateSettings({
      showPrices: !current.showPrices,
    });

    if (!settings) {
      throw new Error('Error actualizando visibilidad de precios');
    }

    revalidatePath(ROUTES.CATALOG);
    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.ADMIN_SETTINGS);

    return settings;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando visibilidad de precios';
    throw new Error(message);
  }
}

/**
 * Show all prices (admin convenience)
 */
export async function showAllPrices(): Promise<AppSettings> {
  try {
    const db = await getMongoDb();
    const service = new SettingsService(db);

    const settings = await service.updateSettings({
      showPrices: true,
    });

    if (!settings) {
      throw new Error('Error mostrando precios');
    }

    revalidatePath(ROUTES.CATALOG);
    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.ADMIN_SETTINGS);

    return settings;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error mostrando precios';
    throw new Error(message);
  }
}

/**
 * Hide all prices (admin convenience)
 */
export async function hideAllPrices(): Promise<AppSettings> {
  try {
    const db = await getMongoDb();
    const service = new SettingsService(db);

    const settings = await service.updateSettings({
      showPrices: false,
    });

    if (!settings) {
      throw new Error('Error ocultando precios');
    }

    revalidatePath(ROUTES.CATALOG);
    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.ADMIN_SETTINGS);

    return settings;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error ocultando precios';
    throw new Error(message);
  }
}
