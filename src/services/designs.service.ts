/**
 * SERVICIO DE DISEÑOS PREDEFINIDOS
 * CRUD de diseños que ofrece la tienda
 */

import { ObjectId, type Db } from 'mongodb';
import type { PredefinedDesign } from '@/types/database.types';
import { DB_COLLECTIONS } from '@/constants/database.constants';

export class DesignService {
  constructor(private db: Db) {}

  /**
   * Crear diseño
   */
  async createDesign(data: Omit<PredefinedDesign, '_id' | 'createdAt' | 'updatedAt'>): Promise<PredefinedDesign> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

    const design: PredefinedDesign = {
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(design);

    return {
      ...design,
      _id: result.insertedId,
    };
  }

  /**
   * Obtener diseño por ID
   */
  async getDesignById(id: string): Promise<PredefinedDesign | null> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

    return collection.findOne({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  /**
   * Listar diseños activos (público)
   */
  async listActiveDesigns(category?: string): Promise<PredefinedDesign[]> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

    const query: Record<string, unknown> = { isActive: true };

    if (category) {
      query.category = category;
    }

    return collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Obtener todos los diseños (admin)
   */
  async getAllDesigns(includeInactive = false): Promise<PredefinedDesign[]> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

    const query = includeInactive ? {} : { isActive: true };

    return collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Actualizar diseño
   */
  async updateDesign(
    id: string,
    data: Partial<Omit<PredefinedDesign, '_id' | 'createdAt'>>
  ): Promise<PredefinedDesign | null> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

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
   * Baja lógica de diseño
   */
  async deactivateDesign(id: string): Promise<boolean> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

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
   * Obtener categorías de diseños
   */
  async getDesignCategories(): Promise<string[]> {
    const collection = this.db.collection<PredefinedDesign>(DB_COLLECTIONS.PREDEFINED_DESIGNS);

    const categories = await collection.distinct('category', { isActive: true });

    return categories.filter((c): c is string => typeof c === 'string').sort();
  }
}
