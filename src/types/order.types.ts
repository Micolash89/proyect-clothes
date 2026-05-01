/**
 * TIPOS DE PEDIDOS
 */

import type { Order, OrderItem } from './database.types';

export interface CartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price?: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice?: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerWhatsapp: string;
  items: OrderItem[];
  designMode: 'predefined' | 'custom';
  predefinedDesignId?: string;
  customDesignDescription?: string;
  customLogoPosition?: string;
}

export interface OrderResponse {
  success: boolean;
  order?: Order;
  orderCode?: string;
  message?: string;
  error?: string;
}

export interface OrderStatusChangeRequest {
  orderId: string;
  newStatus: string;
  notes?: string;
}

// Re-export
export type { Order, OrderItem };
