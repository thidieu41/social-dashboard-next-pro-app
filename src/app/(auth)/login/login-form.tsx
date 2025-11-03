"use client";

import { Button } from "@/components-system/Button/Button";
import Input from "@/components-system/Input/Input";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType } from "@/types";
import { handleLoginForm } from "@/actions/auth-action";

const FormLogin = () => {
  const methods = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const loginSubmit = async (data: LoginType) => {
    try {
       await handleLoginForm(data);
    } catch {}
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(loginSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            placeholder="Your email address..."
            starticon={<Mail />}
            name="email"
            className="text-gray-600"
          />

          <Input
            label="Password"
            placeholder="Your passowrd..."
            starticon={<Key />}
            name="password"
            className="text-gray-600"
          />

          <div className="flex gap-2">
            <input type="checkbox" />
            <span className="text-gray-700 text-sm">Remeber me!</span>
          </div>
        </div>
        <div className="mt-5">
          <Button
            className="rounded-lg py-3! bg-black! font-bold text-white! w-full"
            type="submit"
          >
            SUBMIT
          </Button>
        </div>
        <div className="mt-3 text-sm text-center">
          <span>{`Don't have an account?`}</span>
          <Link href={"/register"} className="text-blue-400 ml-1 underline">
            Sign up
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormLogin;
