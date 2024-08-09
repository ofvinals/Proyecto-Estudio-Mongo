import {
	getTurn,
	createTurn,
	createEvent,
	getTurns,
	deleteTurn,
	updateTurn,
} from './thunks';

export const turnExtraReducers = (builder) => {
	builder
		.addCase(getTurns.pending, (state) => {
			state.status = 'Cargando';
		})
		.addCase(getTurns.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.turns = action.payload;
		})
		.addCase(getTurns.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getTurn.pending, (state) => {
			state.statusTurn = 'Cargando';
		})
		.addCase(getTurn.fulfilled, (state, action) => {
			state.statusTurn = 'Exitoso';
			state.turn = action.payload;
		})
		.addCase(getTurn.rejected, (state, action) => {
			state.statusTurn = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteTurn.pending, (state) => {
			state.statusDelete = 'Cargando';
		})
		.addCase(deleteTurn.fulfilled, (state, action) => {
			state.statusDelete = 'Exitoso';
			state.turns = action.payload;
		})
		.addCase(deleteTurn.rejected, (state, action) => {
			state.statusDelete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createTurn.pending, (state) => {
			state.statusTurn = 'Cargando';
		})
		.addCase(createTurn.fulfilled, (state, action) => {
			state.statusTurn = 'Exitoso';
			state.turns = action.payload;
		})
		.addCase(createTurn.rejected, (state, action) => {
			state.statusTurn = 'Fallido';
			state.error = action.payload;
		});
	builder
		.addCase(createEvent.pending, (state) => {
			state.statusTurn = 'Cargando';
		})
		.addCase(createEvent.fulfilled, (state, action) => {
			state.statusTurn = 'Exitoso';
			state.turns = action.payload;
		})
		.addCase(createEvent.rejected, (state, action) => {
			state.statusTurn = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateTurn.pending, (state) => {
			state.statusUpdate = 'Cargando';
		})
		.addCase(updateTurn.fulfilled, (state, action) => {
			state.statusUpdate = 'Exitoso';
			state.turns = action.payload;
		})
		.addCase(updateTurn.rejected, (state, action) => {
			state.statusUpdate = 'Fallido';
			state.error = action.payload;
		});
};
