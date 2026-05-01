/**
 * SERVICIO DE GALERÍA
 * CRUD de trabajos anteriores/portfolio
 */

import { ObjectId, type Db } from 'mongodb';
import type { GalleryItem } from '@/types/database.types';
import { DB_COLLECTIONS } from '@/constants/database.constants';

export class GalleryService {
  constructor(private db: Db) {}

  /**
   * Crear item de galería
   */
  async createGalleryItem(
    data: Omit<GalleryItem, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<GalleryItem> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const item: GalleryItem = {
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(item);

    return {
      ...item,
      _id: result.insertedId,
    };
  }

  /**
   * Obtener item por ID
   */
  async getGalleryItemById(id: string): Promise<GalleryItem | null> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    return collection.findOne({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  /**
   * Listar items activos de galería
   */
  async listActiveGalleryItems(category?: string): Promise<GalleryItem[]> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const query: Record<string, unknown> = { isActive: true };

    if (category) {
      query.category = category;
    }

    return collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Obtener todos los items (admin)
   */
  async getAllGalleryItems(includeInactive = false): Promise<GalleryItem[]> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const query = includeInactive ? {} : { isActive: true };

    return collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Actualizar item
   */
  async updateGalleryItem(
    id: string,
    data: Partial<Omit<GalleryItem, '_id' | 'createdAt'>>
  ): Promise<GalleryItem | null> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return result || null;
  }

  /**
   * Baja lógica de item
   */
  async deactivateGalleryItem(id: string): Promise<boolean> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  }

  /**
   * Obtener categorías de galería
   */
  async getGalleryCategories(): Promise<string[]> {
    const collection = this.db.collection<GalleryItem>(DB_COLLECTIONS.GALLERY_ITEMS);

    const categories = await collection.distinct('category', { isActive: true });

    return categories.filter((c): c is string => typeof c === 'string').sort();
  }
}
