import { useAppDispatch, useAppSelector } from './store';
import {
	getNote as getNoteThunk,
	getNotes as getNotesThunk,
	createNote as createNoteThunk,
	updateNote as updateNoteThunk,
	deleteNote as deleteNoteThunk,
} from '../store/notes/thunks';
import { clearNote as clearNoteThunk } from '../store/notes/slice';

export function useNotesActions() {
	const notes = useAppSelector((state) => state.notes.notes);
	const note = useAppSelector((state) => state.notes.note);
	const noteStatus = useAppSelector((state) => state.notes.status);

	const dispatch = useAppDispatch();

	const getNote = async (id) => {
		await dispatch(getNoteThunk(id));
	};

	const getNotes = async () => {
		await dispatch(getNotesThunk());
	};

	const createNote = async (noteData) => {
		await dispatch(createNoteThunk(noteData));
	};

	const updateNote = async ({ rowId, values }) => {
		await dispatch(updateNoteThunk({ id: rowId, values }));
	};

	const deleteNote = async (id) => {
		await dispatch(deleteNoteThunk(id));
	};

	const clearNote = () => {
		dispatch(clearNoteThunk());
	};

	return {
		notes,
		note,
		getNote,
		getNotes,
		createNote,
		updateNote,
		deleteNote,
		clearNote,
		noteStatus,
	};
}
