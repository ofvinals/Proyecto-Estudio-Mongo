import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyLoggedUser } from '../src/store/auth/thunks';
import { useLoad } from '../src/hooks/useLoad';
import Loader from '../src/utils/Loader';

const PrivateRoute = () => {
	const dispatch = useDispatch();
	const loggedUser = useSelector((state) => state.auth.loggedUser);
	const { isLoading } = useLoad();
	console.log(isLoading)
	useEffect(() => {
		if (!loggedUser) {
			dispatch(verifyLoggedUser());
		}
	}, [dispatch, loggedUser]);

	if (isLoading) {
		return <Loader />;
	}
	console.log(isLoading)
	return loggedUser ? <Outlet /> : <Navigate to='/home' />;
};

export default PrivateRoute;
