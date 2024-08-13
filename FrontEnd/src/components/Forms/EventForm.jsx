/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { FormInput, SaveButton, CancelButton, FormSelect } from '../../utils/Form.jsx';
import '../../css/Header.css';
import { useEventActions } from '../../hooks/UseEvents.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import {
	selectEvent,
	selectEventStatus,
} from '../../store/events/selectors.js';

export const EventForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getEvent, updateEvent } = useEventActions();
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
		}
	}, [statusEvent, event]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			if (mode === 'edit') {
				await updateEvent({ rowId, values });
				onClose();
			}
		} catch (error) {
			console.error('Error al editar el evento:', error);
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
					label='Cliente'
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
							message: 'El Evento es obligatorio',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<FormSelect
					label='Tipo de evento'
					name='summary'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El Evento es obligatorio',
						},
					}}
					selectOptions={[
						{ value: 'Audiencia', label: 'Audiencia' },
						{ value: 'Vencimiento', label: 'Vencimiento' },
						{ value: 'Turno Cliente', label: 'Turno Cliente' },
					]}
					readOnly={mode === 'view'}
				/>

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
									? 'Registrar Evento'
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
