/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useState } from 'react';

export const CalendarSCta = ({ onClose }) => {
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [eventName, setEventName] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	
   const handleCrearVenc = async () => {
		const formatoTurnoSeleccionado = dayjs(start).format('DD/MM/YYYY HH:mm');
		const nuevoTurno = {
			summary: eventName,
			description: eventDescription,
			start: start.toISOString(),
			end: end.toISOString(),
		};

		try {
			await fetch('http://localhost:4000/create-event', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(nuevoTurno),
			});

			console.log('Evento enviado al backend');
			onClose();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<p className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
				Fecha del Evento
			</p>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es-mx'>
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
								const newEndDate = dayjs(startDate).add(1, 'hour');
								setEnd(() => {
									return newEndDate.toDate();
								});
							}}
							minutesStep={30}
							views={['year', 'month', 'day', 'hours', 'minutes']}
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
							await Promise.all([handleCrearVenc(), createEvent()]);
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
	);
};
