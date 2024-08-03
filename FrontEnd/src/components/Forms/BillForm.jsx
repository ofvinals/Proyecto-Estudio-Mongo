/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { Button, FormSelect } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { uploadFile } from '../../firebase/config.js';
import { useBillActions } from '../../hooks/UseBills.js';
import Loader from '../../utils/Loader.jsx';
import { useSelector } from 'react-redux';

export const BillForm = ({ rowId, onClose, mode }) => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		watch,
	} = useForm();
	const [selectedExpteCaratula, setSelectedExpteCaratula] = useState('');
	const { createBill, getBill, updateBill } = useBillActions();
	const { getExptes } = useExpteActions();
	const exptes = useSelector((state) => state.exptes.exptes);
	const bill = useSelector((state) => state.bills.bill);
	const statusBill = useSelector((state) => state.bills.statusBill);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getBill(rowId);
		}
	}, [rowId]);

	useEffect(() => {
		if (
			statusBill === 'Exitoso' &&
			bill &&
			(mode === 'edit' || mode === 'view')
		) {
			setValue('nroexpte', bill.nroexpte);
			setValue('caratula', bill.caratula);
			setValue('concepto', bill.concepto);
			setValue('comprobante', bill.comprobante);
			setValue('monto', bill.monto);
			setValue('estado', bill.estado);
		}
	}, [statusBill, bill]);

	const dataExptes = async () => {
		getExptes();
	};

	useEffect(() => {
		dataExptes();
	}, []);

	const handleExpteSelectChange = async (e) => {
		const selectedExpteNro = e.target.value;
		updateCaratula(selectedExpteNro);
	};
	const updateCaratula = (selectedExpteNro) => {
		const selectedExpte = exptes.find(
			(expte) => expte.nroexpte === selectedExpteNro
		);
		const caratulaToUpdate = selectedExpte ? selectedExpte.caratula : '';
		setSelectedExpteCaratula(caratulaToUpdate);
		setValue('caratula', caratulaToUpdate);
	};

	useEffect(() => {
		// Llamada inicial para establecer la carátula
		updateCaratula(watch('nroexpte'));
	}, []);

	useEffect(() => {
		// Llamada cada vez que cambie el valor de nroexpte
		updateCaratula(watch('nroexpte'));
	}, [watch]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			let fileDownloadUrl = null;
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const data = {
				nroexpte: values.nroexpte,
				caratula: selectedExpteCaratula,
				concepto: values.concepto,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};
			if (mode === 'edit') {
				await updateBill(rowId, data);
				onClose();
			} else if (mode === 'create') {
				await createBill(data);
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	});

	if (statusBill === 'Cargando') {
		return <Loader />;
	}

	return (
		<>
			<div>
				<Form
					className='flex flex-wrap justify-around items-center'
					onSubmit={onSubmit}>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-6/12 mx-2'
						id='inputname'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Expediente
						</Form.Label>
						<FormSelect
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							aria-label='Default select'
							name='expte'
							{...register('nroexpte')}
							onChange={handleExpteSelectChange}
							disabled={mode === 'view'}
							readOnly={mode === 'view'}>
							<option>Selecciona..</option>
							{exptes.map((expte, index) => (
								<option key={index} value={expte.nroexpte}>
									{expte.nroexpte}
								</option>
							))}
						</FormSelect>
					</Form.Group>

					<Form.Group
						className='mb-3 flex flex-col w-full mx-2'
						id='inputcaratula'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Caratula
						</Form.Label>
						<Form.Control
							className='border-none shadow-none bg-transparent'
							type='text'
							{...register('caratula')}
							readOnly
						/>
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='inputconcepto'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Concepto
						</Form.Label>
						<FormSelect
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							aria-label='Default select'
							onChange={() => {
								updateCaratula(watch('nroexpte'));
							}}
							{...register('concepto', {
								required: {
									value: true,
									message: 'El concepto es requerido',
								},
							})}
							disabled={mode === 'view'}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='Planilla Fiscal'>Planilla Fiscal</option>
							<option value='Gastos de Apersonamiento'>
								Gastos de Apersonamiento
							</option>
							<option value='Bonos de Movilidad'>
								Bonos de Movilidad
							</option>
							<option value='Honorarios Profesionales'>
								Honorarios Profesionales
							</option>
							<option value='Gastos de pericias'>
								Gastos de pericias
							</option>
							<option value='Gastos Extrajudiciales'>
								Gastos Extrajudiciales
							</option>
						</FormSelect>
						{errors.concepto && (
							<span className='error-message'>
								{errors.concepto.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='inputmonto'>
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
							onChange={() => {
								updateCaratula(watch('nroexpte'));
							}}
							{...register('monto', {
								required: {
									value: true,
									message: 'El monto es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.monto && (
							<span className='error-message'>
								{errors.monto.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-6/12 mx-2'
						id='inputsubname'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Estado
						</Form.Label>
						<FormSelect
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							aria-label='Default select'
							onChange={() => {
								updateCaratula(watch('nroexpte'));
							}}
							{...register('estado', {
								required: {
									value: true,
									message: 'El estado es requerido',
								},
							})}
							disabled={mode === 'view'}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='Pendiente'>Pendiente</option>
							<option value='Pagado'>Pagado</option>
							<option value='Cancelado'>Cancelado</option>
						</FormSelect>
						{errors.estado && (
							<span className='error-message'>
								{errors.estado.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-full mx-2'
						id='fileUrl'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Comprobante de gasto
						</Form.Label>
						{mode === 'edit' || mode === 'create' ? (
							<Form.Control
								type='file'
								{...register('fileUrl')}
								onChange={() => {
									updateCaratula(watch('nroexpte'));
								}}
							/>
						) : (
							<Form.Control
								plaintext
								readOnly
								defaultValue='Sin comprobante'
							/>
						)}
					</Form.Group>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								type='submit'>
								<i className='text-xl pe-2 bi bi-check2-square'></i>
								{mode === 'create'
									? 'Registrar Gasto'
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
