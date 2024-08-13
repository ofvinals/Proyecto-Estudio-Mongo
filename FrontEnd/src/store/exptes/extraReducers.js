import {
	getExpte,
	getExptes,
	createExpte,
	deleteExpte,
	updateExpte,
	deleteMov,
	createMov,
	updateMov,
} from './thunks';

export const expteExtraReducers = (builder) => {
	builder
		.addCase(getExptes.pending, (state) => {
			state.status.exptes = 'Cargando';
		})
		.addCase(getExptes.fulfilled, (state, action) => {
			state.status.exptes = 'Exitoso';
			state.exptes = action.payload;
		})
		.addCase(getExptes.rejected, (state, action) => {
			state.status.exptes = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getExpte.pending, (state) => {
			state.status.expte = 'Cargando';
		})
		.addCase(getExpte.fulfilled, (state, action) => {
			state.status.expte = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(getExpte.rejected, (state, action) => {
			state.status.expte = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createExpte.pending, (state) => {
			state.status.sign = 'Cargando';
		})
		.addCase(createExpte.fulfilled, (state, action) => {
			state.status.sign = 'Exitoso';
			state.exptes = action.payload;
		})
		.addCase(createExpte.rejected, (state, action) => {
			state.status.sign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteExpte.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteExpte.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.exptes = action.payload;
		})
		.addCase(deleteExpte.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateExpte.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateExpte.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(updateExpte.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createMov.pending, (state) => {
			console.log(state);
			state.status.sign = 'Cargando';
		})
		.addCase(createMov.fulfilled, (state, action) => {
			state.status.sign = 'Exitoso';
			state.expte=(action.payload);
		})
		.addCase(createMov.rejected, (state, action) => {
			state.status.sign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteMov.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteMov.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(deleteMov.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateMov.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateMov.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.mov = action.payload;
		})
		.addCase(updateMov.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});
};
