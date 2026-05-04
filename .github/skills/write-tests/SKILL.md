---
name: write-tests
description: 'Write Jest + Testing Library tests for Next.js components in apps/web. Use when creating or updating test files (.test.tsx), testing form validation, mocking Next.js navigation/server actions, or checking render output. Follows project test setup: jest-environment-jsdom, @testing-library/react, @testing-library/user-event.'
---

# Write Tests (apps/web)

## When to Use
- Writing tests for a form component, page component, or UI primitive in `apps/web`
- Mocking Next.js-specific APIs (`useRouter`, `redirect`, server actions)
- Checking validation error messages rendered by Zod + react-hook-form

## Test Setup
- **Runner**: Jest (`jest.config.js` at `apps/web`)
- **Environment**: `jest-environment-jsdom`
- **Utilities**: `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- **Setup file**: `apps/web/src/setupTests.ts` (imported by jest config)
- **Run**: `pnpm --filter social-dashboard-next-pro test` or `pnpm test` from root

## File Naming
Place test files adjacent to the component:
```
src/app/(auth)/login/login-form.tsx
src/app/(auth)/login/login.test.tsx   ← test file
```

## Required Mocks for Next.js

Always mock `next/navigation` and any server actions:
```tsx
jest.mock('@/actions/auth-action', () => ({
  handleLoginForm: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  redirect: jest.fn(),
}));
```

## Test Structure Pattern

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyForm from './my-form';
import { handleMyAction } from '@/actions/my-action';

jest.mock('@/actions/my-action', () => ({ handleMyAction: jest.fn() }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('MyForm', () => {
  let button: HTMLElement;
  let fieldInput: HTMLElement;

  beforeEach(() => {
    render(<MyForm />);
    button = screen.getByRole('button', { name: /submit/i });
    fieldInput = screen.getByLabelText(/field label/i);
  });

  describe('render', () => {
    test('renders correctly', () => {
      expect(fieldInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    test('shows required error when empty', async () => {
      await userEvent.click(button);
      expect(await screen.findByText(/field is required/i)).toBeInTheDocument();
    });
  });

  describe('submission', () => {
    test('calls action with valid data', async () => {
      await userEvent.type(fieldInput, 'valid value');
      await userEvent.click(button);
      expect(handleMyAction).toHaveBeenCalledWith(
        expect.objectContaining({ field: 'valid value' }),
      );
    });
  });
});
```

## Querying Inputs
`Input.tsx` renders `<label htmlFor={name}>` — query by label text:
```tsx
screen.getByLabelText(/email/i)
screen.getByLabelText(/password/i)
```

## Coverage
Run with coverage:
```bash
pnpm --filter social-dashboard-next-pro test:coverage
```
Reports are written to `apps/web/coverage/`.

## Examples in this project
- [login.test.tsx](../../../apps/web/src/app/(auth)/login/login.test.tsx) — full form test: render, validation, submission
