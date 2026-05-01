import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(_request: NextRequest) {
  // TODO: Implementar chequeos optimistas de permisos (cookie JWT existe)
  // Por ahora permite todo
  // Nota: autenticación REAL va en Server Actions o Route Handlers, no aquí
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
