'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { HeaderCartBadge } from './HeaderCartBadge';

/**
 * HeaderClient Component
 * - Cart icon with link and badge
 * - Theme toggle button
 * - Mobile menu trigger (future)
 */
export function HeaderClient() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center gap-4">
      {/* Cart icon with badge */}
      <HeaderCartBadge />

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
