import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

const PrivateRoute = () => {
	const { isLoading, isAuthenticated } = useAuth();

	if (isLoading) {
		return (
			<div>
				<p className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-3xl text-center my-48'>
					Cargando...
				</p>
			</div>
		);
	}

	if (!isAuthenticated) return <Navigate to='/login' />;

	return <Outlet />;
};

export default PrivateRoute;
