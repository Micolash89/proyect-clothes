import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes.constants';
import { AdminLoginForm } from '@/components/features/admin/AdminLoginForm';

/**
 * Página de login del panel admin
 * - Formulario para ingresar email + password
 * - Llamadas al server action loginAdmin
 * - Sin validación de JWT (proxy.ts lo permite sin token)
 */
export default async function AdminLoginPage() {
  // Si ya estás autenticado y accedes a /admin/login, redirige a /admin/products
  // Esto se maneja en el cliente con useEffect + router en AdminLoginForm

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para acceder al panel de administración
          </p>
        </div>

        <AdminLoginForm />

        <div className="text-center text-xs text-muted-foreground">
          <p>Solo para administradores del sistema</p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Admin Login | Tienda Sublimación',
  description: 'Ingresa a tu cuenta de administrador',
  robots: 'noindex, nofollow', // No indexar página de login
};
