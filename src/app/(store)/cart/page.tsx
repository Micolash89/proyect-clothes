'use client';

import { PublicLayout } from '@/components/layout/PublicLayout';
import { useCart } from '@/components/providers/CartProvider';
import { CartItemCard } from '@/components/features/cart/CartItemCard';
import { CartSummary } from '@/components/features/cart/CartSummary';
import { CartEmpty } from '@/components/features/cart/CartEmpty';

/**
 * CartPageClient
 * - Client component (requiere useCart)
 * - Lista de items del carrito
 * - Resumen y checkout
 */
function CartPageClient() {
  const { state, itemCount } = useCart();

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Tu Carrito</h1>
          {itemCount > 0 && (
            <p className="mt-2 text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          )}
        </div>

        {/* Main content */}
        {state.items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <section className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <CartItemCard
                  key={`${item.productId}-${item.size}`}
                  item={item}
                />
              ))}
            </section>

            {/* Summary sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <CartSummary />
              </div>
            </aside>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

export default CartPageClient;
