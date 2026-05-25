import { User } from '@repo/shared/mock';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
  list: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUsersLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUsersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUsers, setUsersLoading, setUsersError } = usersSlice.actions;
export default usersSlice.reducer;
