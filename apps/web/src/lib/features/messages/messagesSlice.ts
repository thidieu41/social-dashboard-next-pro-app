import { Message } from '@repo/shared/mock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MessagesState = {
  list: Message[];
  loading: boolean;
  error: string | null;
};

const initialState: MessagesState = {
  list: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMessagesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMessagesError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    markMessageRead(state, action: PayloadAction<string>) {
      const msg = state.list.find((m) => m.id === action.payload);
      if (msg) msg.unread = 0;
    },
  },
});

export const {
  setMessages,
  setMessagesLoading,
  setMessagesError,
  markMessageRead,
} = messagesSlice.actions;
export default messagesSlice.reducer;
