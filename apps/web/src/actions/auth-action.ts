'use server';

import { LoginType, RegisterType } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLoginForm = async (formData: LoginType) => {
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
  const token = data.token;

  const cookie = await cookies();

  cookie.set('nextToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 5, // 15 phút
  });

  redirect('/dashboard');
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
    return { res };
  }
  return { success: true, data };
};
