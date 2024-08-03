import { useNavigate } from 'react-router-dom';
import { register, login, loginWithGoogle, logout } from '../store/auth/thunks';
import { useAppDispatch, useAppSelector } from './store';

export function useAuth() {
	const loggedUser = useAppSelector((state) => state.auth.loggedUser);
	const statusSign = useAppSelector((state) => state.auth.statusSign);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loginGoogle = async ({ setOpenSignIn }) => {
		const userAction = await dispatch(loginWithGoogle());
		if (userAction.error) {
			alert(userAction.payload);
		} else {
			setOpenSignIn(false);
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

	const registerUser = async (user, { setOpenRegister }) => {
		const res = await dispatch(register(user));

		if (res.error) {
			alert(res.payload);
		} else {
			setOpenRegister(false);
			navigate('/account');
		}
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return {
		loggedUser,
		loginGoogle,
		loginEmail,
		registerUser,
		logoutUser,
		statusSign,
	};
}
