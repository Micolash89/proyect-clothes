'use server';

import { revalidatePath } from 'next/cache';
import { getMongoDb } from '@/lib/mongodb';
import { OrderService } from '@/services/orders.service';
import { CounterService } from '@/services/counters.service';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  updateOrderNotesSchema,
  type CreateOrderInput,
  type UpdateOrderStatusInput,
  type UpdateOrderNotesInput,
} from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import { ORDER_STATUS } from '@/constants/business.constants';
import type { Order } from '@/types/database.types';

/**
 * Create a new order (public - guest checkout)
 * Generates order code automatically using counter service
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  try {
    const validated = createOrderSchema.parse(input);
    const db = await getMongoDb();

    // Generate next order code atomically
    const counterService = new CounterService(db);
    const orderCode = await counterService.getNextOrderCode();

    // Create order
    const orderService = new OrderService(db);
    const order = await orderService.createOrder({
      orderCode,
      customerName: validated.customerName,
      customerWhatsapp: validated.customerWhatsapp,
      items: validated.items,
      notes: validated.notes,
      status: ORDER_STATUS.PENDING,
    });

    revalidatePath(ROUTES.HOME); // Revalidate home for order count or similar

    return order;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error creando pedido';
    throw new Error(message);
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const db = await getMongoDb();
    const service = new OrderService(db);
    return await service.getOrderById(orderId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo pedido';
    throw new Error(message);
  }
}

/**
 * Get order by order code (for customer lookup)
 */
export async function getOrderByCode(orderCode: string): Promise<Order | null> {
  try {
    const db = await getMongoDb();
    const service = new OrderService(db);
    return await service.getOrderByCode(orderCode);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error obteniendo pedido';
    throw new Error(message);
  }
}

/**
 * Update order status (admin)
 */
export async function updateOrderStatus(
  orderId: string,
  input: UpdateOrderStatusInput
): Promise<Order> {
  try {
    const validated = updateOrderStatusSchema.parse(input);
    const db = await getMongoDb();
    const service = new OrderService(db);

    const order = await service.updateOrderStatus(orderId, validated.status);
    if (!order) throw new Error('Pedido no encontrado');

    revalidatePath(ROUTES.ADMIN_ORDERS);

    return order;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando estado';
    throw new Error(message);
  }
}

/**
 * Update order notes (admin)
 */
export async function updateOrderNotes(
  orderId: string,
  input: UpdateOrderNotesInput
): Promise<Order> {
  try {
    const validated = updateOrderNotesSchema.parse(input);
    const db = await getMongoDb();
    const service = new OrderService(db);

    const order = await service.updateOrderNotes(orderId, validated.notes);
    if (!order) throw new Error('Pedido no encontrado');

    revalidatePath(ROUTES.ADMIN_ORDERS);

    return order;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error actualizando notas';
    throw new Error(message);
  }
}
