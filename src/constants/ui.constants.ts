/**
 * CONSTANTES DE UI
 * Textos, labels, placeholders, mensajes
 */

export const UI_LABELS = {
  // Navegación
  HOME: 'Inicio',
  CATALOG: 'Catálogo',
  GALLERY: 'Galería',
  CART: 'Carrito',

  // Productos
  SELECT_SIZE: 'Seleccionar talle',
  SELECT_QUANTITY: 'Cantidad',
  ADD_TO_CART: 'Agregar al carrito',
  PRICE_ON_REQUEST: 'Consultá por precio',

  // Diseños
  SELECT_DESIGN: 'Seleccionar diseño',
  PREDEFINED_DESIGN: 'Diseño predefinido',
  CUSTOM_DESIGN: 'Diseño personalizado',
  DESIGN_DESCRIPTION: 'Describe tu logo o diseño',
  LOGO_POSITION: 'Posición del logo',

  // Checkout
  CONTINUE_CHECKOUT: 'Continuar con checkout',
  CUSTOMER_NAME: 'Tu nombre',
  WHATSAPP_NUMBER: 'Tu número de WhatsApp',
  CONFIRM_ORDER: 'Confirmar pedido',
  PLACE_ORDER: 'Realizar pedido',

  // Admin
  LOGIN: 'Ingresar',
  LOGOUT: 'Cerrar sesión',
  DASHBOARD: 'Panel de control',
  ADD_PRODUCT: 'Agregar producto',
  EDIT_PRODUCT: 'Editar producto',
  DELETE_PRODUCT: 'Eliminar producto',
  MARK_INACTIVE: 'Marcar como inactivo',

  // General
  LOADING: 'Cargando...',
  ERROR: 'Error',
  SUCCESS: 'Operación exitosa',
  CANCEL: 'Cancelar',
  SAVE: 'Guardar',
  DELETE: 'Eliminar',
  EDIT: 'Editar',
} as const;

export const UI_MESSAGES = {
  // Errores
  ERROR_GENERIC: 'Ocurrió un error. Por favor, intenta de nuevo.',
  ERROR_INVALID_EMAIL: 'Email inválido',
  ERROR_INVALID_PHONE: 'Número de WhatsApp inválido',
  ERROR_REQUIRED_FIELD: 'Campo requerido',
  ERROR_PRODUCT_NOT_FOUND: 'Producto no encontrado',
  ERROR_ORDER_FAILED: 'No se pudo crear el pedido. Intenta de nuevo.',

  // Success
  SUCCESS_PRODUCT_ADDED: 'Producto agregado al carrito',
  SUCCESS_ORDER_CREATED: 'Pedido creado exitosamente',
  SUCCESS_SETTINGS_UPDATED: 'Configuración actualizada',

  // Info
  INFO_EMPTY_CART: 'Tu carrito está vacío',
  INFO_PRICES_HIDDEN: 'Los precios están ocultos. Consultá por disponibilidad.',
  INFO_DESIGN_REQUIRED: 'Debes seleccionar o describir un diseño',
} as const;

export const UI_PLACEHOLDERS = {
  CUSTOMER_NAME: 'Ej: Juan García',
  WHATSAPP_NUMBER: 'Ej: +54 9 11 1234-5678',
  PRODUCT_NAME: 'Ej: Remera Premium',
  PRODUCT_DESCRIPTION: 'Describe el producto...',
  DESIGN_DESCRIPTION: 'Describe tu logo o diseño personalizado...',
  SEARCH_PRODUCTS: 'Buscar productos...',
} as const;
