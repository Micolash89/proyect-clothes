import { Suspense } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { GalleryGrid } from '@/components/features/gallery/GalleryGrid';
import { getMongoDb } from '@/lib/mongodb';
import { GalleryService } from '@/services/gallery.service';

/**
 * Gallery Page
 * - Server component
 * - Fetches gallery items from MongoDB
 * - GalleryGrid with Suspense fallback
 */
export default async function GalleryPage() {
  async function fetchGalleryItems() {
    try {
      const db = await getMongoDb();
      const service = new GalleryService(db);
      const items = await service.listActiveGalleryItems();
      return items;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  }

  const galleryItems = await fetchGalleryItems();

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Galería de Trabajos</h1>
          <p className="mt-2 text-muted-foreground">
            Explora nuestros trabajos anteriores y déjate inspirar por nuestras creaciones
          </p>
        </div>

        {/* Gallery Grid */}
        <section>
          {galleryItems.length > 0 ? (
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse rounded-lg bg-muted h-64" />
                  ))}
                </div>
              }
            >
              <GalleryGrid items={galleryItems} />
            </Suspense>
          ) : (
            <div className="rounded-lg border border-border bg-muted/50 p-12 text-center">
              <p className="text-muted-foreground">No hay trabajos disponibles en este momento.</p>
            </div>
          )}
        </section>
      </div>
    </PublicLayout>
  );
}

export const metadata = {
  title: 'Galería | Tienda Sublimación',
  description: 'Descubre nuestros trabajos anteriores y creaciones personalizadas',
};
