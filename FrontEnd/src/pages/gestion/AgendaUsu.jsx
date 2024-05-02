/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useAuth } from '../../context/AuthContext.jsx';
import { getTurnos, createTurno, deleteTurno } from '../../hooks/UseTurns.js';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
import '../../css/Header.css';
dayjs.locale('es');
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import emailjs from '@emailjs/browser';
import { Detail } from '../../components/Gestion/Detail';
import { Header } from '../../components/Header.jsx';
import { Table } from '../../components/Gestion/Table';
import Tooltip from '@mui/material/Tooltip';

export const AgendaUsu = () => {
	const { currentUser } = useAuth();
	const form = useRef();
	const [data, setData] = useState();
	const [startDate, setStartDate] = useState(dayjs());
	const [turnoOcupado, setTurnoOcupado] = useState([]);
	const user = currentUser.email;
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

	useEffect(() => {
		const loadTurnos = async () => {
			try {
				const fetchedTurnos = await getTurnos();
				setData(fetchedTurnos);
			} catch (error) {
				console.error('Error al obtener turnos', error);
			}
		};
		loadTurnos();
	}, []);

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
			onClick: (row) => borrarTurno(row.original._id),
		},
	];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

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

					createTurno(nuevoTurno);

					await Swal.fire({
						icon: 'success',
						title: 'Su turno fue registrado!',
						showConfirmButton: false,
						timer: 2500,
					});
					window.location.reload();
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

	// funcion para borrar turnos
	async function borrarTurno(id) {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del turno?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				await deleteTurno(id);
				Swal.fire(
					'Eliminado',
					'El turno fue eliminado con exito',
					'success'
				);
				window.location.reload();
			}
			setTurnoOcupado((prevData) =>
				prevData.filter((turno) => turno.id !== id)
			);
		} catch (error) {
			console.error('Error al eliminar el turno:', error);
			Swal.fire({
				icon: 'error',
				title: 'Hubo un error al eliminar su turno!',
				showConfirmButton: false,
				timer: 2500,
			});
		}
	}

	return (
		<>
			<div className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] py-3'>
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
						<div className='flex flex-row justify-around py-3'>
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
						<div className='table-responsive'>
							<ThemeProvider theme={darkTheme}>
								<CssBaseline />
								<Table
									columns={columns}
									data={data}
									actions={actions}
									borrarTurno={borrarTurno}
								/>
							</ThemeProvider>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
