/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useExpteActions } from '../../hooks/UseExptes';
import { uploadFile } from '../../firebase/config.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

export const MovForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { createMov, updateMov } = useExpteActions();
	const expte = useSelector((state) => state.exptes.expte);
	const statusMov = useSelector((state) => state.exptes.statusMov);

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
			setValue('adjunto', selectedMovimiento.adjunto);
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
		<>
			<div>
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
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='date'
							{...register('fecha', {
								required: {
									value: true,
									message: 'La fecha es requerida',
								},
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
						className='flex flex-col mb-3 items-center justify-around w-full mx-2 mt-2'
						controlId='inputcaratula'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Descripcion
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							as='textarea'
							rows={7}
							cols={70}
							{...register('descripcion', {
								required: {
									value: true,
									message: 'La descripcion es requerida',
								},
							})}
							readOnly={mode === 'view'}
						/>{' '}
						{errors.descripcion && (
							<span className='error-message'>
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
						{mode === 'edit' || mode === 'create' ? (
							<Form.Control
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
								type='file'
								{...register('fileUrl')}
							/>
						) : expte.fileUrl ? (
							<a
								href={expte.fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 underline'>
								Ver archivo adjunto
							</a>
						) : (
							<Form.Control
								plaintext
								readOnly
								defaultValue='Sin adjunto'
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
									? 'Registrar Movimiento'
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
