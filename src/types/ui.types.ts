/**
 * TIPOS DE UI
 * Props de componentes, estados locales
 */

// Estado de carrito local
export interface CartUIState {
  isOpen: boolean;
  itemCount: number;
  isLoading: boolean;
}

// Formulario de diseño
export interface DesignFormState {
  mode: 'predefined' | 'custom';
  selectedDesignId?: string;
  customDescription?: string;
  logoPosition?: string;
}

// Filtros de catálogo (UI)
export interface CatalogFilterState {
  selectedCategory: string | 'all';
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name';
  page: number;
}

// Selección de producto
export interface ProductSelectionState {
  productId: string;
  selectedSize: string;
  quantity: number;
}

// Variantes de componentes
export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'link';

export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

// Props base para componentes
export interface BaseComponentProps {
  className?: string;
}
