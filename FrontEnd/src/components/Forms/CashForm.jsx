/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useCashActions } from '../../hooks/UseCashs.js';
import {
	FormInput,
	FormSelect,
	SaveButton,
	CancelButton,
} from '../../utils/Form.jsx';
import { uploadFile } from '../../firebase/config.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

const CashForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getCash, updateCash, createCash } = useCashActions();
	const cash = useSelector((state) => state.cashs.cash);
	const statusCash = useSelector((state) => state.cashs.status);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getCash(rowId);
		}
	}, [statusCash]);

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
			const data = {
				fecha: formattedDate,
				mes: selectedDate.getMonth() + 1,
				concepto: values.concepto,
				tipo: values.tipo,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};

			if (mode === 'edit') {
				const values = data;
				await updateCash({ rowId, values });
				onClose();
			} else if (mode === 'create') {
				const values = data;
				await createCash(values);
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
		<Form
			className='flex flex-wrap justify-around items-center'
			onSubmit={onSubmit}>
			<FormInput
				label='Fecha'
				name='fecha'
				type='date'
				register={register}
				errors={errors}
				mode={mode}
				options={{
					required: {
						value: true,
						message: 'La fecha es requerida',
					},
				}}
			/>
			<FormInput
				label='Concepto'
				name='concepto'
				register={register}
				errors={errors}
				mode={mode}
				options={{
					required: {
						value: true,
						message: 'El concepto es requerido',
					},
				}}
			/>
			<FormSelect
				label='Tipo'
				name='tipo'
				register={register}
				errors={errors}
				mode={mode}
				selectOptions={[
					{ value: 'INGRESO', label: 'INGRESO' },
					{ value: 'EGRESO', label: 'EGRESO' },
				]}
			/>
			<FormInput
				label='Monto'
				name='monto'
				type='number'
				register={register}
				errors={errors}
				mode={mode}
				options={{
					required: {
						value: true,
						message: 'El monto es requerido',
					},
				}}
			/>
			<Form.Group className='flex flex-wrap items-center w-full justify-around'>
				{mode !== 'view' && (
					<SaveButton
						onSubmit={onSubmit}
						label={
							mode === 'create' ? 'Registrar Cash' : 'Guardar Cambios'
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

export default CashForm;
