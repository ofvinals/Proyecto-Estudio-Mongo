import { useAppDispatch, useAppSelector } from './store';
import {
	getCash as getCashThunk,
	getCashs as getCashsThunk,
	createCash as createCashThunk,
	updateCash as updateCashThunk,
	deleteCash as deleteCashThunk,
} from '../store/cashs/thunks';
import { clearCash } from '../store/cashs/slice';

export function useCashActions() {
	const cashs = useAppSelector((state) => state.cashs.cashs);
	const cash = useAppSelector((state) => state.cashs.cash);
	const cashStatus = useAppSelector((state) => state.cashs.statusCash);

	const dispatch = useAppDispatch();

	const getCash = async (id) => {
		await dispatch(getCashThunk(id));
	};

	const getCashs = async () => {
		await dispatch(getCashsThunk());
	};

	const createCash = async ({ values }) => {
		await dispatch(createCashThunk({ values }));
	};

	const updateCash = async ({ rowId, values }) => {
		await dispatch(updateCashThunk({ id: rowId, values }));
	};

	const deleteCash = async (id) => {
		await dispatch(deleteCashThunk(id));
	};

	const clearStateCash = () => {
		dispatch(clearCash());
	};

	return {
		cashs,
		cash,
		getCash,
		getCashs,
		createCash,
		updateCash,
		deleteCash,
		clearStateCash,
		cashStatus,
	};
}
