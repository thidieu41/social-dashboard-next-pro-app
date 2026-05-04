---
name: new-component
description: 'Create a new UI component in apps/web. Use when adding a generic reusable UI primitive (Button, Input, Card, Avatar, Badge, Select, etc.) to components-system/ — like a component library. Or when adding a project-specific component (Sidebar, Modal, ProgressBar, Breadcrumb, etc.) tied to this social dashboard app in components/. Follows project conventions: TypeScript, twMerge, HTMLAttributes extension.'
---

# New Component

## Which directory?

| Directory | Purpose | Rule of thumb |
|---|---|---|
| `apps/web/src/components-system/` | **Generic UI library** — could be extracted to any project, zero app-specific knowledge | "Could I publish this to npm and use it in another app?" → Yes |
| `apps/web/src/components/` | **Project-specific** — tied to this social dashboard (app navigation, domain modals, progress UX) | "Does this know about routes, sidebar state, or app domain?" → Yes |

---

## A. components-system (Generic UI Library)

### Conventions
- Path: `apps/web/src/components-system/<Name>/<Name>.tsx`
- **Zero app-specific knowledge** — no hardcoded routes, no app context, no domain logic
- Use `twMerge` from `tailwind-merge` to merge classes
- Extend native HTML element attributes (`HTMLAttributes`, `ButtonHTMLAttributes`, etc.)
- Export style is **flexible** — both named and default exports exist in the codebase; match the style of the nearest similar component
- CSS variables for theming: `var(--color-surface)`, `var(--color-text)`, `var(--border-color)`, `var(--color-text-secondary)`
- No `'use client'` unless the component uses hooks or browser APIs

### Template
```tsx
import { twMerge } from 'tailwind-merge';

type <Name>Props = React.HTMLAttributes<HTMLDivElement> & {
  // add custom props here
};

const <Name> = ({ className, children, ...props }: <Name>Props) => {
  const cls = twMerge('base tailwind classes here', className);
  return <div {...props} className={cls}>{children}</div>;
};

export default <Name>;
```

### Usage
```tsx
import <Name> from '@/components-system/<Name>/<Name>';
```

### Examples
- [Button.tsx](../../../apps/web/src/components-system/Button/Button.tsx) — named export, extends `ButtonHTMLAttributes`
- [Card.tsx](../../../apps/web/src/components-system/Card/Card.tsx) — default export, `HTMLAttributes<HTMLDivElement>`
- [CardHeader.tsx](../../../apps/web/src/components-system/Card/CardHeader.tsx) — named export, custom `title` prop
- [Stack.tsx](../../../apps/web/src/components-system/Stack/Stack.tsx) — default export, custom `direction` + `spacing` props

---

## B. components/ (Project-Specific)

### Conventions
- Path: `apps/web/src/components/<Name>/<Name>.tsx` or `index.tsx`
- **Tied to this app** — can reference app routes, use app-level context (SidebarProvider, ProgressProvider), or contain domain-specific UX
- Add `'use client'` if using hooks, event handlers, or browser APIs
- Can import from `components-system/` but **`components-system/` must never import from `components/`**
- Can use `framer-motion` for animations, `lucide-react` for icons
- Default export preferred

### Template
```tsx
'use client';

import { twMerge } from 'tailwind-merge';

type <Name>Props = React.HTMLAttributes<HTMLDivElement> & {
  // props
};

export default function <Name>({ className, ...props }: <Name>Props) {
  return (
    <div className={twMerge('base classes', className)} {...props} />
  );
}
```

### Examples
- [Modal.tsx](../../../apps/web/src/components/Modal/Modal.tsx) — uses framer-motion, compound component pattern
- [sidebar/index.tsx](../../../apps/web/src/components/sidebar/index.tsx) — uses context, lucide-react icons, `usePathname`
