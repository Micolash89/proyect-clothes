# AGENTS.md

> Instrucciones para agentes de IA que trabajen en este proyecto.
> Leé este archivo completo antes de escribir o modificar cualquier código.

---

## 🗂️ Stack & Entorno

- **Framework**: Next.js (App Router) con TypeScript estricto
- **Package manager**: `pnpm` — nunca uses `npm` ni `yarn`
- **OS del desarrollador**: Windows 11, terminal PowerShell
- **Rutas de proyecto**: bajo `D:\programacion\`

### Comandos esenciales

```bash
pnpm install          # instalar dependencias
pnpm dev              # servidor de desarrollo
pnpm build            # build de producción
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm test             # correr tests (Jest + React Testing Library)
pnpm test --watch     # modo watch
```

> Antes de dar una tarea por terminada, asegurate de que `pnpm lint` y `pnpm typecheck` pasen sin errores.

---

## 📐 Referencia de Diseño — PDF de Especificaciones

El proyecto cuenta con especificaciones visuales en PDF ubicadas en:

```
public/
└── preview/
    ├── desktop.pdf   # diseño para pantallas ≥ 1024px
    └── mobile.pdf    # diseño para pantallas < 768px
```

### Reglas de uso del PDF

- **Antes de crear cualquier componente visual**, consultá ambos PDFs para respetar layout, tipografía, colores y espaciado definidos ahí.
- Si el PDF y el código existente difieren, el **PDF es la fuente de verdad** para decisiones de diseño.
- Implementá **mobile-first**: comenzá siempre desde `mobile.pdf` y luego aplicá overrides para desktop.
- Respetá los breakpoints del PDF. Si no están explícitos, usá:
  - `sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px`
- Todo componente nuevo debe ser validado visualmente contra ambos PDFs antes de considerarse terminado.

---

## 📁 Estructura de carpetas

```
src/
├── app/                        # Rutas de Next.js App Router
│   ├── (auth)/                 # Grupo de rutas protegidas
│   ├── api/                    # Route Handlers
│   └── layout.tsx
├── components/
│   ├── ui/                     # Componentes genéricos y reutilizables
│   └── features/               # Componentes específicos de dominio
├── constants/                  # ⚠️ TODAS las constantes del proyecto van aquí
│   ├── database.constants.ts   # Nombres de colecciones, queries, índices
│   ├── api.constants.ts        # Endpoints, headers, códigos HTTP
│   ├── ui.constants.ts         # Textos, labels, placeholders, mensajes
│   ├── routes.constants.ts     # Rutas de navegación
│   └── [dominio].constants.ts  # Una por dominio según necesidad
├── hooks/                      # Custom hooks reutilizables
├── lib/                        # Configuraciones externas (db, auth, etc.)
├── services/                   # Lógica de acceso a datos / APIs externas
├── types/                      # Tipos e interfaces TypeScript globales
│   ├── database.types.ts       # Interfaces de entidades de base de datos
│   ├── api.types.ts            # Tipos de requests/responses
│   └── [dominio].types.ts      # Una por dominio
└── utils/                      # Funciones puras utilitarias
```

Seguí esta estructura siempre. No crees archivos fuera de `src/` salvo config de raíz.

---

## 📦 Convención de Constantes — Regla Crítica

Las constantes son **ciudadanas de primera clase** en este proyecto. Nunca se definen inline ni dentro de componentes, hooks o servicios.

### Regla absoluta

```ts
// ❌ MAL: constante dentro de un componente
export function UserCard() {
  const MAX_NAME_LENGTH = 50;     // ← NUNCA acá
  const DB_COLLECTION = 'users';  // ← NUNCA acá
}

// ❌ MAL: constante en un archivo que no es constants/
// services/userService.ts
const COLLECTION_NAME = 'users'; // ← NUNCA acá

// ✅ BIEN: en su archivo de constantes correspondiente
// constants/database.constants.ts
export const DB_COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
} as const;
```

### Criterio para elegir el archivo correcto

| Tipo de constante | Archivo |
|---|---|
| Nombres de colecciones, queries, índices de DB | `constants/database.constants.ts` |
| URLs de endpoints, headers HTTP, códigos de estado | `constants/api.constants.ts` |
| Textos de UI, labels, placeholders, mensajes de error | `constants/ui.constants.ts` |
| Rutas de navegación (`/dashboard`, `/login`) | `constants/routes.constants.ts` |
| Constantes de un dominio específico (ej: pagos, roles) | `constants/[dominio].constants.ts` |

### Interfaces de las constantes

Cada archivo de constantes puede tener su archivo de tipos correspondiente en `src/types/`:

```ts
// types/database.types.ts
export interface DbCollectionConfig {
  name: string;
  indexes: string[];
}

// constants/database.constants.ts
import type { DbCollectionConfig } from '@/types/database.types';

export const USERS_COLLECTION: DbCollectionConfig = {
  name: 'users',
  indexes: ['email', 'createdAt'],
} as const;
```

### Nombrado de constantes

- Siempre en `UPPER_SNAKE_CASE`.
- Agrupadas en objetos cuando son del mismo dominio — no exportes decenas de constantes sueltas.
- Usá `as const` para garantizar tipos literales e inmutabilidad.

```ts
// ✅ BIEN: agrupadas, tipadas y con as const
export const API_ENDPOINTS = {
  USERS: {
    GET_ALL:   '/api/users',
    GET_BY_ID: (id: string) => `/api/users/${id}`,
    CREATE:    '/api/users',
  },
  PRODUCTS: {
    GET_ALL: '/api/products',
  },
} as const;
```

---

## 🧱 Principios SOLID — Aplicación Práctica

Estos principios son **obligatorios**. Aplicarlos no es opcional.

### S — Single Responsibility Principle
Cada módulo, componente, hook o función tiene **una sola razón para cambiar**.

```ts
// ❌ MAL: un componente que fetcha, valida y renderiza
export function UserCard() {
  const [user, setUser] = useState(null);
  useEffect(() => { fetch('/api/user').then(...) }, []);
  if (!user?.email.includes('@')) return <p>Email inválido</p>;
  return <div>{user.name}</div>;
}

// ✅ BIEN: responsabilidades separadas
// services/userService.ts    → fetching
// hooks/useUser.ts           → estado y efecto
// utils/validators.ts        → validación
// components/ui/UserCard.tsx → solo renderizado
```

### O — Open/Closed Principle
El código está **abierto para extensión, cerrado para modificación**.

```ts
// ❌ MAL: cada nuevo tipo requiere modificar la función
function getButtonStyle(type: string) {
  if (type === 'primary') return 'bg-blue-500';
  if (type === 'danger')  return 'bg-red-500';
}

// ✅ BIEN: mapa de variantes extensible sin tocar el componente
const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white',
  danger:  'bg-red-500 text-white',
  ghost:   'bg-transparent border border-current',
};
```

### L — Liskov Substitution Principle
Los componentes hijos deben poder usarse en lugar de su abstracción sin romper nada.

```ts
// ✅ BIEN: IconButton extiende Button sin romper su contrato
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}
```

### I — Interface Segregation Principle
No obligues a un módulo a depender de lo que no usa. Preferí interfaces pequeñas y específicas.

```ts
// ❌ MAL: interfaz gigante
interface UserRepository {
  getById(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  create(data: CreateUserDto): Promise<User>;
  exportToCsv(): Promise<string>; // ← el repo no debería saber de CSV
}

// ✅ BIEN: interfaces segregadas
interface UserReader   { getById(id: string): Promise<User>; getAll(): Promise<User[]>; }
interface UserWriter   { create(data: CreateUserDto): Promise<User>; }
interface UserExporter { exportToCsv(): Promise<string>; }
```

### D — Dependency Inversion Principle
Los módulos de alto nivel dependen de abstracciones, no de implementaciones concretas.

```ts
// ❌ MAL: acoplado a Mongo
import { MongoUserRepository } from '@/services/MongoUserRepository';
export function useUsers() {
  const repo = new MongoUserRepository(); // ← acoplamiento duro
}

// ✅ BIEN: depende de la abstracción
interface IUserRepository { getAll(): Promise<User[]>; }
export function useUsers(repo: IUserRepository) { ... }
```

---

## ♻️ Reutilización de Código

### Antes de escribir algo nuevo
1. Buscá en `src/components/ui/` si ya existe un componente similar.
2. Buscá en `src/hooks/` si ya hay un hook para ese patrón.
3. Buscá en `src/utils/` si la función pura ya existe.
4. Buscá en `src/constants/` si la constante ya está definida.
5. Si no existe: **crealo genérico desde el principio**, no acoplado al caso específico.

### Tabla de extracción

| Si repetís algo… | Extraelo a… |
|---|---|
| Lógica de estado + efectos | `src/hooks/use[Nombre].ts` |
| Llamadas a API | `src/services/[dominio]Service.ts` |
| Función pura sin side effects | `src/utils/[nombre].ts` |
| Bloque JSX reutilizable | `src/components/ui/[Nombre].tsx` |
| Tipos compartidos | `src/types/[dominio].types.ts` |
| Valores fijos o strings literales | `src/constants/[dominio].constants.ts` |

### Composición sobre herencia

```tsx
// ✅ Composición
<Card>
  <Card.Header>Título</Card.Header>
  <Card.Body>Contenido</Card.Body>
  <Card.Footer>Acciones</Card.Footer>
</Card>
```

---

## 🔷 Convenciones TypeScript

- `strict: true` en `tsconfig.json` — no lo desactivés.
- **Prohibido** usar `any`. Usá `unknown` con narrowing si es necesario.
- Preferí `interface` para objetos/componentes, `type` para uniones y utilidades.
- Todos los props de componentes tienen su propia interface con sufijo `Props`.
- Exportá los tipos reutilizables desde `src/types/`.
- Usá `as const` en todos los objetos de constantes.

```ts
interface UserCardProps { ... }
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };
```

---

## 🧩 Convenciones de Componentes

- Un componente por archivo, mismo nombre en PascalCase.
- Componentes en `src/components/ui/` son **puros y sin lógica de negocio**.
- Los Server Components son el default — usá `'use client'` solo cuando sea estrictamente necesario.
- Custom hooks empiezan con `use` y viven en `src/hooks/`.
- Textos hardcodeados (labels, placeholders, mensajes) van en `constants/ui.constants.ts`, no inline.

```tsx
// ✅ Estructura estándar
import type { ButtonProps } from '@/types/ui.types';
import { UI_LABELS } from '@/constants/ui.constants';

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants[variant]} {...props}>
      {children}
    </button>
  );
}
```

---

## 🎨 Estilo y Accesibilidad

- Implementá **mobile-first**: estilos base para mobile, overrides para desktop.
- Usá HTML semántico (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`).
- Toda imagen necesita `alt` descriptivo. Imágenes decorativas: `alt=""`.
- Los modales necesitan: foco al abrirse, `Escape` para cerrar, foco de retorno al trigger, `aria-hidden` en el fondo.
- Los formularios necesitan `<label>` por campo, errores con `aria-describedby`.
- Antes de crear cualquier componente visual, consultá `public/preview/desktop.pdf` y `public/preview/mobile.pdf`.

---

## 🤝 Estilo de Colaboración

- Antes de implementar, presentá opciones con sus trade-offs y dejá que el desarrollador elija.
- Cuando revisés código: señalá lo que está bien antes de sugerir mejoras.
- Si algo tiene múltiples enfoques válidos, no elijas por el desarrollador.
- Preguntá el razonamiento antes de sugerir cambios arquitecturales.
- Apuntá a recursos autoritativos (MDN, web.dev) cuando un concepto necesita más profundidad.

---

## 🧪 Testing

- Tests con **Jest** + **React Testing Library**.
- Los archivos de test van junto al módulo: `Button.test.tsx` al lado de `Button.tsx`.
- Testeá **comportamiento**, no implementación interna.
- Cubrí: estado inicial, interacciones principales y casos de error.

```ts
describe('Button', () => {
  it('llama a onClick cuando se hace clic', () => { ... });
  it('no llama a onClick cuando está disabled', () => { ... });
  it('aplica la variante visual correcta', () => { ... });
});
```

---

## 🚫 Prohibiciones Explícitas

- ❌ No uses `npm` ni `yarn`. Solo `pnpm`.
- ❌ No uses `any` en TypeScript.
- ❌ No definas constantes dentro de componentes, hooks o servicios.
- ❌ No definas constantes fuera de `src/constants/`.
- ❌ No pongas lógica de negocio en componentes de UI.
- ❌ No hagas fetch directamente en componentes cliente — usá un service o un hook.
- ❌ No dupliques código existente en `utils/`, `hooks/`, `components/ui/` o `constants/`.
- ❌ No uses `'use client'` innecesariamente.
- ❌ No ignores las especificaciones visuales de `public/preview/`.
- ❌ No uses `// eslint-disable` sin comentario que justifique por qué.

---

## ✅ Checklist antes de cada commit

- [ ] Consultados `public/preview/desktop.pdf` y `public/preview/mobile.pdf` para componentes visuales
- [ ] Todas las constantes nuevas están en `src/constants/[dominio].constants.ts`
- [ ] Todos los tipos nuevos están en `src/types/[dominio].types.ts`
- [ ] `pnpm typecheck` pasa sin errores
- [ ] `pnpm lint` pasa sin errores ni warnings ignorados
- [ ] `pnpm test` pasa en verde
- [ ] No hay `any`, no hay constantes inline, no hay lógica duplicada
- [ ] El diseño respeta mobile-first y es accesible por teclado