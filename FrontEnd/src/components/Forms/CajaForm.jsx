/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { getCaja, updateCaja, createCaja } from '../../hooks/UseCajas.js';
import { uploadFile } from '../../firebase/config.js';
import Swal from 'sweetalert2';
import Loader from '../Loader.jsx';

const CajaForm = ({ rowId, onClose, mode = 'edit' }) => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	// Mueve la función al nivel raíz del cuerpo del componente
	const loadCaja = async () => {
		try {
			setLoading(true);
			const cajaData = await getCaja(rowId);
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
			setLoading(false);
		} catch (error) {
			console.error('Error al cargar el caja', error);
		}
	};

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			loadCaja();
		}
	}, [rowId, mode]);

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

			if (mode === 'edit') {
				setLoading(true);
				await updateCaja(rowId, cajaData);
				setLoading(false);
				onClose();
				Swal.fire({
					icon: 'success',
					title: 'Caja editada correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
			} else if (mode === 'create') {
				setLoading(true);
				await createCaja(cajaData);
				setLoading(false);
				onClose();
				Swal.fire({
					icon: 'success',
					title: 'Caja registrada correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: `Error al ${
					mode === 'edit' ? 'editar' : 'registrar'
				} la caja. Intente nuevamente!`,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='fecha'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Fecha
						</Form.Label>
						<Form.Control
							type='date'
							{...register('fecha', {
								required: 'La fecha es requerida',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.fecha && (
							<span className='text-warning fs-6'>
								{errors.fecha.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='concepto'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Concepto
						</Form.Label>
						<Form.Control
							type='text'
							{...register('concepto', {
								required: 'El concepto es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.concepto && (
							<span className='text-warning fs-6'>
								{errors.concepto.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='tipo'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Tipo
						</Form.Label>
						<Form.Control
							as='select'
							{...register('tipo', { required: 'El tipo es requerido' })}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='INGRESO'>INGRESO</option>
							<option value='EGRESO'>EGRESO</option>
						</Form.Control>
						{errors.tipo && (
							<span className='text-warning fs-6'>
								{errors.tipo.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='monto'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Monto
						</Form.Label>
						<Form.Control
							type='number'
							{...register('monto', {
								required: 'El monto del gasto es requerido',
							})}
							readOnly={mode === 'view'}
						/>
						{errors.monto && (
							<span className='text-warning fs-6'>
								{errors.monto.message}
							</span>
						)}
					</Form.Group>
					<Form.Group controlId='file'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Comprobante de caja
						</Form.Label>
						{mode === 'edit' || mode === 'create' ? (
							<Form.Control type='file' {...register('file')} />
						) : (
							<Form.Control
								plaintext
								readOnly
								defaultValue='Sin comprobante'
							/>
						)}
					</Form.Group>
					<Form.Group controlId='estado'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Estado
						</Form.Label>
						<Form.Control
							as='select'
							{...register('estado', {
								required: 'El estado es requerido',
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='Pendiente'>Pendiente</option>
							<option value='Pagado'>Pagado</option>
							<option value='Cobrado'>Cobrado</option>
							<option value='Cancelado'>Cancelado</option>
						</Form.Control>
						{errors.estado && (
							<span className='text-warning fs-6'>
								{errors.estado.message}
							</span>
						)}
					</Form.Group>
					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								type='submit'
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'>
								{mode === 'create'
									? 'Registrar Caja'
									: 'Guardar Cambios'}
							</Button>
						)}
						<Button
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
							onClick={onClose}>
							{mode === 'view' ? 'Volver' : 'Cancelar'}
						</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default CajaForm;
