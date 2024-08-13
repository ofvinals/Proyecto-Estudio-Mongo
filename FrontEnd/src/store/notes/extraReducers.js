import {
	getNote,
	createNote,
	getNotes,
	deleteNote,
	updateNote,
} from './thunks';

export const noteExtraReducers = (builder) => {
	builder
		.addCase(getNotes.pending, (state) => {
			state.status.notes = 'Cargando';
		})
		.addCase(getNotes.fulfilled, (state, action) => {
			state.status.notes = 'Exitoso';
			state.notes = action.payload;
		})
		.addCase(getNotes.rejected, (state, action) => {
			state.status.notes = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(getNote.pending, (state) => {
			state.status.note = 'Cargando';
		})
		.addCase(getNote.fulfilled, (state, action) => {
			state.status.note = 'Exitoso';
			state.note = action.payload;
		})
		.addCase(getNote.rejected, (state, action) => {
			state.status.note = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(deleteNote.pending, (state) => {
			state.status.delete = 'Cargando';
		})
		.addCase(deleteNote.fulfilled, (state, action) => {
			state.status.delete = 'Exitoso';
			state.notes = action.payload;
		})
		.addCase(deleteNote.rejected, (state, action) => {
			state.status.delete = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(createNote.pending, (state) => {
			state.status.sign = 'Cargando';
		})
		.addCase(createNote.fulfilled, (state, action) => {
			state.status.sign = 'Exitoso';
			state.notes = action.payload;
		})
		.addCase(createNote.rejected, (state, action) => {
			state.status.sign = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(updateNote.pending, (state) => {
			state.status.update = 'Cargando';
		})
		.addCase(updateNote.fulfilled, (state, action) => {
			state.status.update = 'Exitoso';
			state.notes = action.payload;
		})
		.addCase(updateNote.rejected, (state, action) => {
			state.status.update = 'Fallido';
			state.error = action.payload;
		});
};
