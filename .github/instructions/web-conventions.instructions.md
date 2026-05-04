---
description: "Coding conventions for apps/web (Next.js, React, Tailwind). Auto-applied when editing TypeScript/TSX files in apps/web."
applyTo: "apps/web/src/**/*.{ts,tsx}"
---

# Web Conventions (apps/web)

## Engineering Mindset (mid-senior+)

- **Reuse before create** — check `components-system/` and `components/` for existing primitives before building new ones.
- **DRY** — extract repeated JSX patterns into components, repeated logic into custom hooks (`lib/hooks.ts`).
- **Remove dead code** — unused imports, props, commented JSX, and orphaned components must be deleted.
- **`'use client'` is a cost** — keep it as close to the leaf as possible; prefer server components for data-only nodes.
- **Recommended libs** (already in project): `react-hook-form`, `@hookform/resolvers/zod`, `tailwind-merge`, `lucide-react`, `framer-motion`, `@reduxjs/toolkit`, `@repo/shared`.

## Components

- **`components-system/`** — generic UI primitives (no app-specific logic). Could be extracted to any project.
- **`components/`** — project-specific components tied to this social dashboard (know about app routes, contexts, domain).
- Always use `twMerge` from `tailwind-merge` — never string concatenation for class names.
- Extend native HTML attributes (`HTMLAttributes`, `ButtonHTMLAttributes`, etc.) for component props.
- CSS variables for theming: `var(--color-surface)`, `var(--color-text)`, `var(--border-color)`, `var(--color-text-secondary)`.

## Forms

- Use `react-hook-form` with `FormProvider` + `useFormContext`.
- Validate with `zodResolver` — schemas from `@repo/shared/schema`, types from `@repo/shared/types`.
- Never redefine schemas locally — always import from `@repo/shared`.
- `<Input name="field" label="Label" />` auto-registers via `useFormContext`.

## Next.js App Router

- Pages are server components by default — add `'use client'` only when needed (hooks, events, browser APIs).
- Server actions live in `apps/web/src/actions/` with `'use server'` directive.
- `API_URL` accessed only in server actions via `process.env.API_URL` — **never in client components**.
- Middleware auth guard is in `apps/web/src/proxy.ts`.

## TypeScript

- No `any` without `// eslint-disable` comment explaining why.
- Infer types from Zod schemas with `z.infer<typeof Schema>` — don't write them manually.

## Code Quality Checklist (run before finishing)

- [ ] No unused imports, props, or state variables
- [ ] No `console.log` or debug output left in code
- [ ] No locally defined types that duplicate `@repo/shared/types`
- [ ] No inline styles — use Tailwind classes or CSS variables
- [ ] No duplicated component logic — extracted to a shared hook or component
