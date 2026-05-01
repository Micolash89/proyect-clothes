/**
 * SERVICIO DE CONTADORES
 * Genera IDs legibles para pedidos (ej: #00123)
 */

import { type Db } from 'mongodb';
import type { Counter } from '@/types/database.types';
import { DB_COLLECTIONS, COUNTER_ORDER_CODE } from '@/constants/database.constants';

export class CounterService {
  constructor(private db: Db) {}

  /**
   * Obtener siguiente número de counter
   */
  private async getNextSequence(counterId: string): Promise<number> {
    const collection = this.db.collection<Counter>(DB_COLLECTIONS.COUNTERS);

    const result = await collection.findOneAndUpdate(
      { _id: counterId },
      {
        $inc: { sequence: 1 },
      },
      { returnDocument: 'after', upsert: true }
    );

    return (result?.sequence ?? 0) + 1;
  }

  /**
   * Generar siguiente código de pedido (#00123)
   */
  async getNextOrderCode(): Promise<string> {
    const sequence = await this.getNextSequence(COUNTER_ORDER_CODE);
    return `#${String(sequence).padStart(5, '0')}`;
  }

  /**
   * Reset de counter (admin)
   */
  async resetCounter(counterId: string): Promise<void> {
    const collection = this.db.collection<Counter>(DB_COLLECTIONS.COUNTERS);

    await collection.updateOne(
      { _id: counterId },
      {
        $set: { sequence: 0 },
      },
      { upsert: true }
    );
  }

  /**
   * Obtener valor actual del counter
   */
  async getCounterValue(counterId: string): Promise<number> {
    const collection = this.db.collection<Counter>(DB_COLLECTIONS.COUNTERS);

    const result = await collection.findOne({ _id: counterId });

    return result?.sequence ?? 0;
  }
}
