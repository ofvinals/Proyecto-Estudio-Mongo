import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../../css/Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';
import { getTurnos, deleteTurno } from '../../hooks/UseTurns.js';
import { Table } from '../../components/Gestion/Table';
import { Detail } from '../../components/Gestion/Detail';
import { VerTurno } from '../../components/Modals/Views/VerTurno';
import { EditarTurnos } from '../../components/Modals/Edits/EditarTurnos';
import { Header } from '../../components/Header.jsx';
import Tooltip from '@mui/material/Tooltip';
import { Button } from 'react-bootstrap';
import { GoogleCalendar } from '../../components/GoogleCalendar.jsx';

export const GestionAgenda = () => {
	const { currentUser } = useAuth();
	const [data, setData] = useState([]);
	const admin = currentUser.admin;
	const coadmin = currentUser.coadmin;
	const [openViewModal, setopenViewModal] = useState(false);
	const [openEditModal, setopenEditModal] = useState(false);
	const [openGoogleModal, setopenGoogleModal] = useState(false);
	const [reloadTable, setReloadTable] = useState(false);
	const [rowId, setRowId] = useState(null);

	const handleOpenViewModal = (rowId) => {
		setopenViewModal(true);
		setRowId(rowId);
	};

	const handleOpenEditModal = (rowId) => {
		setopenEditModal(true);
		setRowId(rowId);
	};

	const handleGoogleModal = () => {
		setopenGoogleModal(true);
	};

	const handleCloseModal = () => {
		setopenViewModal(false);
		setopenEditModal(false);
		setopenGoogleModal(false);
		setReloadTable((prevState) => !prevState);
	};

	useEffect(() => {
		const loadTurnos = async () => {
			try {
				const turnos = await getTurnos();
				const fetchedTurnos = turnos.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				// Filtrar turnos pendientes (posteriores a la fecha actual)
				const turnosPendientes = fetchedTurnos.filter((turno) => {
					const fechaTurno = dayjs(turno.turno, 'DD-MM-YYYY HH:mm');
					const fechaActual = dayjs();
					return fechaTurno.isAfter(fechaActual);
				});

				// Filtrar turnos vencidos (anteriores a la fecha actual)
				// const turnosVencidos = fetchedTurnos.filter((turno) => {
				// 	const fechaTurno = dayjs(turno.turno, 'DD-MM-YYYY HH:mm');
				// 	const fechaActual = dayjs();
				// 	return (
				// 		fechaTurno.isBefore(fechaActual) ||
				// 		fechaTurno.isSame(fechaActual)
				// 	);
				// });
				setData(turnosPendientes);
			} catch (error) {
				console.error('Error al obtener turnos', error);
			}
		};
		loadTurnos();
	}, [reloadTable]);

	const columns = React.useMemo(
		() => [
			{
				header: 'Turno',
				accessorKey: 'turno',
				size: 50,
			},
			{
				header: 'Usuario',
				accessorKey: 'email',
				size: 50,
			},
			{
				header: 'Tipo',
				accessorKey: 'tipo',
				size: 50,
			},
			{
				header: 'Motivo',
				accessorKey: 'motivo',
				enableResizing: true,
				size: 250,
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver evento' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				handleOpenViewModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon: (admin || coadmin) ? (
				<Tooltip title='Editar evento' arrow>
					<EditIcon color='success' cursor='pointer' />
				</Tooltip>
			): null,
			onClick: (row) => {
				handleOpenEditModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Borrar evento' arrow>
					<DeleteIcon color='error' cursor='pointer'/>
				</Tooltip>
			): null,
			onClick: (row) => borrarTurno(row.original._id),
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	// funcion para eliminar turnos
	async function borrarTurno(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del turno',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				Swal.showLoading();

				await deleteTurno(id);

				Swal.fire({
					icon: 'success',
					title: 'El turno fue eliminado!',
					showConfirmButton: false,
					timer: 2500,
				});
				setData((prevData) => prevData.filter((turno) => turno._id !== id));
			}
		} catch (error) {
			console.error('Error al eliminar el turno:', error);
			Swal.fire('Error', 'Hubo un problema al eliminar el turno', 'error');
		}
	}

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-32'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo={'Agenda'} />
			</div>
			<hr className='linea text-white mx-3' />

			<div className='container-lg'>
				<div className='flex justify-around flex-wrap my-2'>
					<button
						type='button'
						onClick={() =>
							window.open(
								'https://calendar.google.com/calendar/embed?src=365fa9c4ffc2a2c85cd2d4c3e28942427e52a6a2a6d92386566dbe9ada6d50fe%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires'
							)
						}
						className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[310px] mb-3 border-primary rounded-xl font-semibold'>
						<i className='text-xl pe-2 bi bi-google'></i>Ver Agenda del
						Estudio
					</button>
					<Button
						onClick={handleGoogleModal}
						className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[310px] mb-3 border-primary rounded-xl font-semibold'>
						<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>Cargar
						vencimientos/audiencias
					</Button>
					<Link
						to='/Admin'
						className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[210px] mb-3 border-white rounded-xl font-semibold'>
						<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
						Volver al Panel
					</Link>
				</div>
				<hr className='linea mx-3' />

				<div>
					<p className='my-3 text-center text-3xl font-bold bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
						Turnos y Vencimientos Pendientes
					</p>
				</div>
				<div className='table-responsive'>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Table
							columns={columns}
							data={data}
							actions={actions}
							borrarTurno={borrarTurno}
							handleOpenViewModal={handleOpenViewModal}
						/>
					</ThemeProvider>
				</div>
			</div>
			{openViewModal && (
				<VerTurno
					rowId={rowId}
					showModal={openViewModal}
					onClose={handleCloseModal}
				/>
			)}
			{openEditModal && (
				<EditarTurnos
					rowId={rowId}
					showModal={openEditModal}
					onClose={handleCloseModal}
				/>
			)}
			{openGoogleModal && (
				<GoogleCalendar
					showModal={openGoogleModal}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
