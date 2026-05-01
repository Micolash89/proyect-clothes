import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';
import type { ProductCardProps } from '@/types/product.types';

/**
 * ProductCard Component
 * Tarjeta de producto para grid
 * - Imagen
 * - Nombre
 * - Categoría
 * - Precio (si mostrado)
 * - Link a detalle
 */
export function ProductCard({
  id,
  name,
  category,
  imageUrl,
  basePrice,
  discountPrice,
  showPrice,
}: ProductCardProps) {
  const finalPrice = discountPrice ?? basePrice;
  const hasDiscount = discountPrice && discountPrice < (basePrice ?? 0);

  return (
    <Link href={ROUTES.PRODUCT(id)}>
      <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-md cursor-pointer h-full flex flex-col">
        {/* Image container */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
              Oferta
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Category badge */}
          <div className="text-xs font-medium text-muted-foreground uppercase">
            {category}
          </div>

          {/* Name */}
          <h3 className="line-clamp-2 font-semibold text-foreground hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price or placeholder */}
          {showPrice ? (
            <div className="space-y-1">
              {hasDiscount && basePrice && (
                <p className="text-xs line-through text-muted-foreground">
                  ${basePrice.toFixed(2)}
                </p>
              )}
              {finalPrice ? (
                <p className="text-lg font-bold text-primary">
                  ${finalPrice.toFixed(2)}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">{UI_LABELS.PRICE_ON_REQUEST}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{UI_LABELS.PRICE_ON_REQUEST}</p>
          )}

          {/* View details button */}
          <Button variant="outline" size="sm" className="mt-auto w-full">
            Ver detalles
          </Button>
        </div>
      </Card>
    </Link>
  );
}
