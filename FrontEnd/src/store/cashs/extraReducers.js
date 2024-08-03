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
			state.status = 'Cargando';
		})
		.addCase(getCashs.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.cashs = action.payload;
		})
		.addCase(getCashs.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getCash.pending, (state) => {
			state.statusCash = 'Cargando';
		})
		.addCase(getCash.fulfilled, (state, action) => {
			state.statusCash = 'Exitoso';
			state.cash = action.payload;
		})
		.addCase(getCash.rejected, (state, action) => {
			state.statusCash = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createCash.pending, (state) => {
			state.statusCash = 'Cargando';
		})
		.addCase(createCash.fulfilled, (state, action) => {
			state.statusCash = 'Exitoso';
			state.cash = action.payload;
		})
		.addCase(createCash.rejected, (state, action) => {
			state.statusCash = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteCash.pending, (state) => {
			state.statusSign = 'Cargando';
		})
		.addCase(deleteCash.fulfilled, (state, action) => {
			state.statusSign = 'Exitoso';
			state.cash = action.payload;
		})
		.addCase(deleteCash.rejected, (state, action) => {
			state.statusSign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateCash.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateCash.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.cash = action.payload;
		})
		.addCase(updateCash.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
};
