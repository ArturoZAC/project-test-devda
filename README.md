# Project Test DevDateP 🚀

Una aplicación web moderna construida con React, TypeScript y Vite que integra múltiples APIs para gestionar Pokémon, posts y comentarios. El proyecto es una prueba de concepto de arquitectura frontend escalable y buenas prácticas modernas.

## 📋 Descripción del Proyecto

**project-test-devdatep** es una aplicación fullstack que demuestra:

- Integración con APIs externas (PokeAPI, JSONPlaceholder)
- Gestión de estado con React Query
- Validación de formularios con React Hook Form + Zod
- UI moderna con Tailwind CSS
- Tipado seguro con TypeScript
- Enrutamiento con React Router v7

### Funcionalidades Principales

1. **🎮 Pokédex** - Explora Pokémon con búsqueda, grid y vista detallada
2. **📝 Posts** - Crear, ver y gestionar posts
3. **💬 Comentarios** - Sistema de comentarios asociados a posts
4. **👥 Gestión de Usuarios** - Integración con API de usuarios

---

## 🛠️ Tecnologías Principales

### Core

- **React** 19.2.6 - UI library
- **TypeScript** 6.0.2 - Type safety
- **Vite** 8.0.12 - Modern bundler

### Enrutamiento y State Management

- **React Router DOM** 7.15.1 - Client-side routing
- **TanStack React Query** 5.100.11 - Data fetching y caching

### Validación y Formularios

- **React Hook Form** 7.76.0 - Gestión de formularios
- **Zod** 4.4.3 - Validación de esquemas

### Styling

- **Tailwind CSS** 4.3.0 - Utility-first CSS
- **Tailwind Merge** 3.6.0 - Merge de clases
- **Class Variance Authority** 0.7.1 - Component variants

### Librerías de UI

- **shadcn** 4.8.0 - Componentes de UI
- **Tabler Icons React** 3.44.0 - Icon library
- **Lucide React** 1.16.0 - Modern icons

### Utilidades

- **Axios** 1.16.1 - HTTP client
- **Framer Motion** 12.40.0 - Animaciones
- **Sonner** 2.0.7 - Toast notifications
- **Fontsource Variable Geist** 5.2.9 - Custom fonts

### Desarrollo

- **ESLint** 10.3.0 - Linting
- **Babel** 7.29.0 - Transpiling
- **React Compiler** - Optimizaciones automáticas

---

## 📦 Requisitos Previos

- **Node.js** 18+ (recomendado 20 LTS)
- **pnpm** 8+ (package manager)

Verifica las versiones:

```bash
node --version
pnpm --version
```

---

## 🚀 Instalación y Configuración

### 1. Instalar todas las dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O si prefieres npm
npm install

# O yarn
yarn install
```

### 2. Comandos disponibles

```bash
# Iniciar servidor de desarrollo (con HMR)
pnpm dev

# Compilar para producción
pnpm build

# Vista previa del build
pnpm preview

# Linting del código
pnpm lint
```

### 3. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (si es necesario):

```env
VITE_API_URL=https://pokeapi.co/api/v2
VITE_JSONPLACEHOLDER_URL=https://jsonplaceholder.typicode.com
```

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Arquitectura

El proyecto utiliza una **arquitectura de Features** (Feature-based) combinada con **Clean Architecture**:

```
src/
├── pages/           # Páginas y features principales
├── components/      # Componentes reutilizables
├── shared/          # Código compartido (APIs, tipos)
├── layout/          # Layouts
├── lib/             # Utilidades
└── router/          # Configuración de rutas
```

### Flujo de Datos

```
User Interaction
    ↓
React Components
    ↓
React Query (Data fetching)
    ↓
Axios (HTTP)
    ↓
External APIs (PokeAPI, JSONPlaceholder)
```

### Patrones Utilizados

1. **Custom Hooks** - Lógica encapsulada (`usePokemon`, `usePosts`, etc.)
2. **React Query** - Manejo de estado remoto y caching
3. **Component Composition** - Componentes pequeños y reutilizables
4. **Query Keys** - Estrategia centralizada de caching

---

## 📁 Estructura de Carpetas Detallada

### `src/pages/` - Features Principales

Cada página es una feature independiente con su propia estructura:

```
pages/
├── home/                      # Pokédex principal
│   ├── HomePage.tsx           # Componente principal
│   ├── components/
│   │   ├── PokemonGrid.tsx
│   │   ├── PokemonCard.tsx
│   │   ├── PokemonSkeleton.tsx
│   │   └── SearchBar.tsx
│   ├── hooks/
│   │   └── usePokemon.ts       # Lógica de búsqueda
│   └── schema/
│
├── pokemon-detail/            # Detalle de Pokémon
│   ├── PokemonDetailPage.tsx
│   ├── components/
│   │   └── StatBar.tsx
│   └── hooks/
│       └── usePokemonDetail.ts
│
├── posts/                      # Gestión de posts
│   ├── PostsPage.tsx
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   ├── PostModal.tsx
│   │   └── AssignCommentModal.tsx
│   ├── hooks/
│   │   └── usePosts.ts
│   └── schema/
│       └── post.schema.ts     # Validación con Zod
│
├── post-detail/               # Detalle y comentarios
│   ├── PostDetailPage.tsx
│   ├── components/
│   │   ├── PostComments.tsx
│   │   └── AddCommentForm.tsx
│   └── hooks/
│       └── usePostDetail.ts
│
└── comments/                  # Gestión de comentarios
    ├── CommentsPage.tsx
    ├── components/
    │   ├── CommentCard.tsx
    │   ├── CommentForm.tsx
    │   └── AddCommentForm.tsx
    ├── hooks/
    │   └── useComments.ts
    └── schema/
        └── comment.schema.ts
```

### `src/shared/` - Código Compartido

```
shared/
├── api/
│   ├── poke.api.ts           # Integración PokeAPI
│   ├── posts.api.ts          # Integración JSONPlaceholder
│   ├── comments.api.ts       # Gestión de comentarios
│   ├── users.api.ts          # Gestión de usuarios
│   └── query-keys.ts         # Claves centralizadas para React Query
├── helpers/
│   └── get-envs.helper.ts    # Gestión de variables de entorno
└── interfaces/
    ├── pokemon.interface.ts
    └── user.interface.ts
```

### `src/components/` - Componentes Globales

```
components/
├── ui/                        # UI primitivos (shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   └── textarea.tsx
└── Container.tsx              # Contenedor principal
```

### `src/router/` - Enrutamiento

```
AppRouter.tsx - Definición de todas las rutas:
  / → HomePage (Pokédex)
  /pokemon/:name → PokemonDetailPage (Detalle de Pokémon)
  /posts → PostsPage (Lista de posts)
  /posts/:id → PostDetailPage (Detalle y comentarios)
  /comments → CommentsPage (Todos los comentarios)
```

### `src/layout/` - Layout Principal

```
AppLayout.tsx - Layout envolvente con:
  - Navigation bar
  - Outlet para páginas
```

---

## 🔌 APIs Integradas

### 1. **PokeAPI** 🎮

- **URL Base**: `https://pokeapi.co/api/v2`
- **Endpoints**:
  - `GET /pokemon?limit=20&offset=0` - Lista paginada
  - `GET /pokemon/{name}` - Detalle completo
  - `GET /pokemon-species/{name}` - Especie y descripción

### 2. **JSONPlaceholder** 📝

- **URL Base**: `https://jsonplaceholder.typicode.com`
- **Endpoints**:
  - `GET /posts` - Todos los posts
  - `GET /posts/:id` - Detalle de post
  - `GET /comments?postId=:id` - Comentarios de post
  - `GET /users` - Todos los usuarios
  - `POST /posts` - Crear post
  - `POST /comments` - Crear comentario

---

## 🗂️ Query Keys Strategy

Centralizado en `src/shared/api/query-keys.ts`:

```typescript
{
  pokemon: {
    all: ["pokemon"],
    list: (page, search) => ["pokemon", "list", page, search],
    detail: (name) => ["pokemon", "detail", name]
  },
  comments: {
    all: ["comments"],
    byPost: (postId) => ["comments", "post", postId]
  },
  posts: {
    all: ["posts"],
    detail: (id) => ["posts", id]
  },
  users: {
    all: ["users"]
  }
}
```

---

## 📝 Validación con Zod

El proyecto utiliza Zod para validar esquemas:

- **Post Schema** (`src/pages/posts/schema/post.schema.ts`)
- **Comment Schema** (`src/pages/comments/schema/comment.schema.ts`)

Ejemplo:

```typescript
const postSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  body: z.string().min(10, "Mínimo 10 caracteres"),
  userId: z.number(),
});
```

---

## 🎨 Estilización

### Tailwind CSS v4

- Utility-first approach
- Config en `tailwind.config.js`
- Integrado con Vite via `@tailwindcss/vite`

### Componentes shadcn

- Componentes accesibles y customizables
- Ubicados en `src/components/ui/`

---

## 🔍 TypeScript Configuration

- **Target**: ES2020
- **JSX**: react-jsx
- **Strict Mode**: Habilitado
- **Path Alias**: `@/*` apunta a `src/`

---

## 🚀 Deploy

### Netlify (configurado)

El proyecto está listo para deploy en Netlify:

```bash
# Build production
pnpm build

# Los archivos en `dist/` están listos para deploy
```

Check `netlify.toml` para más configuraciones.

---

## 📚 Convenciones del Proyecto

1. **Nombres de Archivos**: PascalCase para componentes, camelCase para utils
2. **Componentes**: Functional components con hooks
3. **APIs**: Centralizado en `src/shared/api/`
4. **Schemas**: Colocado junto a la feature
5. **Hooks**: Prefijo `use` y ubicado en carpeta `hooks/`

---

## 🐛 Troubleshooting

### Problema: Los estilos de Tailwind no se aplican

**Solución**: Asegúrate que el servidor Vite está corriendo y los archivos están guardados.

### Problema: React Query no cachea

**Solución**: Revisa que estés usando las mismas `queryKeys` en toda la aplicación.

### Problema: Errores de TypeScript

**Solución**: `pnpm lint` mostrará los errores. Usa `@/` para imports relativos.

---

## 👨‍💻 Desarrollo

### Workflow típico:

1. Crea componentes en `src/components/`
2. Define hooks en `src/pages/[feature]/hooks/`
3. Crea APIs en `src/shared/api/`
4. Define validaciones con Zod
5. Implementa React Query mutations/queries
6. Agrega rutas en `AppRouter.tsx`
