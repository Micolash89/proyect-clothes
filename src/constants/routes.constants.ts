/**
 * RUTAS DE NAVEGACIÓN
 * Todas las rutas públicas y privadas de la aplicación
 */

export const ROUTES = {
  // Public
  HOME: '/',
  CATALOG: '/catalog',
  GALLERY: '/gallery',
  PRODUCT: (slug: string) => `/product/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRM: (orderCode: string) => `/confirm/${orderCode}`,
  ORDER_STATUS: (orderCode: string) => `/order/${orderCode}`,

  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_DESIGNS: '/admin/designs',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_SETTINGS: '/admin/settings',
} as const;
