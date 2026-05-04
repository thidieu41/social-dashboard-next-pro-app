---
name: add-feature
description: 'Add a full-stack feature end-to-end in this monorepo. Use when building a new feature that spans shared schema/types, Express API route, Next.js server action, and a Next.js page with a form. Covers the complete vertical slice: packages/shared → apps/api → apps/web actions → apps/web page.'
---

# Add Full-Stack Feature (end-to-end)

## When to Use
- Building a new feature that touches both API and frontend
- Adding a new form-based page (e.g. create post, update profile, submit feedback)
- Wiring up a new resource from schema to UI

## Stack Overview
- **Shared**: `packages/shared` — Zod schemas + inferred TypeScript types
- **API**: `apps/api` — Express 5 route with Zod validation + optional JWT
- **Web actions**: `apps/web/src/actions/` — Next.js Server Actions (`'use server'`)
- **Web page**: `apps/web/src/app/` — Next.js App Router page + client form component

## Procedure

### Step 1 — Define schema and types in `packages/shared`

`packages/shared/src/schema/index.ts`:
```ts
export const NewFeatureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  // add fields
});
```

`packages/shared/src/types/index.ts`:
```ts
export type NewFeatureType = z.infer<typeof NewFeatureSchema>;
```

### Step 2 — Add API route in `apps/api`

Create `apps/api/src/routes/<feature>.ts` (see `add-api-route` skill).
Register in `apps/api/src/index.ts`:
```ts
import featureRouter from './routes/<feature>';
app.use('/api', featureRouter);
```

### Step 3 — Create Server Action in `apps/web/src/actions/`

`apps/web/src/actions/<feature>-action.ts`:
```ts
'use server';

import { NewFeatureType } from '@repo/shared/types';

export const handleNewFeature = async (formData: NewFeatureType) => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/<feature>`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Request failed');
  }

  return res.json();
};
```

### Step 4 — Create the form component (client)

`apps/web/src/app/<route>/<feature>-form.tsx`:
```tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewFeatureSchema } from '@repo/shared/schema';
import { NewFeatureType } from '@repo/shared/types';
import { handleNewFeature } from '@/actions/<feature>-action';
import { Button } from '@/components-system/Button/Button';
import Input from '@/components-system/Input/Input';

const NewFeatureForm = () => {
  const methods = useForm<NewFeatureType>({
    resolver: zodResolver(NewFeatureSchema),
  });

  const onSubmit = async (data: NewFeatureType) => {
    try {
      await handleNewFeature(data);
      // handle success
    } catch (err) {
      // handle error
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input label="Title" name="title" placeholder="Enter title..." />
        <Button type="submit" className="primary-button mt-4">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default NewFeatureForm;
```

### Step 5 — Create the page

`apps/web/src/app/<route>/page.tsx`:
```tsx
import NewFeatureForm from './<feature>-form';

export default function NewFeaturePage() {
  return (
    <main>
      <h1>New Feature</h1>
      <NewFeatureForm />
    </main>
  );
}
```

## Key Rules
- Form components are always `'use client'`; pages and server actions are server components by default
- `API_URL` is read from `process.env.API_URL` — set in `apps/web/.env` for local dev
- Schemas live in `@repo/shared/schema`, types in `@repo/shared/types` — import from there in both `apps/api` and `apps/web`

## Examples in this project
- Auth feature: [schema](../../../packages/shared/src/schema/index.ts) → [api route](../../../apps/api/src/routes/auth.ts) → [server action](../../../apps/web/src/actions/auth-action.ts) → [form](../../../apps/web/src/app/(auth)/login/login-form.tsx) → [page](../../../apps/web/src/app/(auth)/login/page.tsx)
