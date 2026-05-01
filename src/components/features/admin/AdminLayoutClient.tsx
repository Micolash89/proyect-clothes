'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logoutAdmin } from '@/actions/auth.actions';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';

interface AdminLayoutClientProps {
  children: ReactNode;
}

/**
 * Layout del admin - lado cliente
 * - Sidebar con navegación
 * - Botón de logout
 * - Navigation activa
 */
export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Productos',
      href: ROUTES.ADMIN_PRODUCTS,
      icon: '📦',
    },
    {
      label: 'Diseños',
      href: ROUTES.ADMIN_DESIGNS,
      icon: '🎨',
    },
    {
      label: 'Galería',
      href: ROUTES.ADMIN_GALLERY,
      icon: '🖼️',
    },
    {
      label: 'Pedidos',
      href: ROUTES.ADMIN_ORDERS,
      icon: '📋',
    },
    {
      label: 'Configuración',
      href: ROUTES.ADMIN_SETTINGS,
      icon: '⚙️',
    },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      try {
        await logoutAdmin();
        router.replace(ROUTES.HOME);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card shadow-sm">
        {/* Header */}
        <div className="border-b border-border px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">{UI_LABELS.DASHBOARD}</h1>
          <p className="text-xs text-muted-foreground">Panel de administración</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="w-full rounded-md bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            {UI_LABELS.LOGOUT}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
