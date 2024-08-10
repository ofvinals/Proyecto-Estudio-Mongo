import {
	getEvent,
	createEvent,
	createGoogleEvent,
	getEvents,
	deleteEvent,
	updateEvent,
} from './thunks';

export const eventExtraReducers = (builder) => {
	builder
		.addCase(getEvents.pending, (state) => {
			state.status = 'Cargando';
		})
		.addCase(getEvents.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(getEvents.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getEvent.pending, (state) => {
			state.statusEvent = 'Cargando';
		})
		.addCase(getEvent.fulfilled, (state, action) => {
			state.statusEvent = 'Exitoso';
			state.event = action.payload;
		})
		.addCase(getEvent.rejected, (state, action) => {
			state.statusEvent = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteEvent.pending, (state) => {
			state.statusDelete = 'Cargando';
		})
		.addCase(deleteEvent.fulfilled, (state, action) => {
			state.statusDelete = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(deleteEvent.rejected, (state, action) => {
			state.statusDelete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createEvent.pending, (state) => {
			state.statusEvent = 'Cargando';
		})
		.addCase(createEvent.fulfilled, (state, action) => {
			state.statusEvent = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(createEvent.rejected, (state, action) => {
			state.statusEvent = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createGoogleEvent.pending, (state) => {
			state.statusEvent = 'Cargando';
		})
		.addCase(createGoogleEvent.fulfilled, (state, action) => {
			state.statusEvent = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(createGoogleEvent.rejected, (state, action) => {
			state.statusEvent = 'Fallido';
			state.error = action.payload;
		});

		builder
		.addCase(updateEvent.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateEvent.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(updateEvent.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
};
