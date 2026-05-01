import { ReactNode } from 'react';
import { AdminLayoutClient } from '@/components/features/admin/AdminLayoutClient';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout del admin (server component)
 * Envuelve AdminLayoutClient que es el componente con interactividad
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

export const metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow', // No indexar páginas admin
};
