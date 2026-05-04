---
name: add-api-route
description: 'Add a new REST API route to the Express backend (apps/api). Use when creating new endpoints, adding request validation with Zod, JWT authentication middleware, or new route files. Follows project conventions: Express 5, Zod safeParse, JWT, shared schemas from @repo/shared.'
---

# Add API Route (apps/api)

## When to Use
- Adding a new Express route handler to `apps/api/src/routes/`
- Creating a new router file and registering it in `apps/api/src/index.ts`
- Adding validation to an existing route

## Conventions
- Use **Express 5** (`express@5`) — async errors propagate automatically
- Validate all request bodies with **Zod `safeParse`** using schemas from `@repo/shared/schema`
- Guard protected routes by verifying the `Authorization: Bearer <token>` header with **`jsonwebtoken`**
- Return structured JSON: `{ message, data? }` on success, `{ message }` on error
- Never expose raw Zod error objects — use `error.issues[0].message`
- Keep `JWT_SECRET` exclusively from `process.env.JWT_SECRET`; return 500 if missing

## Procedure

### 1. Add schema to shared package (if new resource)
`packages/shared/src/schema/index.ts`:
```ts
export const NewResourceSchema = z.object({
  field: z.string().min(1, 'Field is required'),
});
```
`packages/shared/src/types/index.ts`:
```ts
export type NewResourceType = z.infer<typeof NewResourceSchema>;
```

### 2. Create the route file
Path: `apps/api/src/routes/<resource>.ts`

```ts
import { Router, Request, Response } from 'express';
import { NewResourceSchema } from '@repo/shared/schema';

const router = Router();

router.post('/<resource>', async (req: Request, res: Response) => {
  const result = NewResourceSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: result.error.issues[0].message });
    return;
  }

  // business logic here

  res.json({ message: 'Success', data: result.data });
});

export default router;
```

### 3. Register the router in index.ts
`apps/api/src/index.ts`:
```ts
import newResourceRouter from './routes/<resource>';
app.use('/api', newResourceRouter);
```

### 4. JWT-protected route pattern
```ts
import jwt from 'jsonwebtoken';

router.get('/protected', async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET is not set' });
    return;
  }
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET);
    // use payload
    res.json({ data: payload });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});
```

## Examples in this project
- [auth.ts](../../../apps/api/src/routes/auth.ts) — login + register with Zod + JWT
- [index.ts](../../../apps/api/src/index.ts) — router registration
