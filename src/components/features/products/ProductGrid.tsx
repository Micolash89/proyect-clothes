import { getMongoDb } from '@/lib/mongodb';
import { ProductService } from '@/services/products.service';
import { ProductCard } from './ProductCard';
import { Card } from '@/components/ui/card';
import type { ProductFilters } from '@/types/product.types';
import type { Product } from '@/types/database.types';

interface ProductGridProps {
  filters: ProductFilters;
}

/**
 * ProductGrid Component (Server)
 * - Obtiene productos del servidor
 * - Aplica filtros
 * - Renderiza grid de ProductCard
 */
export async function ProductGrid({ filters }: ProductGridProps) {
  const db = await getMongoDb();
  const productService = new ProductService(db);

  // Obtener productos con filtros
  const response = await productService.listProducts(filters);

  if (!response.items || response.items.length === 0) {
    return (
      <Card className="col-span-full p-12 text-center">
        <p className="text-lg text-muted-foreground">
          No se encontraron productos con los filtros seleccionados
        </p>
      </Card>
    );
  }

  return (
    <>
      {response.items.map((product: Product) => (
        <ProductCard
          key={product._id?.toString()}
          id={product._id?.toString() ?? ''}
          name={product.name}
          category={product.category}
          imageUrl={product.imageUrl}
          basePrice={product.basePrice}
          discountPrice={product.discountPrice}
          showPrice={product.showPrice}
        />
      ))}
    </>
  );
}
