/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getExpte, updateMov } from '../../../hooks/UseExptes';
import { uploadFile } from '../../../firebase/config.js';

export const EditarMov = ({ rowId, expteId, showModal, onClose }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// navigate(`/gestionmovimientos/${rowId}`, { replace: true });

	useEffect(() => {
		async function loadMov() {
			try {
				const expte = await getExpte(expteId);
				const selectedMovimiento = expte.movimientos.find(
					(mov) => mov._id === rowId
				);
				const fechaParts = selectedMovimiento.fecha.split('/');
				const day = parseInt(fechaParts[0], 10);
				const month = parseInt(fechaParts[1], 10) - 1;
				const year = parseInt(fechaParts[2], 10);
				const fecha = new Date(year, month, day);
				const formattedDate = fecha.toISOString().substr(0, 10);
				setValue('fecha', formattedDate);
				setValue('descripcion', selectedMovimiento.descripcion);
				setValue('adjunto', selectedMovimiento.adjunto);
			} catch (error) {
				console.error('Error al obtener movimientos del expediente', error);
			}
		}
		loadMov();
	}, []);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const selectedDate = new Date(values.fecha + 'T00:00:00');
			const formattedDate = selectedDate.toLocaleDateString('es-AR', {
				timeZone: 'America/Argentina/Buenos_Aires',
			});
			let fileDownloadUrl = null;
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const movData = {
				// id: uuidv4(),
				fecha: formattedDate,
				descripcion: values.descripcion,
				fileUrl: fileDownloadUrl,
			};
			await updateMov(expteId, rowId, movData );
			Swal.fire({
				icon: 'success',
				title: 'Movimiento editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error('Error al editar el movimiento:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el movimiento. Intente nuevamente!',
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
							Editar Movimiento de Expediente
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							className='flex flex-wrap justify-around items-center'
							onSubmit={onSubmit}>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around w-6/12 mx-2 mt-2'
								controlId='inputcaratula'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Fecha
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='date'
									{...register('fecha', {
										required: {
											value: true,
											message: 'La fecha es requerida',
										},
									})}
								/>
								{errors.fecha && (
									<span className='text-warning fs-6'>
										{errors.fecha.message}
									</span>
								)}
							</Form.Group>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around w-full mx-2 mt-2'
								controlId='inputcaratula'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Descripcion
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									as='textarea'
									rows={7}
									cols={70}
									{...register('descripcion', {
										required: {
											value: true,
											message: 'La descripcion es requerida',
										},
									})}
								/>{' '}
								{errors.descripcion && (
									<span className='text-warning fs-6'>
										{errors.descripcion.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around w-full mx-2 mt-2'
								id=''>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Archivo Adjunto
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='file'
									{...register('fileUrl')}
								/>
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
								<Button
									className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
									type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar Cambios
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
