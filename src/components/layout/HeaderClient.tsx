'use client';

import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';

/**
 * HeaderClient Component
 * - Cart icon with link
 * - Theme toggle button
 * - Mobile menu trigger (future)
 */
export function HeaderClient() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center gap-4">
      {/* Cart icon */}
      <Link
        href={ROUTES.CART}
        className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title={UI_LABELS.CART}
      >
        <span className="text-xl">🛒</span>
        {/* Cart badge (future: show item count) */}
      </Link>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title={`Cambiar a ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label={`Cambiar a ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <span className="text-xl">☀️</span>
        ) : (
          <span className="text-xl">🌙</span>
        )}
      </button>
    </div>
  );
}
