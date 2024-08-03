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
			state.status = 'Cargando';
		})
		.addCase(getExptes.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.exptes = action.payload;
		})
		.addCase(getExptes.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getExpte.pending, (state) => {
			state.statusExpte = 'Cargando';
		})
		.addCase(getExpte.fulfilled, (state, action) => {
			state.statusExpte = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(getExpte.rejected, (state, action) => {
			state.statusExpte = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createExpte.pending, (state) => {
			state.statusExpte = 'Cargando';
		})
		.addCase(createExpte.fulfilled, (state, action) => {
			state.statusExpte = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(createExpte.rejected, (state, action) => {
			state.statusExpte = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteExpte.pending, (state) => {
			state.statusSign = 'Cargando';
		})
		.addCase(deleteExpte.fulfilled, (state, action) => {
			state.statusSign = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(deleteExpte.rejected, (state, action) => {
			state.statusSign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateExpte.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateExpte.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(updateExpte.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createMov.pending, (state) => {
			state.statusMov = 'Cargando';
		})
		.addCase(createMov.fulfilled, (state, action) => {
			state.statusMov = 'Exitoso';
			state.expte = action.payload;
		})
		.addCase(createMov.rejected, (state, action) => {
			state.statusMov = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteMov.pending, (state) => {
			state.statusSign = 'Cargando';
		})
		.addCase(deleteMov.fulfilled, (state, action) => {
			state.statusSign = 'Exitoso';
			state.mov = action.payload;
		})
		.addCase(deleteMov.rejected, (state, action) => {
			state.statusSign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateMov.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateMov.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.mov = action.payload;
		})
		.addCase(updateMov.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
};
