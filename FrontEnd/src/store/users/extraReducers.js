import {
	getUser,
	getUsers,
	deleteUser,
	getUserbyGoogle,
	updateUser,
} from './thunks';

export const userExtraReducers = (builder) => {
	builder
		.addCase(getUsers.pending, (state) => {
			state.status.users = 'Cargando';
		})
		.addCase(getUsers.fulfilled, (state, action) => {
			state.status.users = 'Exitoso';
			state.users = action.payload;
		})
		.addCase(getUsers.rejected, (state, action) => {
			state.status.users = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getUser.pending, (state) => {
			state.status.user = 'Cargando';
		})
		.addCase(getUser.fulfilled, (state, action) => {
			state.status.user = 'Exitoso';
			state.user = action.payload;
		})
		.addCase(getUser.rejected, (state, action) => {
			state.status.user = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteUser.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteUser.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.users = action.payload;
		})
		.addCase(deleteUser.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateUser.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateUser.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.user = action.payload;
		})
		.addCase(updateUser.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getUserbyGoogle.pending, (state) => {
			state.status.user = 'Cargando';
		})
		.addCase(getUserbyGoogle.fulfilled, (state, action) => {
			state.status.user = 'Exitoso';
			state.users = action.payload;
		})
		.addCase(getUserbyGoogle.rejected, (state, action) => {
			state.status.user = 'Fallido';
			state.error = action.payload;
		});
};
