/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useCashActions } from '../../hooks/UseCashs.js';
import { uploadFile } from '../../firebase/config.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

const CashForm = ({ rowId, onClose, mode = 'edit' }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getCash, updateCash, createCash } = useCashActions();
	const cash = useSelector((state) => state.cashs.cash);
	const statusCash = useSelector((state) => state.cashs.statusCash);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getCash(rowId);
		}
	}, [rowId]);

	// Mueve la función al nivel raíz del cuerpo del componente
	useEffect(() => {
		if (
			statusCash === 'Exitoso' &&
			cash &&
			(mode === 'edit' || mode === 'view')
		) {
			const fechaParts = cash.fecha.split('/');
			const year = fechaParts[2];
			const month = fechaParts[1].padStart(2, '0');
			const day = fechaParts[0].padStart(2, '0');
			const fechaFormateada = `${year}-${month}-${day}`;
			setValue('fecha', fechaFormateada);
			setValue('concepto', cash.concepto);
			setValue('tipo', cash.tipo);
			setValue('monto', cash.monto);
			setValue('adjunto', cash.file);
			setValue('estado', cash.estado);
		}
	}, [statusCash, cash]);

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
			const cashData = {
				fecha: formattedDate,
				mes: selectedDate.getMonth() + 1,
				concepto: values.concepto,
				tipo: values.tipo,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};

			if (mode === 'edit') {
				await updateCash(rowId, cashData);
				onClose();
			} else if (mode === 'create') {
				await createCash(cashData);
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	});

	if (statusCash === 'Cargando') {
		return <Loader />;
	}

	return (
		<>
			<Form
				className='flex flex-wrap justify-around items-center'
				onSubmit={onSubmit}>
				<Form.Group
					className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
					controlId='fecha'>
					<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Fecha
					</Form.Label>
					<Form.Control
						className={`items-center w-full p-2 focus:outline-none text-black ${
							mode === 'view'
								? 'border-none shadow-none bg-transparent'
								: 'border-2 border-black shadow-2xl rounded-md'
						}`}
						type='date'
						{...register('fecha', {
							required: 'La fecha es requerida',
						})}
						readOnly={mode === 'view'}
					/>
					{errors.fecha && (
						<span className='error-message'>
							{errors.fecha.message}
						</span>
					)}
				</Form.Group>
				<Form.Group
					className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
					controlId='concepto'>
					<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Concepto
					</Form.Label>
					<Form.Control
						className={`items-center w-full p-2 focus:outline-none text-black ${
							mode === 'view'
								? 'border-none shadow-none bg-transparent'
								: 'border-2 border-black shadow-2xl rounded-md'
						}`}
						type='text'
						{...register('concepto', {
							required: 'El concepto es requerido',
						})}
						readOnly={mode === 'view'}
					/>
					{errors.concepto && (
						<span className='error-message'>
							{errors.concepto.message}
						</span>
					)}
				</Form.Group>

				<Form.Group
					className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
					controlId='tipo'>
					<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Tipo
					</Form.Label>
					<Form.Control
						className={`items-center w-full p-2 focus:outline-none text-black ${
							mode === 'view'
								? 'border-none shadow-none bg-transparent'
								: 'border-2 border-black shadow-2xl rounded-md'
						}`}
						as='select'
						{...register('tipo', { required: 'El tipo es requerido' })}
						readOnly={mode === 'view'}>
						<option value=''>Selecciona..</option>
						<option value='INGRESO'>INGRESO</option>
						<option value='EGRESO'>EGRESO</option>
					</Form.Control>
					{errors.tipo && (
						<span className='error-message'>
							{errors.tipo.message}
						</span>
					)}
				</Form.Group>

				<Form.Group
					className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
					controlId='monto'>
					<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Monto
					</Form.Label>
					<Form.Control
						className={`items-center w-full p-2 focus:outline-none text-black ${
							mode === 'view'
								? 'border-none shadow-none bg-transparent'
								: 'border-2 border-black shadow-2xl rounded-md'
						}`}
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

				<Form.Group
					className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
					controlId='estado'>
					<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
						Estado
					</Form.Label>
					<Form.Control
						className={`items-center w-full p-2 focus:outline-none text-black ${
							mode === 'view'
								? 'border-none shadow-none bg-transparent'
								: 'border-2 border-black shadow-2xl rounded-md'
						}`}
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
						<span className='error-message'>
							{errors.estado.message}
						</span>
					)}
				</Form.Group>
				<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
					{mode !== 'view' && (
						<Button
							type='submit'
							className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'>
							{mode === 'create' ? 'Registrar Cash' : 'Guardar Cambios'}
						</Button>
					)}
					<Button
						className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
						onClick={onClose}>
						{mode === 'view' ? 'Volver' : 'Cancelar'}
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default CashForm;
