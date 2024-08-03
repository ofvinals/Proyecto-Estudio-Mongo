/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth.js';
import { useTurnActions } from '../../hooks/UseTurns.js';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import useModal from '../../hooks/useModal';
import { Table } from '../../components/Gestion/Table';
import { TurnForm } from '../../components/Forms/TurnForm.jsx';
import { GoogleCalendar } from '../../components/GoogleCalendar.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import { Button } from 'react-bootstrap';
import '../../css/Header.css';
import Modals from '../../utils/Modals.jsx';
import Loader from '../../utils/Loader.jsx';
import { Link } from 'react-router-dom';
import { Detail } from '../../components/Gestion/Detail.jsx';

export const GestionAgenda = () => {
	const { loggedUser } = useAuth();
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;
	const { getTurns, deleteTurn } = useTurnActions();
	const turns = useSelector((state) => state.turns.turns);
	const statusTurn = useSelector((state) => state.turns.status);
	const statusUpdate = useSelector((state) => state.turns.statusUpdate);
	const statusSign = useSelector((state) => state.turns.statusSign);
	const viewModal = useModal();
	const editModal = useModal();
	const googleModal = useModal();

	const dataTurns = async () => {
		try {
			await getTurns();
		} catch (error) {
			console.error('Error al obtener usuarios:', error);
		}
	};

	useEffect(() => {
		dataTurns();
	}, [statusUpdate, statusSign]);

	const columns = React.useMemo(
		() => [
			{ header: 'Turno', accessorKey: 'turno', size: 50 },
			{ header: 'Usuario', accessorKey: 'email', size: 50 },
			{ header: 'Tipo', accessorKey: 'tipo', size: 50 },
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
			onClick: (row) => viewModal.openModal(row.original._id),
		},
		{
			text: 'Editar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Editar evento' arrow>
						<EditIcon color='success' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => editModal.openModal(row.original._id),
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Borrar evento' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) => deleteTurn(row.original._id),
		},
	];

	const darkTheme = createTheme({ palette: { mode: 'dark' } });

	return (
		<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo='Agenda' />
			</div>
			<div className='container-lg'>
				<div className='flex justify-around flex-wrap my-2'>
					<Button
						onClick={() => googleModal.openModal()}
						className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
						<i className='text-xl pe-2 bi bi-file-earmark-plus'></i>Cargar
						Nuevo Evento de Agenda
					</Button>
					<Link
						to={'/admin'}
						className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
						<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
						Volver al Panel
					</Link>
				</div>

				{statusTurn === 'Cargando' ? (
					<Loader />
				) : (
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Table columns={columns} data={turns} actions={actions} />
					</ThemeProvider>
				)}
			</div>

			<Modals
				isOpen={editModal.isOpen}
				onClose={editModal.closeModal}
				title='Editar Turno'>
				<TurnForm
					rowId={editModal.data}
					onClose={editModal.closeModal}
					mode='edit'
				/>
			</Modals>
			<Modals
				isOpen={viewModal.isOpen}
				onClose={viewModal.closeModal}
				title='Ver Turno'>
				<TurnForm
					rowId={viewModal.data}
					onClose={viewModal.closeModal}
					mode='view'
				/>
			</Modals>
			<Modals
				isOpen={googleModal.isOpen}
				onClose={googleModal.closeModal}
				title='Ingresar con Google'>
				<GoogleCalendar
					showModal={googleModal.isOpen}
					onClose={googleModal.closeModal}
				/>
			</Modals>
		</div>
	);
};
