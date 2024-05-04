/* eslint-disable react/prop-types */
import { useAuth } from '../../context/AuthContext';

export const Detail = ({ modulo }) => {
	const nombreModulo = modulo;
	const { currentUser } = useAuth();
	const displayName = currentUser.displayName;

	return (
		<div>
			<div className=' container-lg bg-transparent'>
				<div className='flex flex-col items-center px-3 '>
					<h4 className='text-center text-3xl font-bold my-3 bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Bienvenido, {displayName}
					</h4>
					<p className='text-center text-xl text-white font-semibold my-2'>
						Panel de Administracion de {nombreModulo}
					</p>
				</div>
			</div>
		</div>
	);
};
