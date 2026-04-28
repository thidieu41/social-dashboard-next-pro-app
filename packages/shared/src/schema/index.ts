import z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required!')
    .email('Incorrect email format!'),
  password: z.string().min(1, 'Password is required!'),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  email: z
    .string()
    .email('Incorrect email format!')
    .min(1, 'Email is required!'),
  password: z.string().min(1, 'Password is required!'),
});
