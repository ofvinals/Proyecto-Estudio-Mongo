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
			state.status.events = 'Cargando';
		})
		.addCase(getEvents.fulfilled, (state, action) => {
			state.status.events = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(getEvents.rejected, (state, action) => {
			state.status.events = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getEvent.pending, (state) => {
			state.status.event = 'Cargando';
		})
		.addCase(getEvent.fulfilled, (state, action) => {
			state.status.event = 'Exitoso';
			state.event = action.payload;
		})
		.addCase(getEvent.rejected, (state, action) => {
			state.status.events = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteEvent.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteEvent.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(deleteEvent.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createEvent.pending, (state) => {
			state.status.event = 'Cargando';
		})
		.addCase(createEvent.fulfilled, (state, action) => {
			state.status.event = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(createEvent.rejected, (state, action) => {
			state.status.event = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createGoogleEvent.pending, (state) => {
			state.status.event = 'Cargando';
		})
		.addCase(createGoogleEvent.fulfilled, (state, action) => {
			state.status.event = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(createGoogleEvent.rejected, (state, action) => {
			state.status.event = 'Fallido';
			state.error = action.payload;
		});

		builder
		.addCase(updateEvent.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateEvent.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.events = action.payload;
		})
		.addCase(updateEvent.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});
};
