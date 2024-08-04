import { useNavigate } from 'react-router-dom';
import { register, login, loginWithGoogle, logout } from '../store/auth/thunks';
import { useAppDispatch, useAppSelector } from './store';
import { useUserActions } from './UseUserActions';

export function useAuth() {
	const { getUserbyGoogle } = useUserActions();
	const loggedUser = useAppSelector((state) => state.auth.loggedUser);
	const statusAuth = useAppSelector((state) => state.auth.statusAuth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loginGoogle = async () => {
		const userAction = await dispatch(loginWithGoogle({ getUserbyGoogle }));
		if (userAction.error) {
			alert(userAction.payload);
		} else {
			const user = userAction.payload;
			if (user.admin || user.coadmin) {
				navigate('/admin');
			} else {
				navigate('/adminusu');
			}
		}
	};

	const loginEmail = async ({ email, password }) => {
		const userAction = await dispatch(login({ email, password }));
		if (userAction.error) {
			alert(userAction.payload);
		} else {
			const user = userAction.payload;
			if (user.admin) {
				navigate('/admin');
			} else {
				navigate('/adminusu');
			}
		}
		return userAction.payload;
	};

	const registerUser = async (user) => {
		await dispatch(register(user));
		navigate('/adminusu');
	};

	const logoutUser = () => {
		dispatch(logout());
		navigate('/home');
	};

	return {
		loggedUser,
		loginGoogle,
		loginEmail,
		registerUser,
		logoutUser,
		statusAuth,
	};
}
