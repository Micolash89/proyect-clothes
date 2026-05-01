import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // TODO: Implementar validación de JWT para rutas /admin/*
  // Por ahora permite todo
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
