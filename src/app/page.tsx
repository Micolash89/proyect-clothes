import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes.constants';
import Link from 'next/link';

/**
 * Home Page
 * Landing page principal con hero section
 */
export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Diseña y Personaliza
            <span className="block text-primary">Tus Prendas Favoritas</span>
          </h1>
          <p className="text-lg text-muted-foreground md:max-w-lg">
            Sublimación de calidad con diseños personalizados. Remeras, tazas, gorras y más.
            Crea productos únicos para ti, tu familia o tu negocio.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:gap-3 md:pt-4">
            <Link href={ROUTES.CATALOG}>
              <Button size="lg" className="w-full md:w-auto">
                Ver Catálogo
              </Button>
            </Link>
            <Link href={ROUTES.GALLERY}>
              <Button size="lg" variant="outline" className="w-full md:w-auto">
                Ver Galería
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">¿Por Qué Nosotros?</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '⚡',
                title: 'Rápido',
                description: 'Entregas rápidas y seguras directamente a tu puerta.',
              },
              {
                icon: '✨',
                title: 'Calidad',
                description: 'Sublimación de alta calidad con colores vibrantes que duran.',
              },
              {
                icon: '🎨',
                title: 'Personalización',
                description: 'Diseña exactamente lo que imaginas con nuestro editor.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="space-y-3 rounded-lg border border-border bg-background p-6 text-center"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-lg border border-border bg-primary/5 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            ¿Listo para comenzar?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Explora nuestro catálogo y crea tu primer diseño personalizado.
          </p>
          <Link href={ROUTES.CATALOG}>
            <Button size="lg">Empezar Ahora</Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

export const metadata = {
  title: 'Tienda de Sublimación Personalizada | Inicio',
  description: 'Diseña y personaliza tus prendas con sublimación. Calidad garantizada.',
};
