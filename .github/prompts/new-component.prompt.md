---
description: "Create a new React component — either a generic UI primitive (components-system/) or a project-specific component (components/)."
agent: agent
argument-hint: "Component name and type (e.g. 'Badge — generic pill label' or 'NotificationBell — app-specific with badge count')"
---

Create a new component for apps/web following the `new-component` skill.

**Component:** $input

## Decision — which directory?

Ask yourself: *"Could this component be reused in any other project without changes?"*
- **Yes** → `apps/web/src/components-system/<Name>/<Name>.tsx` (generic UI library)
- **No** (knows about app routes, contexts, or domain) → `apps/web/src/components/<Name>/<Name>.tsx` (project-specific)

## Requirements

### Before creating
- Search `components-system/` and `components/` — does a similar component already exist that could be extended?
- If yes, extend via props rather than creating a near-duplicate.

### For components-system/ (generic)
- Extend native HTML attributes (`HTMLAttributes`, `ButtonHTMLAttributes`, etc.)
- Use `twMerge` for class merging
- Use CSS variables for theming (`var(--color-surface)`, `var(--color-text)`, etc.)
- Zero app-specific knowledge — no hardcoded routes or app contexts
- Match export style (named or default) of similar existing components

### For components/ (project-specific)
- Add `'use client'` if using hooks or event handlers
- Can import from `components-system/` (never the reverse)
- Can use `framer-motion`, `lucide-react`, app contexts
- Default export preferred

## After creating
- Import in a page or component to verify it renders correctly
- Remove any props, state, or imports added during development but not used in the final component.
- Run `pnpm --filter social-dashboard-next-pro type-check` to validate TypeScript
