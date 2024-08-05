/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useAuth } from '../../hooks/useAuth.js';
import { useTurnActions } from '../../hooks/UseTurns.js';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import '../../css/AgendaUsu.css';
dayjs.locale('es');
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Detail } from '../../components/gestion/Detail.jsx';
import { Header } from '../../components/header/Header.jsx';
import { Table } from '../../components/gestion/Table.jsx';
import Tooltip from '@mui/material/Tooltip';
import Loader from '../../utils/Loader.jsx';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const UserAgenda = () => {
	const { loggedUser } = useAuth();
	const { getTurns, createTurn, deleteTurn } = useTurnActions();
	const [startDate, setStartDate] = useState(dayjs());
	const [turnoOcupado, setTurnoOcupado] = useState([]);

	const user = loggedUser.email;
	const turns = useSelector((state) => state.turns.turns);
	const statusTurn = useSelector((state) => state.turns.status);
	const statusUpdate = useSelector((state) => state.turns.statusUpdate);
	const statusSign = useSelector((state) => state.turns.statusSign);
	const form = useRef();
	// deshabilita seleccion de dias de fin de semana
	// const lastMonday = dayjs().startOf('week');
	// const nextSunday = dayjs().endOf('week').startOf('day');
	const isWeekend = (date) => {
		const day = date.day();
		return day === 0 || day === 6;
	};
	// deshabilita seleccion de horario despues de las 18 hs y antes de las 9 hs
	const shouldDisableTime = (value, view) => {
		const isHourBefore9 = value.hour() < 9;
		const isHourAfter6 = value.hour() >= 19;

		return view === 'hours' && (isHourBefore9 || isHourAfter6);
	};

	const loadTurns = async () => {
		try {
			await getTurns();
		} catch (error) {
			console.error('Error al obtener turnos', error);
		}
	};

	useEffect(() => {
		loadTurns();
	}, [statusUpdate, statusSign]);

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
				header: 'Motivo',
				accessorKey: 'motivo',
				enableResizing: true,
				size: 300,
			},
		],
		[]
	);

	const actions = [
		{
			text: 'Eliminar',
			icon: (
				<Tooltip title='Borrar turno' arrow>
					<DeleteIcon color='error' cursor='pointer' />
				</Tooltip>
			),
			onClick: (row) => deleteTurn(row.original._id),
		},
	];

	// funcion para crear nuevo turno
	const handleCrearCita = async () => {
		// Convierte el turno seleccionado al formato
		const formatoTurnoSeleccionado =
			dayjs(startDate).format('DD/MM/YYYY HH:mm');
		// Comprueba si el turno seleccionado ya está ocupado
		const isTurnoOcupado = turnoOcupado.some(
			(turno) => turno.turno === formatoTurnoSeleccionado
		);
		if (isTurnoOcupado) {
			Swal.fire({
				icon: 'error',
				title: 'Turno no disponible',
				text: 'Lo siento, elige otro turno',
				confirmButtonColor: '#8f8e8b',
			});
			return;
		} else {
			// si no esta ocupado lanza modal para ingresar motivo de consulta y guarda en Localstorage
			const { value: motivoConsulta, isConfirmed } = await Swal.fire({
				input: 'textarea',
				title: 'Ingrese el motivo de su consulta',
				inputPlaceholder: 'Ingrese el motivo aca...',
				inputAttributes: {
					'aria-label': 'Ingrese su mensaje aca',
				},
				showCancelButton: true,
				confirmButtonColor: '#8f8e8b',
				confirmButtonText: 'Confirmar Turno',
				cancelButtonText: 'Cancelar',
			});
			if (isConfirmed) {
				const nuevoTurno = {
					turno: formatoTurnoSeleccionado,
					email: user,
					motivo: motivoConsulta,
				};
				try {
					// await emailjs.send(
					// 	'service_iew5q2g',
					// 	'template_fgl8bsq',
					// 	nuevoTurno,
					// 	'saMzvd5sdlHj2BhYr'
					// );
					createTurn(nuevoTurno);
				} catch (error) {
					console.error(
						'Error al enviar el formulario por EmailJS:',
						error
					);
				}
			} else {
				Swal.fire('Su turno no fue agendado', '', 'info');
			}
		}
		return;
	};

	return (
		<>
			<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pb-3 pt-24'>
				<Header />
				<div className='rounded-xl container-lg mb-1 '>
					<Detail modulo={'Turnos'} />
				</div>

				<hr className='linea text-white mx-3' />

				<div className='flex items-center justify-center'>
					<div>
						<h1 className='my-4 text-2xl font-extrabold text-center text-white'>
							Turnos Online
						</h1>
						<p className='my-4 text-sm text-center text-white'>
							(Horario de Atencion al Publico: Lunes a Jueves de 09 a
							19hs.)
						</p>
						<p className='my-4 text-xl font-medium text-center text-white'>
							Seleccioná el dia y hora de tu preferencia:
						</p>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								
							}}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale='es-mx'>
								<DemoContainer components={['NobileDateTimePicker']}>
									<DemoItem label=''>
										<MobileDateTimePicker
											defaultValue={dayjs()}
											formatDensity='dense'
											disablePast={true}
											ampm={false}
											shouldDisableTime={shouldDisableTime}
											inputFormat='DD/MM/YYYY HH:mm'
											shouldDisableDate={isWeekend}
											selected={startDate}
											onChange={(date) => setStartDate(date)}
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
													sx: { width: '100%', maxWidth: '300px' },
													focused: true,
													size: 'medium',
												}),
											}}
											disableHighlightToday={true}
										/>
									</DemoItem>
								</DemoContainer>
							</LocalizationProvider>
						</Box>
						<div className='flex flex-row justify-around py-3 mt-2'>
							<Button
								className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[200px] mb-3 border-primary rounded-xl font-semibold'
								ref={form}
								onClick={handleCrearCita}>
								<i className='text-xl pe-2 bi bi-calendar-check'></i>
								Verificar Turno
							</Button>
							<Link
								to='/AdminUsu'
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[180px] mb-3 border-white rounded-xl font-semibold'>
								<i className='text-xl pe-2 bi bi-box-arrow-left'></i>
								Volver al Panel
							</Link>
						</div>
						<hr className='linea text-white mx-3' />

						<h2 className='my-4 text-2xl font-extrabold text-center text-white'>
							Su/s turno/s registrado/s
						</h2>
						{statusTurn === 'Cargando' ? (
							<Loader />
						) : (
							<div className='table-responsive'>
			
									<Table
										columns={columns}
										data={turns}
										actions={actions}
									/>
				
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};
