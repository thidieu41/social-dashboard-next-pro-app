'use server';

import { Message } from '@repo/shared/mock';

export const fetchMessages = async (): Promise<Message[]> => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/messages`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch messages');

  const data = await res.json();
  return data.messages as Message[];
};
