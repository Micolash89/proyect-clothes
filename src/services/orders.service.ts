/**
 * SERVICIO DE PEDIDOS
 * CRUD de pedidos del cliente
 */

import { ObjectId, type Db } from 'mongodb';
import type { Order } from '@/types/database.types';
import { DB_COLLECTIONS } from '@/constants/database.constants';
import { ORDER_STATUS } from '@/constants/business.constants';

export class OrderService {
  constructor(private db: Db) {}

  /**
   * Crear nuevo pedido
   */
  async createOrder(data: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    const order: Order = {
      ...data,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(order);

    return {
      ...order,
      _id: result.insertedId,
    };
  }

  /**
   * Obtener pedido por ID
   */
  async getOrderById(id: string): Promise<Order | null> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    return collection.findOne({
      _id: new ObjectId(id),
    });
  }

  /**
   * Obtener pedido por orderCode (ID legible)
   */
  async getOrderByCode(orderCode: string): Promise<Order | null> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    return collection.findOne({
      orderCode,
    });
  }

  /**
   * Listar todos los pedidos (admin)
   */
  async listOrders(
    status?: string,
    skip = 0,
    limit = 20
  ): Promise<{ items: Order[]; total: number }> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    const total = await collection.countDocuments(query);

    const items = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return { items, total };
  }

  /**
   * Actualizar estado de pedido
   */
  async updateOrderStatus(id: string, newStatus: string, notes?: string): Promise<Order | null> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    const updateData: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date(),
    };

    if (notes) {
      updateData.notes = notes;
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    return result || null;
  }

  /**
   * Actualizar notas del pedido
   */
  async updateOrderNotes(id: string, notes: string): Promise<Order | null> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          notes,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    return result || null;
  }

  /**
   * Obtener pedidos por WhatsApp del cliente
   */
  async getOrdersByCustomerWhatsapp(whatsapp: string): Promise<Order[]> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    return collection
      .find({
        customerWhatsapp: whatsapp,
      })
      .sort({ createdAt: -1 })
      .toArray();
  }

  /**
   * Contar pedidos por estado
   */
  async getOrderCountByStatus(): Promise<Record<string, number>> {
    const collection = this.db.collection<Order>(DB_COLLECTIONS.ORDERS);

    const statuses = Object.values(ORDER_STATUS);
    const counts: Record<string, number> = {};

    for (const status of statuses) {
      counts[status] = await collection.countDocuments({ status });
    }

    return counts;
  }
}
