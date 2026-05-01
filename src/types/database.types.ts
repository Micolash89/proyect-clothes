/**
 * TIPOS DE BASE DE DATOS
 * Interfaces de las entidades de Mongo
 */

import type { ObjectId } from 'mongodb';

// PRODUCTOS
export interface Product {
  _id?: ObjectId;
  name: string;
  category: string;
  description: string;
  imageUrl: string; // Imgur URL
  price?: number; // Opcional si mostrar precio está desactivado globalmente
  sizes: string[]; // ['S', 'M', 'L', 'XL', ...]
  isActive: boolean; // Baja lógica: no eliminar físicamente
  createdAt: Date;
  updatedAt: Date;
}

// DISEÑOS PREDEFINIDOS
export interface PredefinedDesign {
  _id?: ObjectId;
  name: string;
  category: string;
  imageUrl: string; // Imgur URL
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// GALERÍA (TRABAJOS ANTERIORES)
export interface GalleryItem {
  _id?: ObjectId;
  imageUrl: string; // Imgur URL
  description: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// PEDIDOS
export interface OrderItem {
  productId: string; // MongoDB ObjectId as string
  productName: string;
  size: string;
  quantity: number;
  unitPrice?: number; // Precio en momento de pedido (para historial)
}

export interface Order {
  _id?: ObjectId;
  orderCode: string; // "#00123" - formato legible
  customerName: string;
  customerWhatsapp: string;
  items: OrderItem[];
  designMode: 'predefined' | 'custom';
  predefinedDesignId?: string; // Si es predefinido
  customDesignDescription?: string; // Si es personalizado
  customLogoPosition?: string; // Posición del logo (ej: "pecho", "espalda")
  status: 'pendiente' | 'señado' | 'en_produccion' | 'entregado' | 'cancelado';
  userId?: string; // Para futura autenticación de clientes
  totalPrice?: number; // Precio total del pedido (si se mostró)
  notes?: string; // Notas del admin
  createdAt: Date;
  updatedAt: Date;
}

// CONFIGURACIÓN GLOBAL (SINGLETON)
export interface AppSettings {
  _id?: ObjectId;
  _id_override?: string; // 'global_settings'
  showPrices: boolean; // Toggle de visibilidad de precios
  whatsappUrl: string; // URL de contacto WhatsApp
  instagramUrl?: string;
  facebookUrl?: string;
  adminEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

// CONTADOR PARA NÚMEROS DE PEDIDO
export interface Counter {
  _id?: ObjectId;
  _id_override?: string; // 'orderCode'
  sequence: number; // Próximo número a usar
  createdAt: Date;
  updatedAt: Date;
}
