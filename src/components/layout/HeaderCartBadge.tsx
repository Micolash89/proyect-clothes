'use client';

import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';

/**
 * HeaderCartBadge Component
 * - Link al carrito con badge de cantidad
 * - Client component para acceder a useCart
 */
export function HeaderCartBadge() {
  const { itemCount } = useCart();

  return (
    <Link
      href={ROUTES.CART}
      className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title={UI_LABELS.CART}
    >
      <span className="text-xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
