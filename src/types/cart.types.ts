/**
 * TIPOS DE CARRITO
 * CartItem, CartContextType, etc.
 */

import type { Product } from './database.types';

/**
 * Item en el carrito
 * - Referencia al producto
 * - Talle seleccionado
 * - Cantidad
 * - Timestamp de cuando se agregó
 */
export interface CartItem {
  productId: string;
  product: Pick<Product, '_id' | 'name' | 'imageUrl' | 'basePrice' | 'discountPrice' | 'showPrice'>;
  size: string;
  quantity: number;
  addedAt: number; // timestamp
}

/**
 * Estado del carrito
 */
export interface CartState {
  items: CartItem[];
  lastUpdated: number; // timestamp
}

/**
 * Contexto del carrito
 */
export interface CartContextType {
  state: CartState;
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}
