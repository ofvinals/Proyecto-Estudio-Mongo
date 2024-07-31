import { createSlice } from '@reduxjs/toolkit';
import {
	register,
	login,
	loginWithGoogle,
	logout,
	verifyLoggedUser,
} from './thunks';

const initialState = {
	loggedUser: null,
	status: 'Inactivo',
	statusUser: 'Inactivo',
	statusAuth: 'Inactivo',
	statusSign: 'Inactivo',
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser(state) {
			state.loggedUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.loggedUser = action.payload;
				state.statusSign = 'activo';
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.payload;
				state.statusSign = 'fallido';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loggedUser = action.payload;
				state.statusAuth = 'activo';
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.payload;
				state.statusAuth = 'fallido';
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loggedUser = action.payload;
				state.statusAuth = 'activo';
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.error = action.payload;
				state.statusAuth = 'fallido';
			})
			.addCase(logout.fulfilled, (state) => {
				state.loggedUser = null;
				state.statusAuth = 'inactivo';
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(verifyLoggedUser.fulfilled, (state, action) => {
				state.loggedUser = action.payload;
				state.statusAuth = 'activo';
			})
			.addCase(verifyLoggedUser.rejected, (state, action) => {
				state.error = action.payload;
				state.statusAuth = 'inactivo';
			});
	},
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
