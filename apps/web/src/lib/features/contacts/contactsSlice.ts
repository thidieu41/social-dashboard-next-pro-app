import { Contact } from '@repo/shared/mock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContactsState = {
  list: Contact[];
  loading: boolean;
  error: string | null;
};

const initialState: ContactsState = {
  list: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setContactsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setContactsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setContacts, setContactsLoading, setContactsError } =
  contactsSlice.actions;
export default contactsSlice.reducer;
