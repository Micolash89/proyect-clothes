/**
 * CONSTANTES DE WHATSAPP
 * URLs y plantillas de mensajes
 */

export const WHATSAPP_CONSTANTS = {
  // Usa NEXT_PUBLIC_WHATSAPP_URL del .env para construir wa.me links
  // Ej: https://wa.me/5491234567890
  MESSAGE_ENCODING: 'UTF-8',
} as const;

export const WHATSAPP_MESSAGES = {
  // Plantilla para confirmación de pedido
  // Se reemplazarán %s con valores dinámicos
  ORDER_CONFIRMATION: `Hola, quiero confirmar el pedido %s:\n%s\n\nGracias!`,
  // Plantilla simple para consulta general
  GENERAL_INQUIRY: `Hola, tengo una consulta sobre sublimación.`,
} as const;
