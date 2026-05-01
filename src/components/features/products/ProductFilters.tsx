'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/constants/business.constants';
import type { ProductFilters } from '@/types/product.types';

interface ProductFiltersProps {
  onFiltersChange?: (filters: ProductFilters) => void;
  showPriceFilter?: boolean;
}

/**
 * ProductFilters Component
 * - Search input
 * - Category filter
 * - Price range filter (opcional)
 * - Sort options
 * - Client component que actualiza URL params
 */
export function ProductFilters({
  onFiltersChange,
  showPriceFilter = true,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'name'>(
    (searchParams.get('sortBy') as 'newest' | 'price-asc' | 'price-desc' | 'name') || 'newest'
  );

  // Apply filters - update URL
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sortBy !== 'newest') params.set('sortBy', sortBy);

    const queryString = params.toString();
    router.push(`/catalog${queryString ? `?${queryString}` : ''}`);

    if (onFiltersChange) {
      onFiltersChange({
        search: search || undefined,
        category: category || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        sortBy,
      });
    }
  }, [search, category, minPrice, maxPrice, sortBy, router, onFiltersChange]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    router.push('/catalog');
  }, [router]);

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-foreground">Filtros</h3>

      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
          Buscar
        </label>
        <Input
          id="search"
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFilters();
          }}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Todas las categorías</option>
          {Object.values(PRODUCT_CATEGORIES).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price filter */}
      {showPriceFilter && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Rango de precio</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
            <Input
              type="number"
              placeholder="Máx"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-foreground mb-2">
          Ordenar por
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'name')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="newest">Más recientes</option>
          <option value="name">Por nombre (A-Z)</option>
          <option value="price-asc">Precio (menor a mayor)</option>
          <option value="price-desc">Precio (mayor a menor)</option>
        </select>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Aplicar filtros
        </Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">
          Limpiar
        </Button>
      </div>
    </Card>
  );
}
