/**
 * MANEJO DE SESIÓN ADMIN
 * Helpers para crear y verificar sesión en cookies
 */

import { cookies } from 'next/headers';
import type { AuthSession } from '@/types/auth.types';
import { signJwt, verifyJwt } from './jwt';
import { AUTH_CONSTANTS } from '@/constants/auth.constants';

export async function createAdminSession(email: string, role: string = 'admin'): Promise<string> {
  const token = await signJwt({
    sub: email,
    role,
    email,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONSTANTS.TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: AUTH_CONSTANTS.TOKEN_COOKIE_MAX_AGE,
  });

  return token;
}

export async function getAdminSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONSTANTS.TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      return null;
    }

    return {
      authenticated: true,
      role: payload.role,
      email: payload.email,
      expiresAt: payload.exp,
    };
  } catch (error) {
    console.error('Error getting admin session:', error);
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONSTANTS.TOKEN_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session?.authenticated ?? false;
}
