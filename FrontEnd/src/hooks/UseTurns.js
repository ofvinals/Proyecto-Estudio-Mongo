import { useAppDispatch, useAppSelector } from './store';
import {
	getTurn as getTurnThunk,
	getTurns as getTurnsThunk,
	createTurn as createTurnThunk,
	createEvent as createEventThunk,
	updateTurn as updateTurnThunk,
	deleteTurn as deleteTurnThunk,
} from '../store/turns/thunks';
import { clearTurn as clearTurnThunk } from '../store/turns/slice';

export function useTurnActions() {
	const turns = useAppSelector((state) => state.turns.turns);
	const turn = useAppSelector((state) => state.turns.turn);
	const turnStatus = useAppSelector((state) => state.turns.statusTurn);

	const dispatch = useAppDispatch();

	const getTurn = async (id) => {
		try {
			await dispatch(getTurnThunk(id));
		} catch (error) {
			console.error('Error in getTurn:', error);
		}
	};

	const getTurns = async () => {
		await dispatch(getTurnsThunk());
	};

	const createTurn = async ({ values }) => {
		await dispatch(createTurnThunk({ values }));
	};

	const createEvent = async (values) => {
		await dispatch(createEventThunk(values));
	};

	const updateTurn = async ({ rowId, values }) => {
		await dispatch(updateTurnThunk({ id: rowId, values }));
	};

	const deleteTurn = async (id) => {
		await dispatch(deleteTurnThunk(id));
	};

	const clearTurn = () => {
		dispatch(clearTurnThunk());
	};

	return {
		turns,
		turn,
		getTurn,
		getTurns,
		createTurn,
		createEvent,
		updateTurn,
		deleteTurn,
		clearTurn,
		turnStatus,
	};
}
