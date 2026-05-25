'use server';

import { LoginType, RegisterType } from '@repo/shared/types';
import { User } from '@repo/shared/mock';
import { cookies } from 'next/headers';

type AuthUser = Omit<User, 'password'>;

export const handleLoginForm = async (
  formData: LoginType,
): Promise<{ user: AuthUser; token: string }> => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login failed');
  }

  const data = await res.json();
  const { user, token } = data as { user: AuthUser; token: string };

  const cookie = await cookies();

  cookie.set('nextToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 5,
  });

  return { user, token };
};

export const handleRegisterForm = async (formData: RegisterType) => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Register failed');
  }
  return { success: true, data };
};
