---
description: "Build a complete full-stack feature end-to-end: shared schema → API route → server action → Next.js page + form + tests."
agent: agent
argument-hint: "Feature name and description (e.g. 'Create post — title, content, author')"
---

Build a complete full-stack feature for this monorepo following the `add-feature` skill.

**Feature request:** $input

## Steps to complete (in order):

0. **Audit existing code** — check if a schema, component, action, or utility already partially covers this feature. Reuse and extend rather than duplicate.
1. **packages/shared** — Add Zod schema + inferred TypeScript type
2. **apps/api** — Add Express route with Zod validation (follow `add-api-route` skill)
3. **apps/web/actions** — Add server action (`'use server'`) calling `${process.env.API_URL}/api/<endpoint>`
4. **apps/web/app** — Add form component (`'use client'` + `react-hook-form` + `zodResolver`) and page
5. **Tests** — Write Jest + Testing Library tests adjacent to the form (follow `write-tests` skill)
6. **Verify** — Run `pnpm --filter api build` and `pnpm --filter social-dashboard-next-pro type-check` and confirm all pass
7. **Cleanup** — delete any imports, variables, or files made unused by this change. Leave no dead code behind.

Reference the auth feature as canonical example:
- [schema](../../packages/shared/src/schema/index.ts)
- [API route](../../apps/api/src/routes/auth.ts)
- [server action](../../apps/web/src/actions/auth-action.ts)
- [form](../../apps/web/src/app/(auth)/login/login-form.tsx)
