import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { ROUTES } from '@/constants/routes.constants';

export async function proxy(request: NextRequest) {
  // Proteger rutas /admin/* con JWT validation
  // Nota: validación optimista - JWT real se valida en Server Actions
  
  const { pathname } = request.nextUrl;
  
  // Permitir acceso directo a /admin/login sin JWT
  if (pathname === ROUTES.ADMIN_LOGIN) {
    return NextResponse.next();
  }
  
  // Para todas las demás rutas admin, validar token JWT
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) {
    // No hay token - redirigir a login
    return NextResponse.redirect(new URL(ROUTES.ADMIN_LOGIN, request.url));
  }
  
  try {
    // Validar JWT (verifyJwt retorna null si es inválido)
    const payload = await verifyJwt(token);
    
    if (!payload) {
      throw new Error('Token inválido');
    }
    
    // Token válido - continuar a la ruta
    return NextResponse.next();
  } catch {
    // Token inválido o expirado - redirigir a login
    const response = NextResponse.redirect(new URL(ROUTES.ADMIN_LOGIN, request.url));
    // Limpiar cookie inválida
    response.cookies.delete('admin_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
