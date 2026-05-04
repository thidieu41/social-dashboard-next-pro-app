---
description: "Review code for quality, security, and adherence to project conventions. Produces a structured report with Critical/Warning/Suggestion sections."
agent: agent
argument-hint: "File path or feature to review (e.g. 'apps/api/src/routes/posts.ts')"
---

Review the following code for this monorepo. Do NOT edit any files — produce a structured report only.

**Target:** $input

## Review Checklist

### Security
- No secrets hardcoded (JWT_SECRET, passwords, API keys)
- All `req.body` inputs validated with Zod `safeParse` before use
- No stack traces or raw errors returned to clients
- `httpOnly` cookies used for tokens (not localStorage)

### API Conventions (if applicable)
- Schemas imported from `@repo/shared/schema`, not redefined locally
- Route returns `{ message, data? }` shape
- `JWT_SECRET` read from env inside handler, 500 if missing
- `safeParse` used, not `parse`

### Web Conventions (if applicable)
- `twMerge` used for class merging
- Forms use `react-hook-form` + `zodResolver` + `@repo/shared` schemas
- `'use client'` on interactive components, `'use server'` on actions
- `API_URL` only in server actions, never client components
- Types from `@repo/shared/types` — not redefined locally

### General
- No unused imports, no stray `console.log`
- No `any` types without justification
- No DRY violations — same logic duplicated across 2+ files
- No dead code (unused imports, vars, commented blocks, orphaned components)
- No local type/schema definitions that already exist in `@repo/shared`
- `'use client'` not overused — only where hooks/events require it

## Output Format

```
## Review Summary
Overall: ✅ Approved | ⚠️ Needs Changes | ❌ Blocked

### 🔴 Critical (must fix)
- [file:line] issue + fix

### 🟡 Warning (should fix)
- [file:line] issue

### 🟢 Suggestion (optional)
- [file:line] improvement

## What Looks Good
- ...
```
