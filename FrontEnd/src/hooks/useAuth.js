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
		try {
			const userAction = await dispatch(loginWithGoogle({ getUserbyGoogle })).unwrap();
			const user = userAction;
			if (user.admin || user.coadmin) {
				navigate('/admin');
			} else {
				navigate('/adminusu');
			}
		} catch (error) {
			alert(error);
		}
	};

	const loginEmail = async ({ email, password }) => {
		try {
			const userAction = await dispatch(login({ email, password })).unwrap();
			console.log(userAction)
			const user = userAction;
			if (user.admin) {
				navigate('/admin');
			} else {
				navigate('/adminusu');
			}
			return user;
		} catch (error) {
			alert(error);
		}
	};

	const registerUser = async (user) => {
		try {
			await dispatch(register(user)).unwrap();
			navigate('/adminusu');
		} catch (error) {
			alert(error);
		}
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
