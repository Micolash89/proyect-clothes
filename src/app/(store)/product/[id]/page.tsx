import Image from 'next/image';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProductOptions } from '@/components/features/products/ProductOptions';
import { Card } from '@/components/ui/card';
import { getMongoDb } from '@/lib/mongodb';
import { ProductService } from '@/services/products.service';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Product Detail Page
 * - Imagen del producto
 * - Información completa
 * - Selector de talle y cantidad
 * - Descripción
 * - Diseños predefinidos (en próximos pasos)
 */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const db = await getMongoDb();
  const productService = new ProductService(db);
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product image */}
          <div className="flex items-start">
            <div className="relative h-96 w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            {/* Breadcrumb/Category */}
            <div className="text-sm font-medium text-muted-foreground uppercase">
              {product.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            {/* Price */}
            {product.showPrice ? (
              <div className="space-y-2">
                {product.discountPrice && product.discountPrice < (product.basePrice ?? 0) ? (
                  <>
                    <p className="text-lg line-through text-muted-foreground">
                      ${product.basePrice?.toFixed(2)}
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      ${product.discountPrice.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {product.basePrice ? `$${product.basePrice.toFixed(2)}` : 'Consultar precio'}
                  </p>
                )}
              </div>
            ) : (
              <Card className="bg-primary/10 p-4 text-center">
                <p className="font-medium text-primary">Consultar disponibilidad y precio</p>
              </Card>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* Available sizes info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Talles disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <span
                    key={size}
                    className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

              {/* Product options (size, quantity, add to cart) */}
              <div className="rounded-lg border border-border p-6">
                <ProductOptions
                  product={{
                    _id: product._id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    basePrice: product.basePrice,
                    discountPrice: product.discountPrice,
                    showPrice: product.showPrice,
                  }}
                  availableSizes={product.sizes}
                />
              </div>

            {/* Features / Info cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-sm font-medium">Envío rápido</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-sm font-medium">Personalizable</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;

  try {
    const db = await getMongoDb();
    const productService = new ProductService(db);
    const product = await productService.getProductById(id);

    if (!product) return { title: 'Producto no encontrado' };

    return {
      title: `${product.name} | Tienda Sublimación`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.imageUrl }],
      },
    };
  } catch {
    return { title: 'Error al cargar producto' };
  }
}
