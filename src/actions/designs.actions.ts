'use server';

import { revalidatePath } from 'next/cache';
import { getMongoDb } from '@/lib/mongodb';
import { DesignService } from '@/services/designs.service';
import {
  createDesignSchema,
  updateDesignSchema,
  type CreateDesignInput,
  type UpdateDesignInput,
} from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import type { PredefinedDesign } from '@/types/database.types';

/**
 * Create a new predefined design (admin)
 */
export async function createDesign(input: CreateDesignInput): Promise<PredefinedDesign> {
  try {
    const validated = createDesignSchema.parse(input);
    const db = await getMongoDb();
    const service = new DesignService(db);

    const design = await service.createDesign(
      validated as Omit<PredefinedDesign, '_id' | 'createdAt' | 'updatedAt'>
    );
    revalidatePath(ROUTES.ADMIN_DESIGNS);

    return design;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creando diseño';
    throw new Error(message);
  }
}

/**
 * Update an existing design (admin)
 */
export async function updateDesign(designId: string, input: UpdateDesignInput): Promise<PredefinedDesign> {
  try {
    const validated = updateDesignSchema.parse(input);
    const db = await getMongoDb();
    const service = new DesignService(db);

    const design = await service.updateDesign(
      designId,
      validated as Partial<Omit<PredefinedDesign, '_id' | 'createdAt'>>
    );
    if (!design) throw new Error('Diseño no encontrado');

    revalidatePath(ROUTES.ADMIN_DESIGNS);

    return design;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando diseño';
    throw new Error(message);
  }
}

/**
 * Deactivate a design (soft delete - admin)
 */
export async function deactivateDesign(designId: string): Promise<void> {
  try {
    const db = await getMongoDb();
    const service = new DesignService(db);

    await service.deactivateDesign(designId);
    revalidatePath(ROUTES.ADMIN_DESIGNS);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desactivando diseño';
    throw new Error(message);
  }
}

/**
 * Get a single design by ID
 */
export async function getDesignById(designId: string): Promise<PredefinedDesign | null> {
  try {
    const db = await getMongoDb();
    const service = new DesignService(db);
    return await service.getDesignById(designId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo diseño';
    throw new Error(message);
  }
}
