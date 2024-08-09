import { useAppDispatch, useAppSelector } from './store';
import {
	getUser as getUserThunk,
	getUserbyGoogle as getUserbyGoogleThunk,
	getUsers as getUsersThunk,
	createUser as createUserThunk,
	deleteUser as deleteUserThunk,
	updateUser as updateUserThunk,
} from '../store/users/thunks';
import { clearUser } from '../store/users/slice';

export function useUserActions() {
	const users = useAppSelector((state) => state.users.users);
	const user = useAppSelector((state) => state.users.user);
	const userStatus = useAppSelector((state) => state.users.status);

	const dispatch = useAppDispatch();

	const getUser = async (id) => {
		await dispatch(getUserThunk(id));
	};

	const getUsers = async () => {
		await dispatch(getUsersThunk());
	};

	const getUserbyGoogle = async () => {
		await dispatch(getUserbyGoogleThunk());
	};

	const createUser = async ({ values }) => {
		await dispatch(createUserThunk({ values }));
	};

	const updateUser = async ({ rowId, values }) => {
		await dispatch(updateUserThunk({ id: rowId, values }));
	};

	const deleteUser = async (id) => {
		await dispatch(deleteUserThunk(id));
	};

	const clearStateUser = () => {
		dispatch(clearUser());
	};

	return {
		users,
		user,
		getUser,
		getUserbyGoogle,
		getUsers,
		createUser,
		deleteUser,
		updateUser,
		clearStateUser,
		userStatus,
	};
}
