import { useAppDispatch, useAppSelector } from './store';
import {
	getBill as getBillThunk,
	getBills as getBillsThunk,
	createBill as createBillThunk,
	updateBill as updateBillThunk,
	deleteBill as deleteBillThunk,
} from '../store/bills/thunks';
import { clearBill } from '../store/bills/slice';

export function useBillActions() {
	const bills = useAppSelector((state) => state.bills.bills);
	const bill = useAppSelector((state) => state.bills.bill);
	const billStatus = useAppSelector((state) => state.bills.status);

	const dispatch = useAppDispatch();

	const getBill = async (id) => {
		await dispatch(getBillThunk(id));
	};

	const getBills = async () => {
		await dispatch(getBillsThunk());
	};

	const createBill = async (gasto) => {
		await dispatch(createBillThunk({ gasto }));
	};

	const updateBill = async (rowId, values) => {
		await dispatch(updateBillThunk({ id: rowId, values }));
	};

	const deleteBill = async (id) => {
		await dispatch(deleteBillThunk(id));
	};

	const clearStateBill = () => {
		dispatch(clearBill());
	};

	return {
		bills,
		bill,
		getBill,
		getBills,
		createBill,
		updateBill,
		deleteBill,
		clearStateBill,
		billStatus,
	};
}
