import { z } from 'zod';
import { PRODUCT_CATEGORIES, PRODUCT_SIZES, ORDER_STATUS, LIMITS } from '@/constants/business.constants';

/**
 * Auth Validations
 */
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Product Validations
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(LIMITS.PRODUCT_NAME_MAX),
  description: z.string().max(LIMITS.PRODUCT_DESC_MAX).default(''),
  category: z.enum(Object.values(PRODUCT_CATEGORIES) as [string, ...string[]]),
  basePrice: z.number().positive('Precio debe ser positivo'),
  discountPrice: z.number().positive('Precio con descuento debe ser positivo').optional(),
  imageUrl: z.string().url('URL de imagen inválida'),
  sizes: z.array(z.enum(PRODUCT_SIZES)),
  showPrice: z.boolean().default(true),
  isActive: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

/**
 * Design Validations
 */
export const createDesignSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  description: z.string().default(''),
  imageUrl: z.string().url('URL de imagen inválida'),
  category: z.enum(Object.values(PRODUCT_CATEGORIES) as [string, ...string[]]),
  isActive: z.boolean().default(true),
});

export const updateDesignSchema = createDesignSchema.partial();

export type CreateDesignInput = z.infer<typeof createDesignSchema>;
export type UpdateDesignInput = z.infer<typeof updateDesignSchema>;

/**
 * Gallery Validations
 */
export const createGalleryItemSchema = z.object({
  title: z.string().min(1, 'Título requerido'),
  description: z.string().default(''),
  imageUrl: z.string().url('URL de imagen inválida'),
  displayOrder: z.number().int().nonnegative('Orden debe ser positivo').optional(),
  isActive: z.boolean().default(true),
});

export const updateGalleryItemSchema = createGalleryItemSchema.partial();

export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>;
export type UpdateGalleryItemInput = z.infer<typeof updateGalleryItemSchema>;

/**
 * Order Validations
 */
export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Nombre requerido').max(LIMITS.CUSTOMER_NAME_MAX),
  customerWhatsapp: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'WhatsApp inválido (formato E.164)'),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'ID de producto requerido'),
      quantity: z.number().int().positive('Cantidad debe ser positiva').max(LIMITS.ORDER_MAX_ITEMS),
      size: z.enum(PRODUCT_SIZES),
      selectedDesignId: z.string().optional(),
      customDesignUrl: z.string().url().optional(),
      notes: z.string().max(LIMITS.CUSTOM_DESIGN_DESC_MAX).optional(),
    })
  ).min(1, 'Al menos un item requerido'),
  notes: z.string().max(LIMITS.CUSTOM_DESIGN_DESC_MAX).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(Object.values(ORDER_STATUS) as [string, ...string[]]),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

export const updateOrderNotesSchema = z.object({
  notes: z.string().max(LIMITS.CUSTOM_DESIGN_DESC_MAX),
});

export type UpdateOrderNotesInput = z.infer<typeof updateOrderNotesSchema>;

/**
 * Settings Validations
 */
export const updateSettingsSchema = z.object({
  showPrices: z.boolean().optional(),
  businessName: z.string().optional(),
  businessPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido').optional(),
  businessEmail: z.string().email().optional(),
  businessAddress: z.string().optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
