/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import {
	FormInput,
	FormSelect,
	SaveButton,
	CancelButton,
} from '../../utils/Form.jsx';
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
			setSelectedExpteCaratula(bill.caratula);
		}
	}, [statusBill, bill]);

	useEffect(() => {
		getExptes();
	}, []);

	const handleExpteSelectChange = (e) => {
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
	}, [watch('nroexpte')]);

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
				const values = data;
				await updateBill(rowId, values);
				onClose();
			} else if (mode === 'create') {
				const values = data;
				await createBill({ values });
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
		<Form
			className='flex flex-wrap justify-around items-center'
			onSubmit={onSubmit}>
			<FormSelect
				label='Expediente'
				name='nroexpte'
				register={register}
				disabled={mode === 'view'}
				errors={errors}
				mode={mode}
				selectOptions={exptes.map((expte) => ({
					value: expte.nroexpte,
					label: expte.nroexpte,
				}))}
				onChange={handleExpteSelectChange}
				options={{
					required: {
						value: true,
						message: 'El numero de expediente es obligatorio',
					},
				}}
			/>

			<FormInput
				label='Caratula'
				name='caratula'
				type='text'
				register={register}
				errors={errors}
				mode={mode}
				readOnly
			/>

			<FormSelect
				label='Concepto'
				name='concepto'
				register={register}
				errors={errors}
				mode={mode}
				disabled={mode === 'view'}
				selectOptions={[
					{ value: 'Planilla Fiscal', label: 'Planilla Fiscal' },
					{
						value: 'Gastos de Apersonamiento',
						label: 'Gastos de Apersonamiento',
					},
					{ value: 'Bonos de Movilidad', label: 'Bonos de Movilidad' },
					{
						value: 'Honorarios Profesionales',
						label: 'Honorarios Profesionales',
					},
					{ value: 'Gastos de pericias', label: 'Gastos de pericias' },
					{
						value: 'Gastos Extrajudiciales',
						label: 'Gastos Extrajudiciales',
					},
				]}
				readOnly={mode === 'view'}
				options={{
					required: {
						value: true,
						message: 'El concepto es obligatorio',
					},
				}}
			/>

			<FormInput
				label='Monto'
				name='monto'
				type='number'
				register={register}
				errors={errors}
				mode={mode}
				readOnly={mode === 'view'}
				disabled={mode === 'view'}
				options={{
					required: {
						value: true,
						message: 'El monto es obligatorio',
					},
				}}
			/>

			<FormSelect
				label='Estado'
				name='estado'
				register={register}
				errors={errors}
				disabled={mode === 'view'}
				mode={mode}
				selectOptions={[
					{ value: 'Pendiente', label: 'Pendiente' },
					{ value: 'Pagado', label: 'Pagado' },
				]}
				readOnly={mode === 'view'}
				options={{
					required: {
						value: true,
						message: 'El estado es obligatorio',
					},
				}}
			/>
			<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
				Comprobante de gasto
			</Form.Label>
			{mode === 'edit' || mode === 'create' ? (
				<Form.Control
					className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
					type='file'
					{...register('file')}
				/>
			) : bill?.fileUrl ? (
				<a
					href={bill.fileUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500 underline'>
					Ver comprobante adjunto
				</a>
			) : (
				<Form.Control
					plaintext
					readOnly
					defaultValue='Sin comprobante adjunto'
				/>
			)}

			<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
				{mode !== 'view' && (
					<SaveButton
						onSubmit={onSubmit}
						label={
							mode === 'create' ? 'Registrar Gasto' : 'Guardar Cambios'
						}
					/>
				)}
				<CancelButton
					onClose={onClose}
					label={mode === 'view' ? 'Volver' : 'Cancelar'}
				/>
			</Form.Group>
		</Form>
	);
};
