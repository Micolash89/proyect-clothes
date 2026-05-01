/**
 * CONSTANTES DE CARRITO
 * Locales storage keys, mensajes, etc.
 */

export const CART_STORAGE_KEY = 'cart-state';
export const CART_STORAGE_VERSION = 1;

export const CART_MESSAGES = {
  ITEM_ADDED: 'Producto agregado al carrito',
  ITEM_REMOVED: 'Producto removido del carrito',
  CART_CLEARED: 'Carrito vaciado',
  QUANTITY_UPDATED: 'Cantidad actualizada',
  CHECKOUT: 'Ir a comprar',
  CONTINUE_SHOPPING: 'Continuar comprando',
} as const;

export const CART_VALIDATION = {
  MAX_QUANTITY_PER_ITEM: 99,
  MIN_QUANTITY: 1,
} as const;
