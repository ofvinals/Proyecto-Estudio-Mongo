import { createSlice } from '@reduxjs/toolkit';
import { billExtraReducers } from './extraReducers';

const initialState = {
	bills: [],
	bill: null,
	status: 'Inactivo',
	statusBill: 'Inactivo',
	statusSign: 'Inactivo',
	statusUpdate: 'Inactivo',
	statusDelete: 'Inactivo',
	error: null,
};

export const billSlice = createSlice({
	name: 'bills',
	initialState,
	reducers: {
		clearBill(state) {
			state.bill = null;
		},
	},
	extraReducers: billExtraReducers,
});

export default billSlice.reducer;
export const { clearBill } = billSlice.actions;
