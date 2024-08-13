import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from './extraReducers';

const initialState = {
	users: [],
	user: null,
	status: {
		users: 'Inactivo',
		user: 'Inactivo',
		sign: 'Inactivo',
		update: 'Inactivo',
		delete: 'Inactivo',
	},
	error: null,
};

export const userSlice = createSlice({
	name: 'users',
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
