'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';
import { ROUTES } from '@/constants/routes.constants';
import type { CartItem } from '@/types/cart.types';

interface CartItemCardProps {
  item: CartItem;
}

/**
 * CartItemCard Component
 * - Muestra un item del carrito
 * - Selector de cantidad
 * - Botón remover
 * - Link al producto
 */
export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();
  const price = item.product.discountPrice ?? item.product.basePrice ?? 0;
  const subtotal = price * item.quantity;

  const handleRemove = () => {
    removeItem(item.productId, item.size);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove();
    } else {
      updateQuantity(item.productId, item.size, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 rounded-lg border border-border p-4">
      {/* Product image */}
      <Link href={`${ROUTES.PRODUCT}/${item.productId}`} className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
          sizes="96px"
        />
      </Link>

      {/* Product info */}
      <div className="flex-1 space-y-2">
        <Link
          href={`${ROUTES.PRODUCT}/${item.productId}`}
          className="font-semibold text-foreground hover:text-primary transition-colors"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-muted-foreground">Talle: {item.size}</p>
        <p className="text-sm font-medium text-primary">${price.toFixed(2)}</p>
      </div>

      {/* Quantity and price */}
      <div className="flex flex-col items-end justify-between">
        {/* Quantity selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="rounded-md border border-border p-1 hover:bg-muted"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="rounded-md border border-border p-1 hover:bg-muted"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        {/* Subtotal and remove */}
        <div className="text-right space-y-2">
          <p className="text-lg font-bold text-foreground">${subtotal.toFixed(2)}</p>
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Remover
          </Button>
        </div>
      </div>
    </div>
  );
}
