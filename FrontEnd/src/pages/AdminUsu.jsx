import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/Header.css';
import Swal from 'sweetalert2';
import { Detail } from '../components/Gestion/Detail.jsx';
import { Header } from '../components/Header.jsx';
import { Novedades } from '../components/Novedades.jsx';
import { VerUsu } from '../components/Modals/Views/VerUsu.jsx';
import { useState } from 'react';

export const AdminUsu = () => {
	const { currentUser, logout } = useAuth({});
	const navigate = useNavigate();
	const userId = currentUser.id;
	const [openViewModal, setopenViewModal] = useState(false);

	const handleLogOut = async () => {
		await logout();
		Swal.fire({
			icon: 'success',
			title: 'Su sesion fue cerrada!',
			showConfirmButton: false,
			timer: 1500,
		});
		navigate('/home');
	};

	const handleOpenViewModal = () => {
		setopenViewModal(true);
	};

	const handleCloseModal = () => {
		setopenViewModal(false);
	};

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad]'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 pt-32 '>
					<Detail modulo={'Usuario'} />
				</div>
				<hr className='linea text-white mx-3' />

				<div className='flex flex-wrap items-center justify-around mt-3 px-10'>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						to='/gestionexpedientes'>
						<i className='text-xl pe-2 bi bi-archive'></i>
						Consultar Expedientes
					</Link>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						to='/agendausu'>
						<i className='text-xl pe-2 bi bi-calendar-check'></i>
						Solicitar Turno
					</Link>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						to='/gestiongastos'>
						<i className='text-xl pe-2 bi bi-coin'></i>
						Consultar Gastos
					</Link>
					<button
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						type='button'>
						<a
							href='https://api.whatsapp.com/send?phone=+543814581382&text=Hola!%20Quiero%20consultar%20por%20servicios%20de%20asesoramiento%20legal.%20'
							target='_blank'>
							<i className='text-xl pe-2 bi bi-whatsapp'></i>
							Consultas Online
						</a>
					</button>
					<button
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						type='button'
						onClick={() => {
							handleOpenViewModal(userId);
						}}>
						<i className='text-xl pe-2 bi bi-person-gear'></i>
						Modificar Datos
					</button>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[230px] mb-3 border-primary rounded-xl font-bold'
						to='/pagos'>
						<i className='text-xl pe-2 bi bi-cash-coin'></i>
						Ver Medios de Pago
					</Link>

					<button
						onClick={handleLogOut}
						className='bg-background shadow-3xl btnLogout mx-2 text-white text-center p-2 border-2 w-[200px] mb-3 border-white rounded-xl font-bold'>
						<i className='text-xl pe-2 bi bi-x-circle'></i>
						Cerrar Sesion
					</button>
				</div>

				<hr className='linea text-white mx-3' />
				<Novedades />
			</div>
			{openViewModal && (
				<VerUsu
					rowId={userId}
					showModal={openViewModal}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
};
