'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setNotifications,
  setNotificationsLoading,
  setNotificationsError,
  markAsRead,
} from '@/lib/features/notifications/notificationsSlice';
import { fetchNotifications } from '@/actions/notification-action';
import Card from '@/components-system/Card/Card';
import Stack from '@/components-system/Stack/Stack';
import Avatar from '@/components-system/Avatar/Avatar';
import { Bell, Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Notification } from '@repo/shared/mock';

const typeIconMap: Record<Notification['type'], React.ReactNode> = {
  like: <Heart size={14} className="text-red-500" />,
  comment: <MessageCircle size={14} className="text-blue-500" />,
  follow: <UserPlus size={14} className="text-green-500" />,
  mention: <AtSign size={14} className="text-purple-500" />,
};

const typeLabelMap: Record<Notification['type'], string> = {
  like: 'bg-red-100 text-red-600',
  comment: 'bg-blue-100 text-blue-600',
  follow: 'bg-green-100 text-green-600',
  mention: 'bg-purple-100 text-purple-600',
};

const NotificationsPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    dispatch(setNotificationsLoading(true));
    fetchNotifications()
      .then((data) => dispatch(setNotifications(data)))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        dispatch(setNotificationsError(message));
      });
  }, [dispatch]);

  const unreadCount = list.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="section-wrap flex items-center justify-center py-20">
        <p className="secondary-text">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-wrap flex items-center justify-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="section-wrap p-4">
      <Stack className="items-center justify-between mb-4" spacing={2}>
        <Stack className="items-center" spacing={2}>
          <Bell size={20} />
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </Stack>
      </Stack>

      <Stack direction="col" spacing={2}>
        {list.map((notification) => (
          <Card
            key={notification.id}
            className={twMerge(
              'cursor-pointer transition-opacity',
              notification.read ? 'opacity-60' : '',
            )}
            onClick={() => dispatch(markAsRead(notification.id))}
          >
            <Stack className="items-center justify-between w-full" spacing={3}>
              <Stack className="items-center" spacing={3}>
                <div className="relative shrink-0">
                  <Avatar src={notification.avatar} width={42} height={42} />
                  <span
                    className={twMerge(
                      'absolute -bottom-1 -right-1 rounded-full p-0.5',
                      typeLabelMap[notification.type],
                    )}
                  >
                    {typeIconMap[notification.type]}
                  </span>
                </div>
                <Stack direction="col" spacing={0}>
                  <p className="text-sm font-semibold">{notification.from}</p>
                  <p className="secondary-text text-sm">
                    {notification.message}
                  </p>
                  <p className="secondary-text text-xs">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </Stack>
              </Stack>
              {!notification.read && (
                <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </Stack>
          </Card>
        ))}

        {list.length === 0 && (
          <p className="secondary-text text-center py-10">
            No notifications yet.
          </p>
        )}
      </Stack>
    </div>
  );
};

export default NotificationsPage;
