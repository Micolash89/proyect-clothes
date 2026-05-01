'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';

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
  const [themeState, setThemeState] = useState<{ theme: Theme; resolvedTheme: 'light' | 'dark'; mounted: boolean }>({
    theme: defaultTheme,
    resolvedTheme: 'light',
    mounted: false,
  });

  const initRef = useRef(false);

  // Detectar tema del sistema
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Resolver tema final (si es 'system', usar preferencia del SO)
  const getResolvedTheme = useCallback((t: Theme): 'light' | 'dark' => {
    return t === 'system' ? getSystemTheme() : t;
  }, [getSystemTheme]);

  // Aplicar tema al DOM
  const applyTheme = useCallback((t: Theme) => {
    const resolved = getResolvedTheme(t);

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

    return resolved;
  }, [getResolvedTheme, storageKey]);

  // Inicializar al montar
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const stored = localStorage.getItem(storageKey) as Theme | null;
      const initial = stored || defaultTheme;
      const resolved = applyTheme(initial);
      setThemeState({ theme: initial, resolvedTheme: resolved, mounted: true });
    }
  }, [defaultTheme, storageKey, applyTheme]);

  // Escuchar cambios de preferencia del sistema
  useEffect(() => {
    if (!themeState.mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (themeState.theme === 'system') {
        const resolved = applyTheme('system');
        setThemeState((prev) => ({ ...prev, resolvedTheme: resolved }));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeState.theme, themeState.mounted, applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const resolved = applyTheme(newTheme);
      setThemeState((prev) => ({ ...prev, theme: newTheme, resolvedTheme: resolved }));
    },
    [applyTheme]
  );

  // No renderizar hasta estar montado (hidratación)
  if (!themeState.mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme: themeState.theme, resolvedTheme: themeState.resolvedTheme, setTheme }}>
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
