/**
 * VALIDACIÓN Y ACCESO A VARIABLES DE ENTORNO
 * Usa Zod para garantizar que todas las variables requeridas existen
 */

import { z, ZodError } from 'zod';

const envSchema = z.object({
  // MongoDB
  MONGODB_URI: z.string().url('MONGODB_URI debe ser una URL válida'),
  MONGODB_DB_NAME: z.string().min(1, 'MONGODB_DB_NAME es requerido'),

  // JWT & Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Admin credentials (iniciales)
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL debe ser un email válido'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD debe tener al menos 8 caracteres'),

  // URLs públicas
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL debe ser una URL válida'),
  NEXT_PUBLIC_WHATSAPP_URL: z.string().url('NEXT_PUBLIC_WHATSAPP_URL debe ser una URL válida'),
  NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().optional(),
  NEXT_PUBLIC_FACEBOOK_URL: z.string().url().optional(),
});

type EnvConfig = z.infer<typeof envSchema>;

let validatedEnv: EnvConfig | null = null;

export function getEnv(): EnvConfig {
  if (validatedEnv) return validatedEnv;

  try {
    validatedEnv = envSchema.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof ZodError) {
      const missingVars = error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join('\n');
      throw new Error(`Configuración de entorno inválida:\n${missingVars}`);
    }
    throw error;
  }
}

// Acceso directo a variables (usa getEnv() si necesitas validación)
export const env = {
  mongodb: {
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DB_NAME!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  admin: {
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
  },
  public: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL!,
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
};
