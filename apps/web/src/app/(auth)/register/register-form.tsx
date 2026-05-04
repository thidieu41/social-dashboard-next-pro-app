'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterSchema } from '@repo/shared/schema';
import { RegisterType } from '@repo/shared/types';
import Input from '@/components-system/Input/Input';
import { Key, Mail } from 'lucide-react';
import { Button } from '@/components-system/Button/Button';
import Link from 'next/link';
import { handleRegisterForm } from '@/actions/auth-action';
import { useRouter } from 'next/navigation';

const FormRegister = () => {
  const router = useRouter();
  const methods = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerSubmit = async (data: RegisterType) => {
    try {
      const result = await handleRegisterForm(data);
      if (result?.success) {
        router.push('/login');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('❌ Register error:', error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(registerSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            label="Email"
            starticon={<Mail />}
            placeholder="Your email..."
            name="email"
          />
          <Input
            label="Password"
            starticon={<Key />}
            placeholder="Your password..."
            name="password"
            type="password"
          />
          <Input
            label="Confirm Password"
            starticon={<Key />}
            placeholder="Confirm your password..."
            name="confirmPassword"
            type="password"
          />
        </div>
        <div className="mt-5">
          <Button
            className="primary-button rounded-lg py-3! font-bold w-full"
            type="submit"
          >
            SUBMIT
          </Button>
        </div>
        <div className="mt-3 text-sm text-center">
          <span className="secondary-text text-back">
            {'Already have an account?'}
          </span>
          <Link href={'/login'} className="text-blue-400 ml-1 underline">
            Sign in
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormRegister;
