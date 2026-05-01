'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@/components/ui/dialog';
import type { GalleryItem } from '@/types/database.types';

interface GalleryGridProps {
  items: GalleryItem[];
}

/**
 * GalleryGrid Component
 * - Grid de imágenes de galería
 * - Modal para ver en grande
 * - Click para abrir modal
 */
export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openImage = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item._id?.toString()}
            onClick={() => openImage(item)}
            className="relative h-64 overflow-hidden rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/30 flex items-end justify-start p-4">
              <h3 className="font-semibold text-white opacity-0 transition-opacity hover:opacity-100">
                {item.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <div className="space-y-4">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 90vw"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{selectedItem.title}</h2>
              {selectedItem.description && (
                <p className="mt-2 text-muted-foreground">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
