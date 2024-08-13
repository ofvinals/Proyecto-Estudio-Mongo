import { createSelector } from '@reduxjs/toolkit';

const selectNotesState = (state) => state.notes;

export const selectNotes = createSelector(
	[selectNotesState],
	(notesState) => notesState.notes
);

export const selectNoteStatus = createSelector(
	[selectNotesState],
	(notesState) => notesState.status.notes
);

export const selectNote = createSelector(
	[selectNotesState],
	(notesState) => notesState.note
);

export const selectSignStatus = createSelector(
	[selectNotesState],
	(notesState) => notesState.status.sign
);

export const selectUpdateStatus = createSelector(
	[selectNotesState],
	(notesState) => notesState.status.update
);

export const selectDeleteStatus = createSelector(
	[selectNotesState],
	(notesState) => notesState.status.delete
);

