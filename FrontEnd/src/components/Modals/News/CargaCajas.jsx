/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { createCaja } from '../../../hooks/UseCajas.js';
import { uploadFile } from '../../../firebase/config.js';
import Swal from 'sweetalert2';
import '../../../css/Header.css';
import { useForm } from 'react-hook-form';

export const CargaCajas = ({ showModal, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit(async (values) => {
		try {
			let fileDownloadUrl = null;
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const selectedDate = new Date(values.fecha + 'T00:00:00');
			const formattedDate = selectedDate.toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
			const cajaData = {
				fecha: formattedDate,
				mes: selectedDate.getMonth() + 1,
				concepto: values.concepto,
				tipo: values.tipo,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};

			await createCaja(cajaData);

			Swal.fire({
				icon: 'success',
				title: 'Caja registrada correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error al registrar la caja. Intente de nuevo',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	return (
		<>
			<div className=''>
				<Modal show={showModal} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title className='text-background font-bold'>
							Cargar Movimiento de Caja
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							className='flex flex-wrap justify-around items-center'
							onSubmit={onSubmit}
							method='post'
							encType='multipart/form-data'>
							<Form.Group id='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Fecha</Form.Label>
								<Form.Control
									type='date'
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('fecha', {
										required: {
											value: true,
											message: 'La fecha del gasto es requerida',
										},
									})}
								/>
								{errors.fecha && (
									<span className='text-warning fs-6'>
										{errors.fecha.message}
									</span>
								)}{' '}
							</Form.Group>

							<Form.Group id='inputconcepto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Concepto</Form.Label>
								<Form.Control
									type='text'
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('concepto', {
										required: {
											value: true,
											message: 'El concepto del gasto es requerido',
										},
									})}></Form.Control>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}{' '}
							</Form.Group>

							<Form.Group id='inputtipo'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-mediuma'>Tipo</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('tipo', {
										required: {
											value: true,
											message: 'El tipo de caja es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='INGRESO'>INGRESO</option>
									<option value='EGRESO'>EGRESO</option>
								</select>
								{errors.tipo && (
									<span className='text-warning fs-6'>
										{errors.tipo.message}
									</span>
								)}{' '}
							</Form.Group>

							<Form.Group id='inputmonto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Monto</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='number'
									{...register('monto', {
										required: {
											value: true,
											message: 'El monto de la caja es requerido',
										},
									})}
								/>
								{errors.monto && (
									<span className='text-warning fs-6'>
										{errors.monto.message}
									</span>
								)}{' '}
							</Form.Group>

							<Form.Group id='inputcel'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Comprobante de caja
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='file'
									{...register('file')}
								/>
							</Form.Group>

							<Form.Group id='inputsubname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>Estado</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('estado', {
										required: {
											value: true,
											message: 'El estado la caja es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='Pendiente'>Pendiente</option>
									<option value='Pagado'>Pagado</option>
									<option value='Cobrado'>Cobrado</option>
									<option value='Cancelado'>Cancelado</option>
								</select>
								{errors.estado && (
									<span className='text-warning fs-6'>
										{errors.estado.message}
									</span>
								)}{' '}
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around' id='inputpassword'>
								<Button className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold' type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar Movimiento
								</Button>
								<Link
									to='/gestioncaja'
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
