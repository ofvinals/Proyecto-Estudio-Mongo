import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../src/hooks/useAuth';
import Loader from '../src/utils/Loader';
import { useLoad } from '../src/hooks/useLoad';
const PrivateRoute = () => {
	const { loggedUser } = useAuth();
	const { isLoading } = useLoad();

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	if (!loggedUser) return <Navigate to='/login' />;

	return <Outlet />;
};

export default PrivateRoute;
