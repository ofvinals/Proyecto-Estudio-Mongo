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
			state.status = 'Cargando';
		})
		.addCase(getBills.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.bills = action.payload;
		})
		.addCase(getBills.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getBill.pending, (state) => {
			state.statusBill = 'Cargando';
		})
		.addCase(getBill.fulfilled, (state, action) => {
			state.statusBill = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(getBill.rejected, (state, action) => {
			state.statusBill = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createBill.pending, (state) => {
			state.statusBill = 'Cargando';
		})
		.addCase(createBill.fulfilled, (state, action) => {
			state.statusBill = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(createBill.rejected, (state, action) => {
			state.statusBill = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteBill.pending, (state) => {
			state.statusSign = 'Cargando';
		})
		.addCase(deleteBill.fulfilled, (state, action) => {
			state.statusSign = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(deleteBill.rejected, (state, action) => {
			state.statusSign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateBill.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateBill.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.bill = action.payload;
		})
		.addCase(updateBill.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
};
