---
description: "Coding conventions for apps/api (Express 5, Zod, JWT). Auto-applied when editing TypeScript files in apps/api."
applyTo: "apps/api/src/**/*.ts"
---

# API Conventions (apps/api)

## Engineering Mindset (mid-senior+)

- **DRY first** — search for existing helpers, middleware, or schemas before writing new code.
- **Remove dead code** — after every change, delete unused imports, variables, handlers, routes, and commented-out blocks.
- **Single responsibility** — each handler does one thing; extract repeated logic into shared middleware or utilities.
- **No over-engineering** — only generalise when a pattern appears 2+ times.
- **Recommended libs** (already in project — don't add new deps if these cover it): `express@5`, `zod`, `jsonwebtoken`, `@repo/shared`.

## Routing

- One `Router()` per resource file in `apps/api/src/routes/`.
- Register all routers with `app.use('/api', router)` in `apps/api/src/index.ts`.
- Use **Express 5** — async errors propagate automatically, no `next(err)` wrappers needed.

## Validation

- Always validate `req.body` with `Schema.safeParse()` — never access fields directly without validation.
- Schemas come from `@repo/shared/schema` — never duplicate or redefine them locally.
- On validation failure: `res.status(400).json({ message: result.error.issues[0].message })`.
- Never return raw Zod error objects to clients.

## Authentication (JWT)

- Read `JWT_SECRET` from `process.env.JWT_SECRET` inside the handler.
- If `JWT_SECRET` is missing, return `500` with `{ message: 'Server misconfiguration: JWT_SECRET is not set' }`.
- Verify `Authorization: Bearer <token>` header for protected routes.
- Sign tokens with `{ expiresIn: '5d' }` unless specified otherwise.

## Response Shape

- Success: `res.json({ message: '...', data?: ... })`
- Error: `res.status(4xx|5xx).json({ message: '...' })`
- Never expose stack traces, raw errors, or internal data in responses.
- Never log or return passwords, JWT secrets, or tokens in error messages.

## Shared Package

- Add new Zod schemas to `packages/shared/src/schema/index.ts`.
- Export inferred types from `packages/shared/src/types/index.ts`.
- Both `apps/api` and `apps/web` import from `@repo/shared` — it's the single source of truth.

## Code Quality Checklist (run before finishing)

- [ ] No unused imports or variables
- [ ] No `console.log` left in handlers
- [ ] No commented-out code blocks
- [ ] No duplicated validation logic — shared schema used everywhere
- [ ] Every new helper/middleware is reusable, not one-off
