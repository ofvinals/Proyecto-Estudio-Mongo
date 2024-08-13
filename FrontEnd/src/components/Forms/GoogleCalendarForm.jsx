/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { useEventActions } from '../../hooks/UseEvents.js';
import { useForm } from 'react-hook-form';
import {
	FormInput,
	FormSelect,
	SaveButton,
	CancelButton,
} from '../../utils/Form.jsx';

dayjs.locale('es');

export const GoogleCalendarForm = ({ onClose }) => {
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const { loggedUser } = useAuth();
	const { createGoogleEvent } = useEventActions();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createEventCalendar = (data) => {
		try {
			const values = {
				summary: data.summary,
				description: data.description,
				start: {
					dateTime: start.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				end: {
					dateTime: end.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				user: loggedUser.email,
			};
			createGoogleEvent(values);
			onClose();
		} catch (error) {
			console.error('Error al crear evento de calendario:', error);
		}
	};

	return (
		<form
			className='flex flex-col flex-wrap justify-around items-start'
			onSubmit={handleSubmit(createEventCalendar)}>
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
									sx: { width: '100%', maxWidth: '300px' },
									focused: true,
									size: 'medium',
								}),
							}}
							disableHighlightToday={false}
						/>
					</DemoItem>
				</DemoContainer>
			</LocalizationProvider>

			<FormSelect
				label='Tipo de evento'
				name='summary'
				register={register}
				errors={errors}
				selectOptions={[
					{ value: 'Audiencia', label: 'Audiencia' },
					{ value: 'Vencimiento', label: 'Vencimiento' },
					{ value: 'Turno Cliente', label: 'Turno Cliente' },
				]}
				options={{ required: 'El tipo de evento es obligatorio' }}
			/>

			<FormInput
				label='Detalle del Evento'
				name='description'
				type='textarea'
				register={register}
				errors={errors}
				options={{ required: 'La descripcion del evento es obligatoria' }}
			/>

			<div className='flex flex-wrap items-center w-full justify-around'>
				<SaveButton label='Crear Evento' />
				<CancelButton label='Cancelar' onClose={onClose} />
			</div>
		</form>
	);
};
