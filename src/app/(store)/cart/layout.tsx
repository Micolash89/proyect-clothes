import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito de Compras | Tienda Sublimación',
  description: 'Revisa y confirma los productos en tu carrito',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
