export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Notification = {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  message: string;
  from: string;
  avatar: string;
  read: boolean;
  createdAt: string;
};

export const notificationList: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    message: 'liked your post.',
    from: 'Alice Nguyen',
    avatar: '/images/auth/avatar.jpg',
    read: false,
    createdAt: '2026-05-25T08:00:00Z',
  },
  {
    id: 'n2',
    type: 'comment',
    message: 'commented on your photo.',
    from: 'Bob Tran',
    avatar: '/images/auth/avatar.jpg',
    read: false,
    createdAt: '2026-05-25T07:30:00Z',
  },
  {
    id: 'n3',
    type: 'follow',
    message: 'started following you.',
    from: 'Charlie Pham',
    avatar: '/images/auth/avatar.jpg',
    read: true,
    createdAt: '2026-05-24T20:00:00Z',
  },
  {
    id: 'n4',
    type: 'mention',
    message: 'mentioned you in a comment.',
    from: 'Daisy Le',
    avatar: '/images/auth/avatar.jpg',
    read: true,
    createdAt: '2026-05-24T15:00:00Z',
  },
  {
    id: 'n5',
    type: 'like',
    message: 'liked your comment.',
    from: 'Ethan Vu',
    avatar: '/images/auth/avatar.jpg',
    read: false,
    createdAt: '2026-05-24T10:00:00Z',
  },
];

export const userList: User[] = [
  {
    id: 'a9f2c6b1-4b77-4f23-93d2-82ef58da91a1',
    name: 'Alice Nguyen',
    email: 'alice.nguyen@example.com',
    password: 'p@ssW0rd123',
  },
  {
    id: 'b83d47e9-1f4b-49cc-90d7-9c2a26c8c9ab',
    name: 'Bob Tran',
    email: 'bob.tran@example.com',
    password: 'mySecureP@ss',
  },
  {
    id: 'c24f2d70-84e6-45cb-bc3a-8b9b7f79e0c2',
    name: 'Charlie Pham',
    email: 'charlie.pham@example.com',
    password: 'Pa$$word!45',
  },
  {
    id: 'd39a9a7f-cc14-4ef4-b243-52f3d39ce8b1',
    name: 'Daisy Le',
    email: 'daisy.le@example.com',
    password: 'Qwerty@789',
  },
  {
    id: 'e82b6cfa-1c3d-4ff2-9d53-1b6e58f77c9e',
    name: 'Ethan Vu',
    email: 'ethan.vu@example.com',
    password: 'S3cur3!Pass',
  },
];

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  online: boolean;
};

export const contactList: Contact[] = [
  {
    id: 'c1',
    name: 'Alice Nguyen',
    email: 'alice.nguyen@example.com',
    phone: '0901 234 567',
    role: 'Frontend Developer',
    avatar: '/images/auth/avatar.jpg',
    online: true,
  },
  {
    id: 'c2',
    name: 'Bob Tran',
    email: 'bob.tran@example.com',
    phone: '0912 345 678',
    role: 'Backend Developer',
    avatar: '/images/auth/avatar.jpg',
    online: false,
  },
  {
    id: 'c3',
    name: 'Charlie Pham',
    email: 'charlie.pham@example.com',
    phone: '0923 456 789',
    role: 'UI/UX Designer',
    avatar: '/images/auth/avatar.jpg',
    online: true,
  },
  {
    id: 'c4',
    name: 'Daisy Le',
    email: 'daisy.le@example.com',
    phone: '0934 567 890',
    role: 'Product Manager',
    avatar: '/images/auth/avatar.jpg',
    online: false,
  },
  {
    id: 'c5',
    name: 'Ethan Vu',
    email: 'ethan.vu@example.com',
    phone: '0945 678 901',
    role: 'DevOps Engineer',
    avatar: '/images/auth/avatar.jpg',
    online: true,
  },
  {
    id: 'c6',
    name: 'Fiona Hoang',
    email: 'fiona.hoang@example.com',
    phone: '0956 789 012',
    role: 'QA Engineer',
    avatar: '/images/auth/avatar.jpg',
    online: false,
  },
];

export type Message = {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
};

export const messageList: Message[] = [
  {
    id: 'm1',
    contactId: 'c1',
    contactName: 'Alice Nguyen',
    contactAvatar: '/images/auth/avatar.jpg',
    lastMessage: 'Hey! Are you free for a call later today?',
    timestamp: '2026-05-25T08:45:00Z',
    unread: 2,
    online: true,
  },
  {
    id: 'm2',
    contactId: 'c2',
    contactName: 'Bob Tran',
    contactAvatar: '/images/auth/avatar.jpg',
    lastMessage: 'I pushed the fix to the repo, please review.',
    timestamp: '2026-05-25T07:20:00Z',
    unread: 0,
    online: false,
  },
  {
    id: 'm3',
    contactId: 'c3',
    contactName: 'Charlie Pham',
    contactAvatar: '/images/auth/avatar.jpg',
    lastMessage: 'The new designs are ready for review!',
    timestamp: '2026-05-24T22:10:00Z',
    unread: 5,
    online: true,
  },
  {
    id: 'm4',
    contactId: 'c4',
    contactName: 'Daisy Le',
    contactAvatar: '/images/auth/avatar.jpg',
    lastMessage: 'Sprint planning is tomorrow at 9am.',
    timestamp: '2026-05-24T17:00:00Z',
    unread: 0,
    online: false,
  },
  {
    id: 'm5',
    contactId: 'c5',
    contactName: 'Ethan Vu',
    contactAvatar: '/images/auth/avatar.jpg',
    lastMessage: 'Deployment is done. All services are up.',
    timestamp: '2026-05-24T14:30:00Z',
    unread: 1,
    online: true,
  },
];
