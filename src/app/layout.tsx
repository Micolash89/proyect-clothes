import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import './globals.css';

/**
 * Root Layout
 * Punto de entrada global de la aplicación
 * - ThemeProvider para dark mode
 * - Toaster para notificaciones
 * - Metadata global
 */

export const metadata: Metadata = {
  title: 'Tienda de Sublimación Personalizada',
  description: 'Diseña y personaliza tus prendas con sublimación',
  keywords: ['sublimación', 'personalización', 'remeras', 'tazas', 'gorras'],
  authors: [{ name: 'Tienda Sublimación' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Tienda de Sublimación Personalizada',
    description: 'Diseña y personaliza tus prendas con sublimación',
    siteName: 'Tienda Sublimación',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full scroll-smooth antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
          <CartProvider>
            {children}
            <Toaster />
            <SonnerToaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
