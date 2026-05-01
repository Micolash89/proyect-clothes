'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { CART_STORAGE_KEY } from '@/constants/cart.constants';
import type { CartItem, CartContextType, CartState } from '@/types/cart.types';

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_STATE: CartState = {
  items: [],
  lastUpdated: 0,
};

/**
 * CartProvider - Maneja el carrito de compras
 * - Persiste en localStorage
 * - Calcula totales automáticamente
 * - CRUD de items
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(INITIAL_STATE);
  const [mounted, setMounted] = useState(false);
  const initRef = useRef(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      let initialState = INITIAL_STATE;
      
      if (stored) {
        try {
          initialState = JSON.parse(stored) as CartState;
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
      
      setState(initialState);
      setMounted(true);
    }
  }, []);

  // Guardar en localStorage cuando el estado cambia (después del render inicial)
  useEffect(() => {
    if (mounted && state.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } else if (mounted && state.items.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [state, mounted]);

  // Calcular cantidad total de items
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Calcular precio total
  const totalPrice = state.items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.basePrice ?? 0;
    return sum + price * item.quantity;
  }, 0);

  // Agregar item al carrito
  const addItem = useCallback((item: Omit<CartItem, 'addedAt'>) => {
    setState((prev) => {
      // Buscar si ya existe el producto con el mismo talle
      const existingIndex = prev.items.findIndex(
        (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
      );

      let newItems: CartItem[];

      if (existingIndex > -1) {
        // Si existe, incrementar cantidad
        newItems = [...prev.items];
        newItems[existingIndex].quantity += item.quantity;
      } else {
        // Si no existe, agregarlo
        newItems = [
          ...prev.items,
          {
            ...item,
            addedAt: Date.now(),
          },
        ];
      }

      return {
        items: newItems,
        lastUpdated: Date.now(),
      };
    });
  }, []);

  // Remover item del carrito
  const removeItem = useCallback((productId: string, size: string) => {
    setState((prev) => ({
      items: prev.items.filter((item) => !(item.productId === productId && item.size === size)),
      lastUpdated: Date.now(),
    }));
  }, []);

  // Actualizar cantidad
  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setState((prev) => {
      if (quantity < 1) {
        // Si la cantidad es menor a 1, remover el item
        return {
          items: prev.items.filter((item) => !(item.productId === productId && item.size === size)),
          lastUpdated: Date.now(),
        };
      }

      return {
        items: prev.items.map((item) =>
          item.productId === productId && item.size === size ? { ...item, quantity } : item
        ),
        lastUpdated: Date.now(),
      };
    });
  }, []);

  // Vaciar carrito
  const clearCart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  // No renderizar hasta estar montado (hidratación)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider
      value={{
        state,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
