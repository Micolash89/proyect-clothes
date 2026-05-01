# Proyect Clothes - Tienda de Sublimación Personalizada

Aplicación web para gestionar venta y pedidos de productos sublimados (remeras, vasos, gorras, etc.) con panel de administración integrado.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router) con TypeScript estricto
- **Base de datos**: MongoDB
- **Autenticación Admin**: JWT
- **UI/Components**: shadcn/ui + Tailwind CSS (dark mode)
- **Package manager**: `pnpm`
- **Validación**: Zod
- **Animaciones**: Framer Motion

## Estructura del Proyecto

```
src/
├── app/                    # Rutas Next.js App Router
│   ├── (store)/           # Rutas públicas (tienda)
│   ├── (admin)/           # Rutas protegidas (admin)
│   └── layout.tsx
├── actions/               # Server Actions (mutaciones)
├── components/
│   ├── ui/               # Componentes reutilizables (shadcn)
│   └── features/         # Componentes específicos de dominio
├── constants/            # Constantes centralizadas (UPPER_SNAKE_CASE)
├── hooks/                # Custom hooks reutilizables
├── lib/                  # Configuraciones externas (DB, auth, etc.)
├── services/             # Lógica de acceso a datos / APIs
├── types/                # Tipos TypeScript globales
└── utils/                # Funciones puras utilitarias
```

## Primeros Pasos

### Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores (MongoDB URI, JWT_SECRET, etc.)
```

### Desarrollo

```bash
# Servidor de desarrollo
pnpm dev

# Linting
pnpm lint

# Type checking
pnpm typecheck

# Tests
pnpm test
pnpm test:watch
```

### Build

```bash
# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## Convenciones del Proyecto

### Constantes
- Todas las constantes van en `src/constants/[dominio].constants.ts`
- Formato: `UPPER_SNAKE_CASE`
- Agrupar por dominio (no constantes sueltas)
- Usar `as const` para tipos literales

### Componentes
- Componentes presentacionales en `src/components/ui/`
- Componentes de feature en `src/components/features/`
- Un componente por archivo (mismo nombre en PascalCase)
- Props con interface sufijo `Props`

### Server Actions
- Todas las mutaciones en `src/actions/[dominio].actions.ts`
- Usar `'use server'` directive
- Validar con Zod antes de mutar

### TypeScript
- `strict: true` - no usar `any`
- Interfaces para objetos/componentes, `type` para uniones
- Exportar tipos reutilizables desde `src/types/`

### Accesibilidad
- HTML semántico (`<nav>`, `<main>`, `<section>`)
- Toda imagen con `alt` descriptivo
- Formularios con `<label>` por campo
- Dark mode obligatorio (Tailwind + CSS variables)

## Modelo de Datos

### Productos
- `name`, `category`, `description`
- `imageUrl` (Imgur)
- `price` (opcional según visibilidad configurada)
- `sizes[]` (S, M, L, XL, etc.)
- `isActive` (baja lógica)

### Diseños Predefinidos
- `name`, `category`, `imageUrl`
- Gestionados desde panel admin

### Galería de Trabajos
- `imageUrl`, `description`, `category`
- Sección separada del catálogo

### Pedidos
- `orderCode` (ej: #00123) - ID único legible
- Cliente: nombre, WhatsApp (sin registro requerido)
- Producto, talle, cantidad
- Diseño: predefinido o personalizado
- `status`: pendiente → señado → en producción → entregado
- Campo `userId` (opcional para futura auth de clientes)

## Funcionalidades

### Cliente (Público)
- Catálogo filtrable por categoría
- Galería de trabajos anteriores
- Selección de producto, talle, cantidad
- Elección de diseño (predefinido o personalizado)
- Carrito sin registro
- Checkout mínimo (nombre + WhatsApp)
- Confirmación por WhatsApp (`wa.me`)

### Admin (Protegido con JWT)
- Login con email/password
- CRUD de productos (con baja lógica)
- CRUD de diseños predefinidos
- CRUD de galería
- Gestión de pedidos (cambio de estado)
- Toggle global de visibilidad de precios

## Variables de Entorno

```bash
MONGODB_URI=                    # URL de conexión a MongoDB
MONGODB_DB_NAME=               # Nombre de la base de datos
JWT_SECRET=                    # Clave secreta para firmar JWTs
JWT_EXPIRES_IN=                # Tiempo de expiración (ej: 7d)
ADMIN_EMAIL=                   # Email del admin
ADMIN_PASSWORD=                # Password del admin
NEXT_PUBLIC_SITE_URL=          # URL pública del sitio
NEXT_PUBLIC_WHATSAPP_URL=      # URL de WhatsApp (ej: https://wa.me/5491234567890)
NEXT_PUBLIC_INSTAGRAM_URL=     # URL de Instagram
NEXT_PUBLIC_FACEBOOK_URL=      # URL de Facebook
```

## Checklist Antes de Commit

- [ ] Lint pasa: `pnpm lint`
- [ ] Typecheck pasa: `pnpm typecheck`
- [ ] Tests pasan: `pnpm test`
- [ ] No hay imports sin usar
- [ ] Constantes centralizadas
- [ ] TypeScript sin `any`
- [ ] Respeta mobile-first de imágenes en `public/mobile/` y `public/desktop/`

## Recursos

- [AGENTS.md](./AGENTS.md) - Guía completa de arquitectura y convenciones
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [MongoDB](https://www.mongodb.com)

## Licencia

Proyecto privado.
