import Link from 'next/link';
import { ROUTES } from '@/constants/routes.constants';
import { env } from '@/lib/env';

/**
 * Footer Component
 * - Links
 * - Social media
 * - Copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Sobre Nosotros</h3>
            <p className="text-sm text-muted-foreground">
              Tienda especializada en sublimación personalizada. Diseña tus prendas favoritas con
              los mejores diseños.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CATALOG}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.GALLERY}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Síguenos</h3>
            <div className="flex gap-4">
              {env.public.whatsappUrl && (
                <a
                  href={env.public.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="WhatsApp"
                >
                  <span className="text-xl">💬</span>
                </a>
              )}
              {env.public.instagramUrl && (
                <a
                  href={env.public.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Instagram"
                >
                  <span className="text-xl">📸</span>
                </a>
              )}
              {env.public.facebookUrl && (
                <a
                  href={env.public.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Facebook"
                >
                  <span className="text-xl">👍</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>© {currentYear} Tienda de Sublimación. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
