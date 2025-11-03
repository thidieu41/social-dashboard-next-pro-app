import { LoginSchema } from "@/app/(auth)/login/schema";
import { RegisterSchema } from "@/app/(auth)/register/schema";
import z from "zod";

export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>