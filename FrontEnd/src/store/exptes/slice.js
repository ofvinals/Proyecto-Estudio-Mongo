import { createSlice } from '@reduxjs/toolkit';
import { expteExtraReducers } from './extraReducers';

const initialState = {
	exptes: [],
	expte: null,
	mov: null,
	status: 'Inactivo',
	statusExpte: 'Inactivo',
	statusSign: 'Inactivo',
	statusUpdate: 'Inactivo',
	statusMov: 'Inactivo',
	error: null,
};

export const expteSlice = createSlice({
	name: 'exptes',
	initialState,
	reducers: {
		clearExpte(state) {
			state.expte = null;
			state.mov = null;
		},
	},
	extraReducers: expteExtraReducers,
});

export default expteSlice.reducer;
export const { clearExpte } = expteSlice.actions;
