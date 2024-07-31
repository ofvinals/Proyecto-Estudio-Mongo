import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from './extraReducers';

const initialState = {
  users: [],
  user: null,
  status: 'Inactivo',
  statusUser: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: userExtraReducers,
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
