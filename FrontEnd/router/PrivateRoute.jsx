import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../src/context/UseContext';
import Loader from '../src/components/Loader';

const PrivateRoute = () => {
	const { isLoading, isAuthenticated } = useAuth();

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	if (!isAuthenticated) return <Navigate to='/login' />;

	return <Outlet />;
};

export default PrivateRoute;
