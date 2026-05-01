'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PRODUCT_SIZES } from '@/constants/business.constants';
import { UI_LABELS } from '@/constants/ui.constants';

interface ProductOptionsProps {
  onAddToCart: (size: string, quantity: number) => void;
  isLoading?: boolean;
  availableSizes?: string[];
}

/**
 * ProductOptions Component
 * - Selector de talle
 * - Selector de cantidad
 * - Botón agregar al carrito
 */
export function ProductOptions({
  onAddToCart,
  isLoading = false,
  availableSizes = PRODUCT_SIZES as unknown as string[],
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona un talle');
      return;
    }
    onAddToCart(selectedSize, quantity);
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
            className="rounded-md border border-border p-2 hover:bg-muted"
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
            className="w-16 rounded-md border border-input bg-background px-2 py-2 text-center font-medium"
          />
          <button
            onClick={incrementQuantity}
            className="rounded-md border border-border p-2 hover:bg-muted"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || !selectedSize}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Agregando...' : UI_LABELS.ADD_TO_CART}
      </Button>
    </div>
  );
}
