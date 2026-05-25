'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setContacts,
  setContactsLoading,
  setContactsError,
} from '@/lib/features/contacts/contactsSlice';
import { fetchContacts } from '@/actions/contact-action';
import Card from '@/components-system/Card/Card';
import Stack from '@/components-system/Stack/Stack';
import Avatar from '@/components-system/Avatar/Avatar';
import { Button } from '@/components-system/Button/Button';
import { Mail, Phone, Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.contacts);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(setContactsLoading(true));
    fetchContacts()
      .then((data) => dispatch(setContacts(data)))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        dispatch(setContactsError(message));
      });
  }, [dispatch]);

  const filtered = list.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="section-wrap flex items-center justify-center py-20">
        <p className="secondary-text">Loading contacts...</p>
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
        <h1 className="text-xl font-bold">Contacts</h1>
        <p className="secondary-text text-sm">{list.length} contacts</p>
      </Stack>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 secondary-text"
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-(--color-border) bg-transparent text-sm focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((contact) => (
          <Card key={contact.id}>
            <Stack direction="col" spacing={3} className="items-center p-2">
              <div className="relative">
                <Avatar src={contact.avatar} width={60} height={60} />
                <span
                  className={twMerge(
                    'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-(--color-surface)',
                    contact.online ? 'bg-green-500' : 'bg-gray-400',
                  )}
                />
              </div>
              <Stack direction="col" spacing={1} className="items-center">
                <p className="font-semibold text-base">{contact.name}</p>
                <p className="secondary-text text-sm">{contact.role}</p>
              </Stack>
              <Stack
                direction="col"
                spacing={1}
                className="w-full text-sm secondary-text"
              >
                <Stack spacing={2} className="items-center">
                  <Mail size={14} />
                  <span className="truncate">{contact.email}</span>
                </Stack>
                <Stack spacing={2} className="items-center">
                  <Phone size={14} />
                  <span>{contact.phone}</span>
                </Stack>
              </Stack>
              <Button className="primary-button w-full text-sm py-1.5!">
                Message
              </Button>
            </Stack>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="secondary-text text-center col-span-3 py-10">
            No contacts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
