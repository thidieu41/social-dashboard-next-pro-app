import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import notificationsReducer from './features/notifications/notificationsSlice';
import contactsReducer from './features/contacts/contactsSlice';
import messagesReducer from './features/messages/messagesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      notifications: notificationsReducer,
      contacts: contactsReducer,
      messages: messagesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
