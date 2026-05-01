import Link from 'next/link';
import { ROUTES } from '@/constants/routes.constants';
import { UI_LABELS } from '@/constants/ui.constants';
import { HeaderClient } from './HeaderClient';

/**
 * Header Component (Server)
 * - Logo
 * - Navigation
 * - Cart icon
 * - Theme toggle
 */
export function Header() {
  const navLinks: Array<{ label: string; href: string }> = [
    { label: UI_LABELS.CATALOG, href: ROUTES.CATALOG },
    { label: UI_LABELS.GALLERY, href: ROUTES.GALLERY },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">🎨</span>
          <span>Sublimación</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section - Client Component */}
        <HeaderClient />
      </div>
    </header>
  );
}
