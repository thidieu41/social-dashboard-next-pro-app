---
description: "Write Jest + Testing Library tests for a component or form in apps/web. Covers render, validation, submission, and mocking Next.js navigation and server actions."
agent: agent
argument-hint: "Component file path to test (e.g. 'apps/web/src/app/(auth)/login/login-form.tsx')"
---

Write Jest + Testing Library tests for the following component, following the `write-tests` skill.

**Component:** $input

## Requirements

1. Read the component file to understand: form fields, validation schema, server action used, navigation calls
2. Create (or update) a `.test.tsx` file adjacent to the component
3. Mock all server actions and Next.js navigation:
   ```tsx
   jest.mock('@/actions/...', () => ({ actionFn: jest.fn() }));
   jest.mock('next/navigation', () => ({
     useRouter: jest.fn(() => ({ push: jest.fn() })),
     redirect: jest.fn(),
   }));
   ```
4. Cover these cases:
   - **Render** — all form fields and submit button are present
   - **Validation** — required field errors, format errors (email, etc.)
   - **Success** — action called with correct data
   - **Error** — API failure handled gracefully
5. Query inputs by label text (`getByLabelText`), buttons by role (`getByRole`)
6. Use `await screen.findByText()` for async validation messages
7. Run `pnpm --filter social-dashboard-next-pro test` to verify all tests pass

Reference: [login.test.tsx](../../apps/web/src/app/(auth)/login/login.test.tsx)
