/**
 * CONSTANTES DE BASE DE DATOS
 * Nombres de colecciones, campos, índices
 */

export const DB_COLLECTIONS = {
  PRODUCTS: 'products',
  PREDEFINED_DESIGNS: 'predefinedDesigns',
  GALLERY_ITEMS: 'galleryItems',
  ORDERS: 'orders',
  SETTINGS: 'settings',
  COUNTERS: 'counters',
} as const;

export const DB_INDEXES = {
  PRODUCTS: {
    CATEGORY: 'category',
    IS_ACTIVE: 'isActive',
    CREATED_AT: 'createdAt',
  },
  PREDEFINED_DESIGNS: {
    CATEGORY: 'category',
    IS_ACTIVE: 'isActive',
  },
  GALLERY_ITEMS: {
    CATEGORY: 'category',
    IS_ACTIVE: 'isActive',
  },
  ORDERS: {
    ORDER_CODE: 'orderCode',
    STATUS: 'status',
    CREATED_AT: 'createdAt',
    CUSTOMER_WHATSAPP: 'customerWhatsapp',
  },
} as const;

// Documento singleton para settings
export const SETTINGS_DOC_ID = 'global_settings' as const;

// Documento de contador para order codes
export const COUNTER_ORDER_CODE = 'orderCode' as const;
