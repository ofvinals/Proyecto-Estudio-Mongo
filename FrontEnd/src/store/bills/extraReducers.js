import {
	getBill,
	getBills,
	createBill,
	deleteBill,
	updateBill,
} from './thunks';

export const billExtraReducers = (builder) => {
	builder
		.addCase(getBills.pending, (state) => {
			state.status.bills = 'Cargando';
		})
		.addCase(getBills.fulfilled, (state, action) => {
			state.status.bills = 'Exitoso';
			state.bills = action.payload;
		})
		.addCase(getBills.rejected, (state, action) => {
			state.status.bills = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getBill.pending, (state) => {
			state.status.bill = 'Cargando';
		})
		.addCase(getBill.fulfilled, (state, action) => {
			state.status.bill = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(getBill.rejected, (state, action) => {
			state.status.bill = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createBill.pending, (state) => {
			state.status.sign = 'Cargando';
		})
		.addCase(createBill.fulfilled, (state, action) => {
			state.status.sign = 'Exitoso';
			state.bills = action.payload;
		})
		.addCase(createBill.rejected, (state, action) => {
			state.status.sign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteBill.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteBill.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.bills = action.payload;
		})
		.addCase(deleteBill.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateBill.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateBill.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(updateBill.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});
};
