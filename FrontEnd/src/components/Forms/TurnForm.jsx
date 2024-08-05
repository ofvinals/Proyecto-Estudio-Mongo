/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormInput, SaveButton, CancelButton } from '../../utils/Form.jsx';
import '../../css/Header.css';
import { useTurnActions } from '../../hooks/UseTurns.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

export const TurnForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getTurn, updateTurn } = useTurnActions();
	const turn = useSelector((state) => state.turns.turn);
	const statusTurn = useSelector((state) => state.turns.statusTurn);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getTurn(rowId);
		}
	}, []);

	useEffect(() => {
		if (
			statusTurn === 'Exitoso' &&
			turn &&
			(mode === 'edit' || mode === 'view')
		) {
			setValue('turno', turn.turno);
			setValue('email', turn.email);
			setValue('motivo', turn.motivo);
		}
	}, [statusTurn, turn]);

	const onSubmit = handleSubmit(async (data) => {
		try {
			await updateTurn({ rowId, data });
			onClose();
		} catch (error) {
			console.error('Error al editar el turno:', error);
		}
	});

	if (statusTurn === 'Cargando') {
		return <Loader />;
	}

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				className='flex flex-wrap justify-around items-center'>
				<FormInput
					label='Cliente'
					name='email'
					type='text'
					register={register}
					mode={mode}
					readOnly
					options={{
						required: {
							value: true,
							message: 'El email es requerido',
						},
					}}
				/>

				<FormInput
					label='Turno'
					name='turno'
					type='text'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El Turno es requerido',
						},
					}}
					readOnly={mode === 'view'}
				/>

				<FormInput
					label='Motivo'
					name='motivo'
					type='textarea'
					register={register}
					errors={errors}
					mode={mode}
					options={{
						required: {
							value: true,
							message: 'El motivo es requerido',
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
