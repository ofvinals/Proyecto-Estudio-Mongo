/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
dayjs.locale('es');
import { Button, Modal } from 'react-bootstrap';
import { useTurnActions } from '../hooks/UseTurns.js';

export const GoogleCalendar = ({ showModal, onClose }) => {
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [eventName, setEventName] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const { loginGoogle } = useAuth();
	const googleToken = localStorage.getItem('googleToken');
	const { createTurn } = useTurnActions();

	const handleGoogle = async (e) => {
		try {
			e.preventDefault();
			await loginGoogle();
		} catch (error) {
			console.error('Error al iniciar sesión con Google:', error);
		}
	};

	const createEvent = async function createCalendarEvent() {
		try {
			const event = {
				summary: eventName,
				description: eventDescription,
				start: {
					dateTime: start.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				end: {
					dateTime: end.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
			};
			await fetch(
				'https://www.googleapis.com/calendar/v3/calendars/365fa9c4ffc2a2c85cd2d4c3e28942427e52a6a2a6d92386566dbe9ada6d50fe@group.calendar.google.com/events',
				{
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + googleToken,
					},
					body: JSON.stringify(event),
				}
			)
				.then((data) => data.json())
				.then(() => {
					console.log('Evento creado, revisa tu Google Calendar');
				});
		} catch (error) {
			console.error('Error al crear evento de calendario:', error);
		}
	};

	const handleCrearVenc = async () => {
		const formatoTurnoSeleccionado = dayjs(start).format('DD/MM/YYYY HH:mm');
		const nuevoTurno = {
			turno: formatoTurnoSeleccionado,
			tipo: eventName,
			motivo: eventDescription,
		};
		try {
			await createTurn(nuevoTurno);
			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal show={showModal} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title className='text-background font-bold'>
					Cargar Vencimientos / Audiencias
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='flex flex-col flex-wrap justify-around items-start'>
				{googleToken ? (
					<>
						<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Fecha del Evento
						</p>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale='es-mx'>
							<DemoContainer components={['NobileDateTimePicker']}>
								<DemoItem label=''>
									<MobileDateTimePicker
										defaultValue={dayjs()}
										formatDensity='spacious'
										disablePast={true}
										ampm={false}
										inputFormat='DD/MM/YYYY HH:mm'
										selected={start}
										onChange={(startDate) => {
											setStart(startDate);
											const newEndDate = dayjs(startDate).add(
												1,
												'hour'
											);
											setEnd(() => {
												return newEndDate.toDate();
											});
										}}
										minutesStep={30}
										views={[
											'year',
											'month',
											'day',
											'hours',
											'minutes',
										]}
										slotProps={{
											textField: () => ({
												color: 'success',
												focused: true,
												size: 'medium',
											}),
										}}
										disableHighlightToday={false}
									/>
								</DemoItem>
							</DemoContainer>
						</LocalizationProvider>

						<div className='flex flex-wrap justify-around items-center'>
							<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								{' '}
								Tipo de evento
							</p>
							<select
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
								aria-label='Default select'
								onChange={(e) => setEventName(e.target.value)}>
								<option>Selecciona..</option>
								<option value='AUDIENCIA'>AUDIENCIA</option>
								<option value='VENCIMIENTO'>VENCIMIENTO</option>
							</select>
						</div>

						<div className='flex flex-wrap justify-around items-center'>
							<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Descripcion
							</p>
							<textarea
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
								rows='5'
								cols='33'
								onChange={(e) => setEventDescription(e.target.value)}
							/>
						</div>

						<div className='flex flex-wrap items-center w-full justify-around'>
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								onClick={async () => {
									try {
										await Promise.all([
											handleCrearVenc(),
											createEvent(),
										]);
									} catch (error) {
										console.error('Error al crear evento:', error);
									}
								}}>
								<i className='text-xl pe-2 bi bi-check2-square'></i>
								Crear Evento
							</Button>
							<Button
								onClick={onClose}
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
								Cancelar
							</Button>
						</div>
					</>
				) : (
					<>
						<p className='text-center text-primary'>
							Para cargar eventos en el calendario del Estudio debes
							estar logueado con una cuenta de Google
						</p>

						<div className='flex flex-wrap items-center w-full justify-around'>
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								onClick={(e) => handleGoogle(e)}>
								<i className='text-xl pe-2 bi bi-google'></i>
								Ingresa con Google
							</Button>
							<Button
								type='button'
								onClick={onClose}
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
								Cancelar
							</Button>
						</div>
					</>
				)}
			</Modal.Body>
		</Modal>
	);
};
