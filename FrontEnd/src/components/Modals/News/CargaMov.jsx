/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '../../../firebase/config.js';
import { createMov } from '../../../hooks/UseExptes';

export const CargaMov = ({ showModal, onClose, expteId }) => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (values) => {
		try {
			let fileDownloadUrl = null;
			const selectedDate = new Date(values.fecha + 'T00:00:00');
			const formattedDate = selectedDate.toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const movData = {
				id: uuidv4(),
				fecha: formattedDate,
				descripcion: values.descripcion,
				fileUrl: fileDownloadUrl,
			};
			await createMov(movData, expteId);
			Swal.fire({
				icon: 'success',
				title: 'Movimiento registrado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			navigate(`/gestionmovimientos/${expteId}`)
			onClose();
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			<div className=''>
				<Modal show={showModal} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title className='text-background font-bold'>Cargar Nuevo Movimiento</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							className='flex flex-wrap justify-around items-center'
							onSubmit={onSubmit}
							action='/uploads'
							method='post'
							encType='multipart/form-data'>
							<Form.Group
								className='formcargagroup'
								controlId='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Fecha</Form.Label>
								<Form.Control
									type='date'
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
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
								className='formcargagroup'
								controlId='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Descripcion
								</Form.Label>
								<Form.Control
									placeholder='Ingrese la descripcion del movimiento..'
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
								/>
								{errors.descripcion && (
									<span className='text-warning fs-6'>
										{errors.descripcion.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='formcargagroup'
								controlId='inputsubname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Adjunto</Form.Label>
								<Form.Control
									type='file'
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('file')}></Form.Control>
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around'>
							<Button className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold' type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Agregar Movimiento
								</Button>
								<Link
									to={`/gestionmovimientos/${expteId}`}
									onClick={onClose}
									className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'>
									<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
									Cancelar
								</Link>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};
