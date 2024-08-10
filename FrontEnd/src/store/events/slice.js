import { createSlice } from '@reduxjs/toolkit';
import { eventExtraReducers } from './extraReducers';

const initialState = {
	events: [],
	event: null,
	status: 'Inactivo',
	statusEvent: 'Inactivo',
	statusSign: 'Inactivo',
	statusUpdate: 'Inactivo',
	statusDelete: 'Inactivo',
	error: null,
};

export const eventSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		clearEvent(state) {
			state.event = null;
		},
	},
	extraReducers: eventExtraReducers,
});

export default eventSlice.reducer;
export const { clearEvent } = eventSlice.actions;
