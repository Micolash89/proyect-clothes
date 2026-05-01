/**
 * SERVICIO DE PRODUCTOS
 * CRUD + búsqueda de productos
 */

import { ObjectId, type Db } from 'mongodb';
import type { Product } from '@/types/database.types';
import type { ProductFilters } from '@/types/product.types';
import { DB_COLLECTIONS } from '@/constants/database.constants';

export class ProductService {
  constructor(private db: Db) {}

  /**
   * Crear un nuevo producto
   */
  async createProduct(data: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    const product: Product = {
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(product);

    return {
      ...product,
      _id: result.insertedId,
    };
  }

  /**
   * Obtener producto por ID
   */
  async getProductById(id: string): Promise<Product | null> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    return collection.findOne({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  /**
   * Listar productos con filtros
   */
  async listProducts(filters?: ProductFilters): Promise<{ items: Product[]; total: number; hasNextPage: boolean }> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    const query: Record<string, unknown> = { isActive: true };

    // Filtro por categoría
    if (filters?.category && filters.category !== 'all') {
      query.category = filters.category;
    }

    // Filtro por búsqueda en nombre y descripción
    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    // Filtro por rango de precio
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      query.basePrice = {};
      if (filters?.minPrice !== undefined) {
        (query.basePrice as Record<string, number>).$gte = filters.minPrice;
      }
      if (filters?.maxPrice !== undefined) {
        (query.basePrice as Record<string, number>).$lte = filters.maxPrice;
      }
    }

    const total = await collection.countDocuments(query);

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      'price-asc': { basePrice: 1 },
      'price-desc': { basePrice: -1 },
      name: { name: 1 },
      newest: { createdAt: -1 },
    };

    const sort = sortMap[filters?.sortBy ?? 'newest'];
    const pageSize = filters?.pageSize ?? 12;
    const skip = ((filters?.page ?? 1) - 1) * pageSize;

    const items = await collection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageSize + 1) // +1 para detectar hasNextPage
      .toArray();

    const hasNextPage = items.length > pageSize;
    const paginatedItems = items.slice(0, pageSize);

    return { items: paginatedItems, total, hasNextPage };
  }

  /**
   * Actualizar producto
   */
  async updateProduct(id: string, data: Partial<Omit<Product, '_id' | 'createdAt'>>): Promise<Product | null> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id), isActive: true },
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
   * Baja lógica de producto (no eliminar)
   */
  async deactivateProduct(id: string): Promise<boolean> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

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
   * Obtener todos los productos activos (admin)
   */
  async getAllProducts(includeInactive = false): Promise<Product[]> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    const query = includeInactive ? {} : { isActive: true };

    return collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Obtener categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    const collection = this.db.collection<Product>(DB_COLLECTIONS.PRODUCTS);

    const categories = await collection.distinct('category', { isActive: true });

    return categories.filter((c): c is string => typeof c === 'string').sort();
  }
}
