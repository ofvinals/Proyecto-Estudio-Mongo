import {
	getCash,
	getCashs,
	createCash,
	deleteCash,
	updateCash,
} from './thunks';

export const cashExtraReducers = (builder) => {
	builder
		.addCase(getCashs.pending, (state) => {
			state.status.cashs = 'Cargando';
		})
		.addCase(getCashs.fulfilled, (state, action) => {
			state.status.cashs = 'Exitoso';
			state.cashs = action.payload;
		})
		.addCase(getCashs.rejected, (state, action) => {
			state.status.cashs = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getCash.pending, (state) => {
			state.status.cash = 'Cargando';
		})
		.addCase(getCash.fulfilled, (state, action) => {
			state.status.cash  = 'Exitoso';
			state.cash = action.payload;
		})
		.addCase(getCash.rejected, (state, action) => {
			state.status.cash  = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createCash.pending, (state) => {
			state.status.sign = 'Cargando';
		})
		.addCase(createCash.fulfilled, (state, action) => {
			state.status.sign = 'Exitoso';
			state.cashs = action.payload;
		})
		.addCase(createCash.rejected, (state, action) => {
			state.status.sign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteCash.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteCash.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.cashs = action.payload;
		})
		.addCase(deleteCash.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateCash.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateCash.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.cashs = action.payload;
		})
		.addCase(updateCash.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});
};
