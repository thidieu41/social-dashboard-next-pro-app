import z from 'zod';
import { LoginSchema, RegisterSchema } from '../schema';

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
