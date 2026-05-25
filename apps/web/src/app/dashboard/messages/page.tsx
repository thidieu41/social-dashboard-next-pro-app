'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setMessages,
  setMessagesLoading,
  setMessagesError,
  markMessageRead,
} from '@/lib/features/messages/messagesSlice';
import { fetchMessages } from '@/actions/message-action';
import Card from '@/components-system/Card/Card';
import Stack from '@/components-system/Stack/Stack';
import Avatar from '@/components-system/Avatar/Avatar';
import { twMerge } from 'tailwind-merge';

const MessagesPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.messages);

  useEffect(() => {
    dispatch(setMessagesLoading(true));
    fetchMessages()
      .then((data) => dispatch(setMessages(data)))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        dispatch(setMessagesError(message));
      });
  }, [dispatch]);

  const totalUnread = list.reduce((sum, m) => sum + m.unread, 0);

  if (loading) {
    return (
      <div className="section-wrap flex items-center justify-center py-20">
        <p className="secondary-text">Loading messages...</p>
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
      <Stack className="items-center mb-4" spacing={2}>
        <h1 className="text-xl font-bold">Messages</h1>
        {totalUnread > 0 && (
          <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {totalUnread}
          </span>
        )}
      </Stack>

      <Stack direction="col" spacing={2}>
        {list.map((msg) => (
          <Card
            key={msg.id}
            className={twMerge(
              'cursor-pointer hover:opacity-90 transition-opacity',
              msg.unread > 0 ? '' : 'opacity-70',
            )}
            onClick={() => dispatch(markMessageRead(msg.id))}
          >
            <Stack className="items-center justify-between w-full" spacing={3}>
              <Stack className="items-center" spacing={3}>
                <div className="relative shrink-0">
                  <Avatar src={msg.contactAvatar} width={46} height={46} />
                  <span
                    className={twMerge(
                      'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-(--color-surface)',
                      msg.online ? 'bg-green-500' : 'bg-gray-400',
                    )}
                  />
                </div>
                <Stack direction="col" spacing={0}>
                  <p
                    className={twMerge(
                      'text-sm',
                      msg.unread > 0 ? 'font-semibold' : 'font-normal',
                    )}
                  >
                    {msg.contactName}
                  </p>
                  <p className="secondary-text text-sm truncate max-w-55">
                    {msg.lastMessage}
                  </p>
                </Stack>
              </Stack>

              <Stack direction="col" spacing={1} className="items-end shrink-0">
                <p className="secondary-text text-xs">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                {msg.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {msg.unread}
                  </span>
                )}
              </Stack>
            </Stack>
          </Card>
        ))}

        {list.length === 0 && (
          <p className="secondary-text text-center py-10">No messages yet.</p>
        )}
      </Stack>
    </div>
  );
};

export default MessagesPage;
