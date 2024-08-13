/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth.js';
import { useEventActions } from '../../hooks/UseEvents.js';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import useModal from '../../hooks/useModal';
import { Table } from '../../components/Gestion/Table';
import { EventForm } from '../../components/Forms/EventForm.jsx';
import { GoogleCalendarForm } from '../../components/Forms/GoogleCalendarForm.jsx';
import Tooltip from '@mui/material/Tooltip';
import { Button } from 'react-bootstrap';
import '../../css/Header.css';
import Modals from '../../utils/Modals.jsx';
import Loader from '../../utils/Loader.jsx';
import { Link } from 'react-router-dom';
import { Detail } from '../../components/Gestion/Detail.jsx';
import { Header } from '../../components/header/Header.jsx';
import { CalendarSCta } from '../../components/Forms/CalendarSCtaForm.jsx';
import {
	selectEvents,
	selectEventStatus,
} from '../../store/events/selectors.js';
export const GestionAgenda = () => {
	const { loggedUser } = useAuth();
	const { getEvents, deleteEvent } = useEventActions();
	const [rowId, setRowId] = useState(null);
	const admin = loggedUser.admin;
	const coadmin = loggedUser.coadmin;
	const events = useSelector(selectEvents);
	const statusEvent = useSelector(selectEventStatus);
	const viewModal = useModal();
	const editModal = useModal();
	const googleModal = useModal();
	const googleSctaModal = useModal();

	const dataEvents = async () => {
		try {
			await getEvents();
		} catch (error) {
			console.error('Error al obtener usuarios:', error);
		}
	};

	useEffect(() => {
		dataEvents();
	}, []);

	const columns = React.useMemo(() => [
		{
			header: 'Evento',
			accessorKey: 'start',
			size: 50,
		},
		{ header: 'Usuario', accessorKey: 'user', size: 50 },
		{ header: 'Tipo', accessorKey: 'summary', size: 50 },
		{
			header: 'Motivo',
			accessorKey: 'description',
			enableResizing: true,
			size: 250,
		},
	]);

	const actions = [
		{
			text: 'Ver',
			icon: (
				<Tooltip title='Ver evento' arrow>
					<VisibilityIcon color='primary' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => {
				setRowId(row.original._id);
				viewModal.openModal(row.original._id);
			},
		},
		{
			text: 'Editar',
			icon:
				admin || coadmin ? (
					<Tooltip title='Editar evento' arrow>
						<EditIcon color='success' cursor='pointer' />
					</Tooltip>
				) : null,
			onClick: (row) => {
				setRowId(row.original._id);
				editModal.openModal(row.original._id);
			},
		},
		{
			text: 'Eliminar',
			icon: admin ? (
				<Tooltip title='Borrar evento' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			) : null,
			onClick: (row) =>
				deleteEvent({
					eventId: row.original.eventId,
					id: row.original._id,
				}),
		},
	];

	return (
		<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
			<Header />
			<div className=' rounded-xl container-lg mb-1 '>
				<Detail modulo='Agenda' />
			</div>
			<div className='container-lg'>
				<div className='flex justify-around flex-wrap my-2'>
					<Button
						type='button'
						onClick={() =>
							window.open(
								'https://calendar.google.com/calendar/embed?src=365fa9c4ffc2a2c85cd2d4c3e28942427e52a6a2a6d92386566dbe9ada6d50fe%40group.calendar.google.com&ctz=America%2FArgentina%2FBuenos_Aires'
							)
						}
						className='bg-background shadow-3xl text-neutral-200 text-center flex items-center justify-center p-2 border-2 w-[210px] mb-3 border-neutral-200 rounded-xl font-semibold hover:text-background hover:bg-neutral-200 hover:border-background'>
						<img
							className='w-6 h-6 mr-3'
							src='https://www.svgrepo.com/show/475656/google-color.svg'
							alt='google logo'
						/>
						Ver Agenda del Estudio
					</Button>
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

				{statusEvent === 'Cargando' ? (
					<Loader />
				) : (
					<Table columns={columns} data={events} actions={actions} />
				)}
			</div>

			<Modals
				isOpen={editModal.isOpen}
				onClose={editModal.closeModal}
				title='Editar Evento de Agenda'>
				<EventForm
					rowId={rowId}
					onClose={editModal.closeModal}
					mode='edit'
				/>
			</Modals>
			<Modals
				isOpen={viewModal.isOpen}
				onClose={viewModal.closeModal}
				title='Ver Evento de Agenda'>
				<EventForm
					rowId={rowId}
					onClose={viewModal.closeModal}
					mode='view'
				/>
			</Modals>
			<Modals
				isOpen={googleModal.isOpen}
				onClose={googleModal.closeModal}
				title='Registrar Nuevo Evento de Agenda'>
				<GoogleCalendarForm
					showModal={googleModal.isOpen}
					onClose={googleModal.closeModal}
				/>
			</Modals>
			<Modals
				isOpen={googleSctaModal.isOpen}
				onClose={googleSctaModal.closeModal}
				title='Calendar Google S/Cta'>
				<CalendarSCta
					showModal={googleSctaModal.isOpen}
					onClose={googleSctaModal.closeModal}
				/>
			</Modals>
		</section>
	);
};
