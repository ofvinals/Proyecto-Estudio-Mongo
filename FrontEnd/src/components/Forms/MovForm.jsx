/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { FormInput, SaveButton, CancelButton } from '../../utils/Form.jsx';
import { useForm } from 'react-hook-form';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { uploadFile } from '../../firebase/config.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';
import { selectExpte, selectMovStatus } from '../../store/exptes/selectors.js';

export const MovForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { createMov, updateMov } = useExpteActions();
	const [selectedMov, setSelectedMov] = useState([]);
	const expte = useSelector(selectExpte);
	const statusMov = useSelector(selectMovStatus);

	useEffect(() => {
		if (expte && (mode === 'edit' || mode === 'view')) {
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
			setValue('fileUrl', selectedMovimiento.fileUrl);
			setSelectedMov(selectedMovimiento);
		}
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
				fecha: formattedDate,
				descripcion: values.descripcion,
				fileUrl: fileDownloadUrl,
			};
			const expteId = expte._id;
			if (mode === 'edit') {
				await updateMov(expteId, rowId, movData);
				onClose();
			} else if (mode === 'create') {
				await createMov(expteId, movData);
				onClose();
			}
		} catch (error) {
			console.error('Error al editar el movimiento:', error);
		}
	});

	if (statusMov === 'Cargando') {
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
				label='Descripcion'
				name='descripcion'
				type='textarea'
				register={register}
				errors={errors}
				mode={mode}
				options={{
					required: {
						value: true,
						message: 'La descripcion es requerida',
					},
				}}
			/>

			<Form.Group className='flex flex-col mb-3 items-center justify-around w-full mx-2'>
				<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
					Archivo Adjunto
				</Form.Label>
				{mode === 'edit' || mode === 'create' ? (
					<Form.Control
						className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
						type='file'
						{...register('file')}
					/>
				) : selectedMov.file ? (
					<a
						href={selectedMov.file}
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 underline'>
						Ver archivo adjunto
					</a>
				) : (
					<Form.Control plaintext readOnly defaultValue='Sin adjunto' />
				)}
			</Form.Group>

			<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
				{mode !== 'view' && (
					<SaveButton
						onSubmit={onSubmit}
						label={
							mode === 'create'
								? 'Registrar Movimiento'
								: 'Guardar Cambios'
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
