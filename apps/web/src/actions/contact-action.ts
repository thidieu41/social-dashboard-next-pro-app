'use server';

import { Contact } from '@repo/shared/mock';

export const fetchContacts = async (): Promise<Contact[]> => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/contacts`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch contacts');

  const data = await res.json();
  return data.contacts as Contact[];
};
