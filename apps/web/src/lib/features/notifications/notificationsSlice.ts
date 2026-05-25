import { Notification } from '@repo/shared/mock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationsState = {
  list: Notification[];
  loading: boolean;
  error: string | null;
};

const initialState: NotificationsState = {
  list: [],
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNotificationsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setNotificationsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.list.find((n) => n.id === action.payload);
      if (notification) notification.read = true;
    },
  },
});

export const {
  setNotifications,
  setNotificationsLoading,
  setNotificationsError,
  markAsRead,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
