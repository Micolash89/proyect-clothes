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
  description?: string; // Opcional
  imageUrl: string; // Imgur URL
  basePrice: number; // Precio base
  discountPrice?: number; // Precio con descuento (opcional)
  sizes: string[]; // ['S', 'M', 'L', 'XL', ...]
  showPrice: boolean; // Mostrar precio en la tienda
  isActive: boolean; // Baja lógica: no eliminar físicamente
  createdAt: Date;
  updatedAt: Date;
}

// DISEÑOS PREDEFINIDOS
export interface PredefinedDesign {
  _id?: ObjectId;
  name: string;
  category: string;
  description?: string; // Opcional
  imageUrl: string; // Imgur URL
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// GALERÍA (TRABAJOS ANTERIORES)
export interface GalleryItem {
  _id?: ObjectId;
  title: string; // Campo title en lugar de description
  description?: string; // Opcional
  imageUrl: string; // Imgur URL
  displayOrder?: number; // Orden de visualización
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// PEDIDOS
export interface OrderItem {
  productId: string; // MongoDB ObjectId as string
  quantity: number;
  size: string;
  selectedDesignId?: string; // ID del diseño predefinido
  customDesignUrl?: string; // URL del diseño personalizado
  notes?: string; // Notas del item
}

export interface Order {
  _id?: ObjectId;
  orderCode: string; // "#00123" - formato legible
  customerName: string;
  customerWhatsapp: string;
  items: OrderItem[];
  notes?: string; // Notas generales del pedido
  status: string; // Estado del pedido (usando string para compatibilidad con ORDER_STATUS)
  createdAt: Date;
  updatedAt: Date;
}

// CONFIGURACIÓN GLOBAL (SINGLETON)
export interface AppSettings {
  _id?: string | ObjectId; // 'global_settings' como ID string
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
  _id?: string | ObjectId; // 'orderCode' como ID string
  sequence: number; // Próximo número a usar
  createdAt: Date;
  updatedAt: Date;
}
