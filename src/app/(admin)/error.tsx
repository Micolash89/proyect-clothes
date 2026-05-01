'use client';

import { useEffect } from 'react';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary para rutas admin
 * Captura errores de server actions y componentes
 */
export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    // Log error para debugging
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">Error en Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              Ocurrió un error al procesar tu solicitud
            </p>
          </div>

          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-xs text-destructive">
              {error.message || 'Error desconocido. Por favor intenta de nuevo.'}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">Error ID: {error.digest}</p>
            )}
          </div>

          <button
            onClick={reset}
            className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}
