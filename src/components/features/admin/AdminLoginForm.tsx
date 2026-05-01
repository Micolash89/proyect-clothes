'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/actions/auth.actions';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';

interface LoginState {
  error?: string;
}

/**
 * Formulario de login del admin
 * - Email + Password
 * - Manejo de errores con useActionState (React 19)
 * - Redirección automática al éxito
 */
export function AdminLoginForm() {
  const router = useRouter();

  // Wrapper para loginAdmin que retorna estado compatible
  async function handleLogin(prevState: LoginState, formData: FormData) {
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (!email || !password) {
        return { error: 'Email y contraseña son requeridos' };
      }

      // Llamar al server action con los argumentos esperados
      const result = await loginAdmin(email, password);

      if (result.success) {
        // Redirigir a dashboard (el redirect sucede después de que useActionState termina)
        router.replace(ROUTES.ADMIN_PRODUCTS);
      }

      return { error: undefined };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar sesión';
      return { error: message };
    }
  }

  const [state, formAction, isPending] = useActionState(handleLogin, {
    error: undefined,
  });

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          {UI_LABELS.EMAIL}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={UI_LABELS.EMAIL}
          aria-describedby={state?.error ? 'error-message' : undefined}
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          {UI_LABELS.PASSWORD}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={UI_LABELS.PASSWORD}
          aria-describedby={state?.error ? 'error-message' : undefined}
        />
      </div>

      {/* Error message */}
      {state?.error && (
        <div
          id="error-message"
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
