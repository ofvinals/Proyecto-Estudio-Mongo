/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UseContext.jsx';
import '../css/Header.css';
import { Notas } from '../components/Notas.jsx';
import Swal from 'sweetalert2';
import { Detail } from '../components/Gestion/Detail.jsx';
import { Header } from '../components/Header.jsx';

export const Admin = () => {
	const { currentUser, logout } = useAuth({});
	const navigate = useNavigate();
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;

	useEffect(() => {
		if (!admin && !coadmin) {
			navigate('/adminusu');
		}
	}, []);

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

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad]'>
				<Header />
				<div className=' rounded-xl container-lg mb-1 pt-24'>
					<Detail modulo={'estudio'} />
				</div>

				<hr className='linea text-white mx-3' />

				<div className='flex flex-wrap items-center justify-around mt-3 px-10'>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[240px] mb-3 border-primary rounded-xl font-bold'
						to='/gestionusuarios'>
						<i className='text-xl pe-2 bi bi-people-fill'></i>
						Gestionar Usuarios
					</Link>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[240px] mb-3 border-primary rounded-xl font-bold'
						to='/gestionexpedientes'>
						<i className='text-xl pe-2 bi bi-archive-fill'></i>
						Gestionar Expedientes
					</Link>
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[240px] mb-3 border-primary rounded-xl font-bold'
						to='/gestionagenda'>
						<i className='text-xl pe-2 bi bi-calendar-check-fill'></i>
						Gestionar Agenda
					</Link> 
					<Link
						className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[240px] mb-3 border-primary rounded-xl font-bold'
						to='/gestiongastos'>
						<i className='text-xl pe-2 bi bi-coin'></i>
						Gestionar Gastos
					</Link>
					{admin ? (
						<Link
							className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[240px] mb-3 border-primary rounded-xl font-bold'
							to='/gestioncaja'>
							<i className='text-xl pe-2 bi bi-cash-coin'></i>
							Gestion de Caja
						</Link>
					) : null}

					<Link
						className='bg-background shadow-3xl btnLogout mx-2 text-white text-center p-2 border-2 w-[240px] mb-3 border-white rounded-xl font-bold'
						onClick={handleLogOut}
						to='/home'>
						<i className='text-xl pe-2 bi bi-x-circle'></i>
						Cerrar Sesion
					</Link>
				</div>
				<Notas />
			</div>
		</>
	);
};
