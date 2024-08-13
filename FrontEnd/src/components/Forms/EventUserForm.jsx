/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import {
	FormInput,
	SaveButton,
	CancelButton,
	// FormSelect,
} from '../../utils/Form.jsx';
import '../../css/Header.css';
import { useEventActions } from '../../hooks/UseEvents.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import {
	selectEvent,
	selectEventStatus,
} from '../../store/events/selectors.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useMails } from '../../hooks/useMails.js';

export const EventUserForm = ({ rowId, onClose, mode, startDate, end }) => {
	const { loggedUser } = useAuth();
	// const [isVirtual, setIsVirtual] = useState('Virtual');
	const {
		register,
		handleSubmit,
		setValue,
		// watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			user: loggedUser.email,
			isVirtual: 'Virtual',
			start: startDate,
		},
	});

	const { getEvent, updateEvent, createGoogleEvent } = useEventActions();
	const { sendMailEvent } = useMails();
	const statusEvent = useSelector(selectEventStatus);
	const event = useSelector(selectEvent);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getEvent(rowId);
		}
	}, [rowId]);

	useEffect(() => {
		if (event && (mode === 'edit' || mode === 'view')) {
			setValue('start', event.start);
			setValue('user', event.user);
			setValue('summary', event.summary);
			setValue('description', event.description);
			// setIsVirtual(event.isVirtual === 'true' ? 'Virtual' : 'Presencial'); // Actualizar el estado
		}
	}, [statusEvent]);

	// const handleSelectChange = (e) => {
	// 	const value = e.target.value;
	// 	setIsVirtual(value); // Actualiza el estado basado en la selección
	// };

	// const isVirtualSelected = watch('isVirtual', 'Virtual'); // Obtener valor actual del select

	const onSubmit = handleSubmit(async (values) => {
		try {
			const formattedValues = {
				summary: values.summary || 'Evento Cliente',
				description: values.description || 'Motivo no especificado',
				start: {
					dateTime: startDate.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				end: {
					dateTime: end.toISOString(),
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				},
				user: loggedUser.email,
				// isVirtual: values.isVirtual === 'Virtual' ? 'true' : 'false', // Convertir a string
			};

			if (mode === 'edit') {
				await updateEvent({ rowId, values: formattedValues });
			} else if (mode === 'create') {
				await createGoogleEvent(formattedValues);
				await sendMailEvent(formattedValues);
			}
			onClose();
		} catch (error) {
			console.error('Error al guardar el evento:', error);
		}
	});

	if (statusEvent === 'Cargando') {
		return <Loader />;
	}

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				className='flex flex-wrap justify-around items-center'>
				<FormInput
					label='Email'
					name='user'
					type='text'
					register={register}
					mode={mode}
					errors={errors}
					readOnly
					options={{
						required: {
							value: true,
							message: 'El email es obligatorio',
						},
					}}
				/>

				<FormInput
					label='Fecha'
					name='start'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'La fecha es obligatoria',
						},
					}}
					readOnly={mode === 'view'}
				/>

				{/* <FormSelect
					label='Tipo de turno'
					name='isVirtual'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El tipo de turno es obligatorio',
						},
					}}
					selectOptions={[
						{ value: 'Virtual', label: 'Virtual' },
						{ value: 'Presencial', label: 'Presencial' },
					]}
					readOnly={mode === 'view'}
					onChange={handleSelectChange}
				/>
				{isVirtualSelected === 'Virtual' ? (
					<Form.Text className='text-muted text-center mt-2 mx-2'>
						El enlace para la reunión virtual será enviado por correo
						electrónico, una vez que confirme el turno.
					</Form.Text>
				) : (
					<Form.Text className='text-muted text-center mt-2'>
						La reunion se realizará en 9 de Julio Nº 620 Planta Baja C.
					</Form.Text>
				)} */}

				<FormInput
					label='Motivo'
					name='description'
					type='textarea'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El motivo es obligatorio',
						},
					}}
					readOnly={mode === 'view'}
					rows={7}
					cols={70}
				/>

				<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
					{mode !== 'view' && (
						<SaveButton
							onSubmit={onSubmit}
							label={
								mode === 'create'
									? 'Registrar Turno'
									: 'Guardar Cambios'
							}
						/>
					)}
					<CancelButton
						onClose={onClose}
						label={mode === 'view' ? 'Volver' : 'Cancelar'}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};
