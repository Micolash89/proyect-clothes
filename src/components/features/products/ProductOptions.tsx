'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';
import { PRODUCT_SIZES } from '@/constants/business.constants';
import { UI_LABELS } from '@/constants/ui.constants';
import { CART_MESSAGES } from '@/constants/cart.constants';
import type { Product } from '@/types/database.types';

interface ProductOptionsProps {
  product: Pick<Product, '_id' | 'name' | 'imageUrl' | 'basePrice' | 'discountPrice' | 'showPrice'>;
  availableSizes?: string[];
  isLoading?: boolean;
}

/**
 * ProductOptions Component
 * - Selector de talle
 * - Selector de cantidad
 * - Botón agregar al carrito (integrado con CartContext)
 * - Toast notification con Sonner
 */
export function ProductOptions({
  product,
  availableSizes = PRODUCT_SIZES as unknown as string[],
  isLoading = false,
}: ProductOptionsProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona un talle');
      return;
    }

    try {
      setIsAdding(true);
      addItem({
        productId: product._id?.toString() ?? '',
        product: {
          _id: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          basePrice: product.basePrice,
          discountPrice: product.discountPrice,
          showPrice: product.showPrice,
        },
        size: selectedSize,
        quantity,
      });

      toast.success(CART_MESSAGES.ITEM_ADDED, {
        description: `${quantity}x ${product.name} - Talle: ${selectedSize}`,
      });

      // Reset form
      setSelectedSize('');
      setQuantity(1);
    } catch (error) {
      toast.error('Error al agregar al carrito');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 100));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Size selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          {UI_LABELS.SELECT_SIZE}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded-md py-2 px-3 font-medium text-sm transition-colors ${
                selectedSize === size
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          {UI_LABELS.SELECT_QUANTITY}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={decrementQuantity}
            disabled={isAdding || isLoading}
            className="rounded-md border border-border p-2 hover:bg-muted disabled:opacity-50"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= 1 && val <= 100) {
                setQuantity(val);
              }
            }}
            disabled={isAdding || isLoading}
            className="w-16 rounded-md border border-input bg-background px-2 py-2 text-center font-medium disabled:opacity-50"
          />
          <button
            onClick={incrementQuantity}
            disabled={isAdding || isLoading}
            className="rounded-md border border-border p-2 hover:bg-muted disabled:opacity-50"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || isAdding || !selectedSize}
        className="w-full"
        size="lg"
      >
        {isAdding || isLoading ? 'Agregando...' : UI_LABELS.ADD_TO_CART}
      </Button>
    </div>
  );
}
