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
			state.status = 'Cargando';
		})
		.addCase(getUsers.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.users = action.payload;
		})
		.addCase(getUsers.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getUser.pending, (state) => {
			state.statusUser = 'Cargando';
		})
		.addCase(getUser.fulfilled, (state, action) => {
			state.statusUser = 'Exitoso';
			state.user = action.payload;
		})
		.addCase(getUser.rejected, (state, action) => {
			state.statusUser = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteUser.pending, (state) => {
			state.statusSign = 'Cargando';
		})
		.addCase(deleteUser.fulfilled, (state, action) => {
			state.statusSign = 'Exitoso';
			state.user = action.payload;
		})
		.addCase(deleteUser.rejected, (state, action) => {
			state.statusSign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateUser.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateUser.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.user = action.payload;
		})
		.addCase(updateUser.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
	builder
		.addCase(getUserbyGoogle.pending, (state) => {
			state.statusUser = 'Cargando';
		})
		.addCase(getUserbyGoogle.fulfilled, (state, action) => {
			state.statusUser = 'Exitoso';
			state.users = action.payload;
			console.log(action);
		})
		.addCase(getUserbyGoogle.rejected, (state, action) => {
			state.statusUser = 'Fallido';
			state.error = action.payload;
		});
};
