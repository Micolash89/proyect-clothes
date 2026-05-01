'use client';

import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Toaster Component
 * Integra Sonner con el tema dark mode
 */
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme as 'light' | 'dark'}
      richColors
      position="top-right"
      closeButton
      expand={false}
      style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--foreground))',
      }}
    />
  );
}
