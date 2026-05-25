'use server';

import { Notification } from '@repo/shared/mock';

export const fetchNotifications = async (): Promise<Notification[]> => {
  const apiUrl = process.env.API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/notifications`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }

  const data = await res.json();
  return data.notifications as Notification[];
};
