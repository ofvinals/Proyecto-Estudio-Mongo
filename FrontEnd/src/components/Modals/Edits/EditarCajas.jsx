/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { uploadFile } from '../../../firebase/config.js';
import { getCaja, updateCaja } from '../../../hooks/UseCajas.js';

export const EditarCajas = ({ rowId, showModal, onClose }) => {
	const id = rowId;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Función para cargar los datos de cajas al abrir la página
	useEffect(() => {
		async function loadCaja() {
			try {
				const cajaData = await getCaja(id);
				const fechaParts = cajaData.fecha.split('/');
				const year = fechaParts[2];
				const month = fechaParts[1].padStart(2, '0');
				const day = fechaParts[0].padStart(2, '0');
				const fechaFormateada = `${year}-${month}-${day}`;
				setValue('fecha', fechaFormateada);
				setValue('concepto', cajaData.concepto);
				setValue('tipo', cajaData.tipo);
				setValue('monto', cajaData.monto);
				setValue('adjunto', cajaData.file);
				setValue('estado', cajaData.estado);
			} catch (error) {
				console.error('Error al cargar el caja', error);
			}
		}
		loadCaja();
	}, [id]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			let fileDownloadUrl = null;
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const selectedDate = new Date(values.fecha + 'T00:00:00');
			const formattedDate = selectedDate.toLocaleDateString('es-AR', {
				timeZone: 'America/Argentina/Buenos_Aires',
			});
			const cajaData = {
				fecha: formattedDate,
				mes: selectedDate.getMonth() + 1,
				concepto: values.concepto,
				tipo: values.tipo,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};
			await updateCaja(id, cajaData);
			Swal.fire({
				icon: 'success',
				title: 'Caja editada correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar la caja. Intente nuevamente!',
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
							Modificar Movimiento de Caja
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							className='flex flex-wrap justify-around items-center'
							onSubmit={onSubmit}>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Fecha
								</Form.Label>
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
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='inputconcepto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Concepto
								</Form.Label>
								<Form.Control
									type='text'
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('concepto', {
										required: {
											value: true,
											message: 'El concepto es requerido',
										},
									})}></Form.Control>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='inputtipo'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Tipo
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('tipo', {
										required: {
											value: true,
											message: 'El tipo es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='INGRESO'>INGRESO</option>
									<option value='EGRESO'>EGRESO</option>
								</select>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='inputmonto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Monto
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='number'
									{...register('monto', {
										required: {
											value: true,
											message: 'El monto del gasto es requerido',
										},
									})}
								/>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='inputcel'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Comprobante de caja
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='file'
									{...register('file')}
								/>
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								Id='inputsubname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Estado
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('estado', {
										required: {
											value: true,
											message: 'El estado es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='Pendiente'>Pendiente</option>
									<option value='Pagado'>Pagado</option>
									<option value='Cobrado'>Cobrado</option>
									<option value='Cancelado'>Cancelado</option>
								</select>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around'>
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
