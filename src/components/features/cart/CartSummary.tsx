'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';
import { ROUTES } from '@/constants/routes.constants';
import { CART_MESSAGES } from '@/constants/cart.constants';

/**
 * CartSummary Component
 * - Muestra resumen de carrito
 * - Subtotal, impuestos, total
 * - Botones de checkout y continuar comprando
 */
export function CartSummary() {
  const { totalPrice, itemCount, clearCart } = useCart();

  // Simular impuestos (10%)
  const taxes = totalPrice * 0.1;
  const finalTotal = totalPrice + taxes;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="text-lg font-semibold text-foreground">Resumen del pedido</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} items):</span>
          <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Impuestos (10%):</span>
          <span className="font-medium text-foreground">${taxes.toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="font-semibold text-foreground">Total:</span>
          <span className="font-bold text-lg text-primary">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button asChild className="w-full" size="lg">
        <Link href={ROUTES.CHECKOUT}>{CART_MESSAGES.CHECKOUT}</Link>
      </Button>

      <Button asChild variant="outline" className="w-full">
        <Link href={ROUTES.CATALOG}>{CART_MESSAGES.CONTINUE_SHOPPING}</Link>
      </Button>

      <button
        onClick={clearCart}
        className="w-full text-sm text-destructive hover:text-destructive/80 transition-colors py-2"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
