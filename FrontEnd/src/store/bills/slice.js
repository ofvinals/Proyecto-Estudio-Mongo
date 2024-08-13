import { createSlice } from '@reduxjs/toolkit';
import { billExtraReducers } from './extraReducers';

const initialState = {
	bills: [],
	bill: null,
	status: {
		bills: 'Inactivo',
		bill: 'Inactivo',
		sign: 'Inactivo',
		update: 'Inactivo',
		delete: 'Inactivo',
	},
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
