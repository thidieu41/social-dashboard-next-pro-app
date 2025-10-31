import { LoginSchema } from "@/app/(auth)/login/schema";
import z from "zod";

export type LoginType = z.infer<typeof LoginSchema>