/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
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
			await updateTurn({rowId, data});
			onClose();
		} catch (error) {
			console.error('Error al editar el turno:', error);
		}
	});

	if (statusTurn === 'Cargando') {
		return <Loader />;
	}

	return (
		<>
			<div>
				<Form
					onSubmit={onSubmit}
					className='flex flex-wrap justify-around items-center'>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='cliente'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Cliente
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							{...register('email')}
							readOnly
						/>
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='turno'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Turno
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							{...register('turno', {
								required: {
									value: true,
									message: 'El Turno es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>{' '}
						{errors.turno && (
							<span className='error-message'>
								{errors.turno.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-full mx-2'
						id='motivo'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Motivo
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							as='textarea'
							rows={7}
							cols={70}
							{...register('motivo', {
								required: {
									value: true,
									message: 'El motivo es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>{' '}
						{errors.motivo && (
							<span className='error-message'>
								{errors.motivo.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								type='submit'>
								<i className='text-xl pe-2 bi bi-check2-square'></i>
								{mode === 'create'
									? 'Registrar Turno'
									: 'Guardar Cambios'}
							</Button>
						)}
						<Button
							type='button'
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
							onClick={onClose}>
							<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
							{mode === 'view' ? 'Volver' : 'Cancelar'}
						</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	);
};
