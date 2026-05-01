'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes.constants';

/**
 * CartEmpty Component
 * - Muestra cuando el carrito está vacío
 * - CTA para continuar comprando
 */
export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Tu carrito está vacío</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Aún no has agregado productos al carrito. Explora nuestro catálogo y encuentra lo que te gusta.
      </p>
      <Button asChild size="lg">
        <Link href={ROUTES.CATALOG}>Ir al catálogo</Link>
      </Button>
    </div>
  );
}
