/**
 * MANEJO DE JWT
 * Firmar y verificar tokens con jose
 */

import * as jose from 'jose';
import type { JwtPayload } from '@/types/auth.types';
import { env } from './env';

const secret = new TextEncoder().encode(env.jwt.secret);

export async function signJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(env.jwt.expiresIn)
      .sign(secret);

    return token;
  } catch (error) {
    console.error('Error signing JWT:', error);
    throw new Error('No se pudo firmar el token');
  }
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload as unknown as JwtPayload;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const decoded = jose.decodeProtectedHeader(token);
    return decoded as unknown as JwtPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
