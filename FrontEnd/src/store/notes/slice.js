import { createSlice } from '@reduxjs/toolkit';
import { noteExtraReducers } from './extraReducers';

const initialState = {
	notes: [],
	note: null,
	status: {
		notes: 'Inactivo',
		note: 'Inactivo',
		sign: 'Inactivo',
		update: 'Inactivo',
		delete: 'Inactivo',
	},
	error: null,
};

export const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clearNote(state) {
			state.note = null;
		},
	},
	extraReducers: noteExtraReducers,
});

export default noteSlice.reducer;
export const { clearNote } = noteSlice.actions;
