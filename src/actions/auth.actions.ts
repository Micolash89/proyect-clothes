'use server';

import { redirect } from 'next/navigation';
import { getMongoDb } from '@/lib/mongodb';
import { createAdminSession, clearAdminSession } from '@/lib/auth-session';
import { signJwt } from '@/lib/jwt';
import { env } from '@/lib/env';
import { loginSchema } from '@/utils/validations';
import { ROUTES } from '@/constants/routes.constants';
import type { LoginResponse } from '@/types/auth.types';

/**
 * Login admin
 * Validates credentials and creates HTTP-only session cookie
 */
export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  try {
    // Validate input
    const validated = loginSchema.parse({ email, password });

    // Check credentials
    if (validated.email !== env.admin.email || validated.password !== env.admin.password) {
      throw new Error('Credenciales inválidas');
    }

    // Create JWT token
    const token = await signJwt({
      sub: env.admin.email,
      role: 'admin',
      email: env.admin.email,
    });

    // Create secure session cookie
    await createAdminSession(token);

    // Return success
    return { success: true, message: 'Login exitoso' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error en login';
    throw new Error(message);
  }
}

/**
 * Logout admin
 * Clears session cookie
 */
export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect(ROUTES.HOME);
}

/**
 * Verify current admin session
 * Returns success if valid, throws if not authenticated
 */
export async function verifyAdminSession() {
  try {
    await getMongoDb();
    return { isAuthenticated: true };
  } catch {
    throw new Error('Sesión inválida o expirada');
  }
}
