/**
 * CONSTANTES DE NEGOCIO
 * Categorías, estados, talles, validaciones
 */

export const PRODUCT_CATEGORIES = {
  REMERAS: 'remeras',
  VASOS: 'vasos',
  BOLSAS: 'bolsas',
  GORRAS: 'gorras',
  TERMOS: 'termos',
  OTROS: 'otros',
} as const;

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

export const ORDER_STATUS = {
  PENDING: 'pendiente',
  PAID: 'señado',
  IN_PRODUCTION: 'en_produccion',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendiente de seña',
  [ORDER_STATUS.PAID]: 'Seña confirmada',
  [ORDER_STATUS.IN_PRODUCTION]: 'En producción',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
} as const;

export const DESIGN_MODE = {
  PREDEFINED: 'predefined',
  CUSTOM: 'custom',
} as const;

// Límites y validaciones
export const LIMITS = {
  PRODUCT_NAME_MIN: 3,
  PRODUCT_NAME_MAX: 100,
  PRODUCT_DESC_MAX: 500,
  ORDER_MIN_ITEMS: 1,
  ORDER_MAX_ITEMS: 100,
  CUSTOM_DESIGN_DESC_MIN: 10,
  CUSTOM_DESIGN_DESC_MAX: 500,
  CUSTOMER_NAME_MIN: 2,
  CUSTOMER_NAME_MAX: 100,
  WHATSAPP_MIN: 7, // Número mínimo de dígitos en un WhatsApp
} as const;

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  DESIGNS_PER_PAGE: 8,
  GALLERY_PER_PAGE: 9,
  ORDERS_PER_PAGE: 20,
} as const;
