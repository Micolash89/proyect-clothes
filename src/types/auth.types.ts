/**
 * TIPOS DE AUTENTICACIÓN
 */

export interface JwtPayload {
  sub: string; // Subject (user ID o email)
  role: string; // 'admin' o 'customer'
  iat?: number; // Issued at
  exp?: number; // Expiration
  email?: string; // Email del admin
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  error?: string;
}

export interface AuthSession {
  authenticated: boolean;
  role?: string;
  email?: string;
  expiresAt?: number;
}
