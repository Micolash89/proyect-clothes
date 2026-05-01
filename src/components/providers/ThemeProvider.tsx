'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider - Maneja dark mode
 * - Persiste preferencia en localStorage
 * - Respeta preferencia del sistema
 * - Sincroniza con .dark class en html
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme-preference',
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Detectar tema del sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Resolver tema final (si es 'system', usar preferencia del SO)
  const getResolvedTheme = (t: Theme): 'light' | 'dark' => {
    return t === 'system' ? getSystemTheme() : t;
  };

  // Aplicar tema al DOM
  const applyTheme = (t: Theme) => {
    const resolved = getResolvedTheme(t);
    setResolvedTheme(resolved);

    // Actualizar clase en html
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Persistir preferencia
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, t);
    }
  };

  // Inicializar al montar
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const initial = stored || defaultTheme;
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, [defaultTheme, storageKey]);

  // Escuchar cambios de preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  // No renderizar hasta estar montado (hidratación)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}
