/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { getTurno, updateTurno } from '../../../hooks/UseTurns.js';

export const EditarTurnos = ({ rowId, showModal, onClose }) => {
	const id = rowId;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		async function loadTurno() {
			try {
				const turnoData = await getTurno(id);
				setValue('turno', turnoData.turno);
				setValue('email', turnoData.email);
				setValue('motivo', turnoData.motivo);
			} catch (error) {
				console.error('Error al cargar el turno', error);
				Swal.fire({
					icon: 'error',
					title: 'Error al editar el turno. Intente nuevamente!',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
		loadTurno();
	}, [id]);

	const onSubmit = handleSubmit(async (data) => {
		try {
			await updateTurno(id, data);
			Swal.fire({
				icon: 'success',
				title: 'Turno editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error('Error al editar el turno:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el turno. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	return (
		<>
			<div>
				<Modal show={showModal} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title className='text-background font-bold'>
							Modificar Turno
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							onSubmit={onSubmit}
							className='flex flex-wrap justify-around items-center'>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='turnoEditarTurno'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Cliente
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('email')}
									readOnly
								/>
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='turnoEditarTurno'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Turno
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('turno', {
										required: {
											value: true,
											message: 'El Turno es requerido',
										},
									})}
								/>{' '}
								{errors.turno && (
									<span className='text-warning fs-6'>
										{errors.turno.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='motivoEditarTurno'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Motivo
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									as='textarea'
									rows={7}
									cols={70}
									{...register('motivo', {
										required: {
											value: true,
											message: 'El motivo es requerido',
										},
									})}
								/>{' '}
								{errors.motivo && (
									<span className='text-warning fs-6'>
										{errors.motivo.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around'>
								<Button
									className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
									type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar cambios
								</Button>
								<Button
									type='button'
									className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
									onClick={onClose}>
									<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
									Cancelar
								</Button>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};
