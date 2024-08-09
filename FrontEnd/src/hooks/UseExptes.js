import { useAppDispatch, useAppSelector } from './store';
import {
	getExpte as getExpteThunk,
	getExptes as getExptesThunk,
	createExpte as createExpteThunk,
	updateExpte as updateExpteThunk,
	deleteExpte as deleteExpteThunk,
	createMov as createMovThunk,
	updateMov as updateMovThunk,
	deleteMov as deleteMovThunk,
} from '../store/exptes/thunks';
import { clearExpte } from '../store/exptes/slice';

export function useExpteActions() {
	const exptes = useAppSelector((state) => state.exptes.exptes);
	const expte = useAppSelector((state) => state.exptes.expte);
	const mov = useAppSelector((state) => state.exptes.mov);

	const expteStatus = useAppSelector((state) => state.exptes.status);

	const dispatch = useAppDispatch();

	const getExpte = async (id) => {
		await dispatch(getExpteThunk(id));
	};

	const getExptes = async () => {
		await dispatch(getExptesThunk());
	};

	const createExpte = async ({ values }) => {
		await dispatch(createExpteThunk({ values }));
	};

	const updateExpte = async (rowId, values) => {
		await dispatch(updateExpteThunk({ id: rowId, values }));
	};

	const deleteExpte = async (id) => {
		await dispatch(deleteExpteThunk(id));
	};

	const clearStateExpte = () => {
		dispatch(clearExpte());
	};

	const createMov = async (expteId, movData) => {
		await dispatch(createMovThunk({ expteId, movData }));
	};

	const updateMov = async (expteId, rowId, movData) => {
		await dispatch(updateMovThunk({ expteId, rowId, movData }));
	};

	const deleteMov = async (expedienteId, movimientoId) => {
		await dispatch(deleteMovThunk({ expedienteId, movimientoId }));
	};

	return {
		exptes,
		expte,
		getExpte,
		getExptes,
		createExpte,
		updateExpte,
		deleteExpte,
		clearStateExpte,
		expteStatus,
		mov,
		createMov,
		updateMov,
		deleteMov,
	};
}
