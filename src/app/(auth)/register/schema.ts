import z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().email('Incorrect email format!').min(1, 'Email is required!'),
    password: z.string().min(1, "Password is required!")
})