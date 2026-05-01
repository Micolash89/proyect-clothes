/**
 * CONSTANTES DE AUTENTICACIÓN Y SEGURIDAD
 */

export const AUTH_CONSTANTS = {
  JWT_ALGORITHM: 'HS256' as const,
  TOKEN_COOKIE_NAME: 'admin_token',
  TOKEN_COOKIE_MAX_AGE: 7 * 24 * 60 * 60, // 7 días en segundos
  ADMIN_ROLE: 'admin',
  CUSTOMER_ROLE: 'customer',
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Email o contraseña inválidos',
  TOKEN_EXPIRED: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
  UNAUTHORIZED: 'No estás autorizado para acceder a este recurso',
  TOKEN_INVALID: 'Token inválido',
} as const;
