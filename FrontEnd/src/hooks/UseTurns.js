import { useAppDispatch, useAppSelector } from './store';
import {
	getTurn as getTurnThunk,
	getTurns as getTurnsThunk,
	createTurn as createTurnThunk,
	updateTurn as updateTurnThunk,
	deleteTurn as deleteTurnThunk,
} from '../store/turns/thunks';
import { clearTurn as clearTurnThunk } from '../store/turns/slice';

export function useTurnActions() {
	const turns = useAppSelector((state) => state.turns.turns);
	const turn = useAppSelector((state) => state.turns.turn);
	const turnStatus = useAppSelector((state) => state.turns.status);

	const dispatch = useAppDispatch();

	const getTurn = async (id) => {
		await dispatch(getTurnThunk(id));
	};

	const getTurns = async () => {
		await dispatch(getTurnsThunk());
	};

	const createTurn = async (turnoData) => {
		await dispatch(createTurnThunk({ turn: turnoData }));
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
		updateTurn,
		deleteTurn,
		clearTurn,
		turnStatus,
	};
}
