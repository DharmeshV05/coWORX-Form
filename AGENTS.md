# coWORX Form - Antigravity Project Rules

## Project Overview
This is the **coWORX Coworking Space** website and inquiry management system. It allows potential members to submit inquiries for various coworking memberships, and provides an admin dashboard to manage those inquiries.

**Live Repository:** [DharmeshV05/coWORX-Form](https://github.com/DharmeshV05/coWORX-Form)

---

## Tech Stack

| Layer         | Technology                                              |
|---------------|--------------------------------------------------------|
| Framework     | **Next.js 16** (App Router, React Server Components)    |
| Language      | **TypeScript 5**                                        |
| Styling       | **Tailwind CSS v4** + `tw-animate-css`                  |
| UI Library    | **shadcn/ui** (New York style, Radix primitives)        |
| Icons         | **Lucide React**                                        |
| Animations    | **Framer Motion**                                       |
| Forms         | **React Hook Form** + **Zod** validation                |
| Data Table    | **TanStack React Table**                                |
| State         | **Zustand** (global state)                              |
| Charts        | **Recharts**                                            |
| Theme         | **next-themes** (dark/light mode)                       |
| Data Storage  | **JSON file** (`data/inquiries.json`) via `fs/promises` |
| Deployment    | **Vercel** (standalone output) / Docker (Caddyfile)     |
| Images        | **Unsplash / Pexels** (remote patterns configured)      |

---

## Project Structure

```
coWORX Form/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Public homepage (landing + inquiry form)
│   │   ├── layout.tsx          # Root layout (theme provider, fonts)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── admin/page.tsx      # Admin dashboard (inquiry management)
│   │   └── api/                # API routes
│   │       ├── route.ts        # Base API route
│   │       └── inquiry/        # Inquiry CRUD endpoints
│   ├── components/             # React components
│   │   ├── navbar.tsx          # Navigation bar
│   │   ├── inquiry-form.tsx    # Inquiry submission form
│   │   ├── data-table.tsx      # Admin data table
│   │   ├── dark-mode-toggle.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/                 # shadcn/ui primitives (48 components)
│   ├── hooks/
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/
│   │   ├── storage.ts          # JSON file read/write operations
│   │   └── utils.ts            # Utility functions (cn helper)
│   └── types/
│       └── inquiry.ts          # TypeScript types/interfaces
├── data/
│   └── inquiries.json          # Persistent inquiry data
├── public/                     # Static assets
├── prisma/                     # Prisma schema (may be used later)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── components.json             # shadcn/ui config
├── tsconfig.json               # TypeScript config
├── Caddyfile                   # Docker reverse proxy config
└── package.json
```

---

## Coding Standards

### TypeScript
- Use **strict TypeScript** — always define proper types and interfaces.
- Place shared types in `src/types/`.
- Use `@/` path alias for imports (maps to `src/`).
- Prefer `interface` over `type` for object shapes.
- Never use `any` — use `unknown` and narrow with type guards.

### React & Next.js
- Use **React Server Components (RSC)** by default.
- Add `"use client"` directive ONLY when client-side features are needed (hooks, events, browser APIs).
- Keep page components in `src/app/` following App Router conventions.
- Use `src/components/` for reusable components; keep `src/components/ui/` for shadcn primitives only.
- Never modify files in `src/components/ui/` directly — use shadcn CLI to update.

### Styling
- Use **Tailwind CSS v4** utility classes — never write raw CSS unless in `globals.css`.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Use **CSS variables** for theming (defined in `globals.css`).
- Follow responsive-first design: mobile-first breakpoints.
- Use **Framer Motion** for animations — keep animations subtle and performant.

### Forms & Validation
- Use **React Hook Form** with **Zod** schemas for all forms.
- Define Zod schemas alongside or near form components.
- Use `@hookform/resolvers` for Zod integration.

### Data & API
- API routes go in `src/app/api/`.
- Data storage uses `src/lib/storage.ts` — all file I/O goes through this module.
- JSON data files go in the `data/` directory.
- Always use `try/catch` for file operations and return proper HTTP status codes.
- The storage module includes duplicate mobile number checking.

### State Management
- Use **Zustand** for global/shared client state.
- Prefer React Server Components + props for data flow when possible.
- Use React Hook Form state for form-specific state.

---

## Naming Conventions

| Item              | Convention          | Example                    |
|-------------------|---------------------|----------------------------|
| Files (component) | `kebab-case.tsx`    | `inquiry-form.tsx`         |
| Files (type)      | `kebab-case.ts`     | `inquiry.ts`               |
| Components        | `PascalCase`        | `InquiryForm`              |
| Functions         | `camelCase`         | `getInquiries()`           |
| Types/Interfaces  | `PascalCase`        | `Inquiry`, `CreateInquiryInput` |
| CSS Variables     | `--kebab-case`      | `--primary`, `--background` |
| API Routes        | `kebab-case`        | `/api/inquiry`             |
| Constants         | `UPPER_SNAKE_CASE`  | `DATA_FILE_PATH`           |

---

## Development Commands

```bash
# Start dev server on port 3000
npm run dev

# Build for production (standalone output)
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## Git & Deployment

- **Repository:** `DharmeshV05/coWORX-Form` on GitHub
- **Branch:** `main` is the primary branch
- **Deployment Target:** Vercel (with standalone output mode)
- Commit messages should be descriptive and follow conventional style
- Always verify build passes before pushing (`npm run build`)
- The `data/inquiries.json` file is NOT persistent on Vercel — consider migrating to a database for production

---

## Important Notes

- **Membership Types:** Hot Desk, Dedicated Desk, Private Office, Virtual Office, Day Pass / Hourly Access, Weekly Plan, Monthly Plan
- **Duplicate Prevention:** Mobile numbers must be unique per inquiry
- **Admin Route:** `/admin` — currently unprotected (no auth)
- **Image Sources:** Unsplash and Pexels are whitelisted in `next.config.ts`
- **Dark Mode:** Supported via `next-themes` with system preference detection
- The Prisma directory exists but is currently empty — reserved for future database migration
- **Sharp** is included for optimized image processing in Next.js

---

## Common Patterns

### Adding a new shadcn/ui component
```bash
npx shadcn@latest add <component-name>
```

### Adding a new API route
1. Create directory in `src/app/api/<route-name>/`
2. Add `route.ts` with exported HTTP method handlers (`GET`, `POST`, `PUT`, `DELETE`)
3. Use `src/lib/storage.ts` for data operations

### Adding a new page
1. Create directory in `src/app/<page-name>/`
2. Add `page.tsx` with the page component
3. Update navbar links if needed
