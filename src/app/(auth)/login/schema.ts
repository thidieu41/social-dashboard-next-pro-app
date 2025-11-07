import z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1,'Email is required!').email('Incorrect email format!'),
    password: z.string().min(1, 'Password is required!')
})
