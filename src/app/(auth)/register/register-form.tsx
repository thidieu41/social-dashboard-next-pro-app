"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterSchema } from "./schema";
import { RegisterType } from "@/types";
import Input from "@/components-system/Input/Input";
import { Key, Mail, User } from "lucide-react";
import { Button } from "@/components-system/Button/Button";
import Link from "next/link";
import { handleRegisterForm } from "@/actions/auth-action";

const FormRegister = () => {
  const methods = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerSubmit = async (data: RegisterType) => {
    try {
      const user = {
        ...data,
        id: crypto.randomUUID(),
      };
      const result = await handleRegisterForm(user);
      console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Register error:", error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(registerSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            label="Name"
            starticon={<User />}
            placeholder="Your name..."
            name="name"
          ></Input>
          <Input
            label="Email"
            starticon={<Mail />}
            placeholder="Your email..."
            name="email"
          ></Input>
          <Input
            label="Password"
            starticon={<Key />}
            placeholder="Your password..."
            name="password"
          ></Input>
        </div>
        <div className="mt-5">
          <Button
            className="rounded-lg py-3! bg-black! font-bold text-white! w-full"
            type="submit"
          >
            SUBMIT
          </Button>
        </div>
        <div className="mt-3">
          <span className="text-gray-500">{"Already have an account?"}</span>
          <Link href={"/login"} className="text-blue-400 ml-1 underline">
            Register
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormRegister;
