import { createSlice } from '@reduxjs/toolkit';
import { turnExtraReducers } from './extraReducers';

const initialState = {
	turns: [],
	turn: null,
	status: 'Inactivo',
	statusTurn: 'Inactivo',
	statusSign: 'Inactivo',
	statusUpdate: 'Inactivo',
	statusDelete: 'Inactivo',
	error: null,
};

export const turnSlice = createSlice({
	name: 'turns',
	initialState,
	reducers: {
		clearTurn(state) {
			state.turn = null;
		},
	},
	extraReducers: turnExtraReducers,
});

export default turnSlice.reducer;
export const { clearTurn } = turnSlice.actions;
