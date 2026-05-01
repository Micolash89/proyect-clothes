import { Suspense } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProductFilters } from '@/components/features/products/ProductFilters';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import type { ProductFilters as ProductFiltersType } from '@/types/product.types';

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Catalog Page
 * - Server component
 * - ProductFilters (client) en sidebar
 * - ProductGrid (server) con Suspense
 */
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  // Build filters from URL params
  const filters: ProductFiltersType = {
    search: typeof params.search === 'string' ? params.search : undefined,
    category: typeof params.category === 'string' ? params.category : undefined,
    minPrice: typeof params.minPrice === 'string' ? parseFloat(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === 'string' ? parseFloat(params.maxPrice) : undefined,
    sortBy: (typeof params.sortBy === 'string'
      ? params.sortBy
      : 'newest') as 'newest' | 'price-asc' | 'price-desc' | 'name',
    page: typeof params.page === 'string' ? parseInt(params.page) : 1,
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Catálogo de Productos</h1>
          <p className="mt-2 text-muted-foreground">
            Explora nuestros productos y personaliza los que más te gusten
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar - Filters */}
          <aside className="md:col-span-1">
            <ProductFilters showPriceFilter={true} />
          </aside>

          {/* Products grid */}
          <section className="md:col-span-3">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse rounded-lg bg-muted h-64" />
                  ))}
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ProductGrid filters={filters} />
              </div>
            </Suspense>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}

export const metadata = {
  title: 'Catálogo | Tienda Sublimación',
  description: 'Explora nuestro catálogo de productos personalizables',
};
