'use server';

import { revalidatePath } from 'next/cache';
import { getMongoDb } from '@/lib/mongodb';
import { ProductService } from '@/services/products.service';
import {
  createProductSchema,
  updateProductSchema,
  type CreateProductInput,
  type UpdateProductInput,
} from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import type { Product } from '@/types/database.types';

/**
 * Create a new product (admin)
 */
export async function createProduct(input: CreateProductInput): Promise<Product> {
  try {
    const validated = createProductSchema.parse(input);
    const db = await getMongoDb();
    const service = new ProductService(db);

    // Cast to Product omitting auto-generated fields
    const product = await service.createProduct(
      validated as Omit<Product, '_id' | 'createdAt' | 'updatedAt'>
    );
    revalidatePath(ROUTES.ADMIN_PRODUCTS);

    return product;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creando producto';
    throw new Error(message);
  }
}

/**
 * Update an existing product (admin)
 */
export async function updateProduct(productId: string, input: UpdateProductInput): Promise<Product> {
  try {
    const validated = updateProductSchema.parse(input);
    const db = await getMongoDb();
    const service = new ProductService(db);

    const product = await service.updateProduct(
      productId,
      validated as Partial<Omit<Product, '_id' | 'createdAt'>>
    );
    if (!product) throw new Error('Producto no encontrado');

    revalidatePath(ROUTES.ADMIN_PRODUCTS);
    revalidatePath(`${ROUTES.CATALOG}/${productId}`);

    return product;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando producto';
    throw new Error(message);
  }
}

/**
 * Deactivate a product (soft delete - admin)
 */
export async function deactivateProduct(productId: string): Promise<void> {
  try {
    const db = await getMongoDb();
    const service = new ProductService(db);

    await service.deactivateProduct(productId);
    revalidatePath(ROUTES.ADMIN_PRODUCTS);
    revalidatePath(ROUTES.CATALOG);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desactivando producto';
    throw new Error(message);
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const db = await getMongoDb();
    const service = new ProductService(db);
    return await service.getProductById(productId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo producto';
    throw new Error(message);
  }
}
