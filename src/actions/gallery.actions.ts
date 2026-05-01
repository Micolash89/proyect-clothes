'use server';

import { revalidatePath } from 'next/cache';
import { getMongoDb } from '@/lib/mongodb';
import { GalleryService } from '@/services/gallery.service';
import {
  createGalleryItemSchema,
  updateGalleryItemSchema,
  type CreateGalleryItemInput,
  type UpdateGalleryItemInput,
} from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import type { GalleryItem } from '@/types/database.types';

/**
 * Create a new gallery item (admin)
 */
export async function createGalleryItem(input: CreateGalleryItemInput): Promise<GalleryItem> {
  try {
    const validated = createGalleryItemSchema.parse(input);
    const db = await getMongoDb();
    const service = new GalleryService(db);

    const item = await service.createGalleryItem(
      validated as Omit<GalleryItem, '_id' | 'createdAt' | 'updatedAt'>
    );
    revalidatePath(ROUTES.ADMIN_GALLERY);

    return item;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creando item de galería';
    throw new Error(message);
  }
}

/**
 * Update an existing gallery item (admin)
 */
export async function updateGalleryItem(itemId: string, input: UpdateGalleryItemInput): Promise<GalleryItem> {
  try {
    const validated = updateGalleryItemSchema.parse(input);
    const db = await getMongoDb();
    const service = new GalleryService(db);

    const item = await service.updateGalleryItem(
      itemId,
      validated as Partial<Omit<GalleryItem, '_id' | 'createdAt'>>
    );
    if (!item) throw new Error('Item de galería no encontrado');

    revalidatePath(ROUTES.ADMIN_GALLERY);
    revalidatePath(ROUTES.GALLERY);

    return item;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando item';
    throw new Error(message);
  }
}

/**
 * Deactivate a gallery item (soft delete - admin)
 */
export async function deactivateGalleryItem(itemId: string): Promise<void> {
  try {
    const db = await getMongoDb();
    const service = new GalleryService(db);

    await service.deactivateGalleryItem(itemId);
    revalidatePath(ROUTES.ADMIN_GALLERY);
    revalidatePath(ROUTES.GALLERY);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desactivando item';
    throw new Error(message);
  }
}

/**
 * Get a single gallery item by ID
 */
export async function getGalleryItemById(itemId: string): Promise<GalleryItem | null> {
  try {
    const db = await getMongoDb();
    const service = new GalleryService(db);
    return await service.getGalleryItemById(itemId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo item';
    throw new Error(message);
  }
}
