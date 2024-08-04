/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { useUserActions } from '../../hooks/UseUserActions.js';
import { useExpteActions } from '../../hooks/UseExptes.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

export const ExpteForm = ({ rowId, onClose, mode }) => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		watch,
		unregister,
	} = useForm();
	const { getUsers } = useUserActions();
	const { getExpte, updateExpte, createExpte } = useExpteActions();
	const users = useSelector((state) => state.users.users);
	const expte = useSelector((state) => state.exptes.expte);
	const statusExpte = useSelector((state) => state.exptes.statusExpte);

	useEffect(() => {
		getUsers();
		if (mode === 'edit' || mode === 'view') {
			getExpte(rowId);
		}
	}, []);

	useEffect(() => {
		if (
			statusExpte === 'Exitoso' &&
			expte &&
			(mode === 'edit' || mode === 'view')
		) {
			setValue('cliente', expte.cliente);
			setValue('nroexpte', expte.nroexpte);
			setValue('radicacion', expte.radicacion);
			setValue('juzgado', expte.juzgado);
			setValue('caratula', expte.caratula);
			setValue('actor', expte.actor);
			setValue('demandado', expte.demandado);
			setValue('proceso', expte.proceso);
			setValue('estado', expte.estado);
			const caratulaValue = `${expte.actor} c/ ${expte.demandado} s/ ${expte.proceso}`;
			setValue('caratula', caratulaValue);
		}
	}, [statusExpte, expte]);

	useEffect(() => {
		const updateCaratula = () => {
			const actor = watch('actor');
			const demandado = watch('demandado');
			const proceso = watch('proceso');
			const caratulaValue = `${actor} c/ ${demandado} s/ ${proceso}`;
			setValue('caratula', caratulaValue);
		};
		watch(['actor', 'demandado', 'proceso'], updateCaratula);
		return () => {
			unregister(['actor', 'demandado', 'proceso']);
		};
	}, [watch, setValue, unregister]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			if (mode === 'edit') {
				await updateExpte(rowId, values);
				onClose();
			} else if (mode === 'create') {
				await createExpte(values);
				onClose();
			}
		} catch (error) {
			console.error('Error al manejar el expediente:', error);
		}
	});

	if (statusExpte === 'Cargando') {
		return <Loader />;
	}

	return (
		<>
			<div>
				<Form
					className='flex flex-wrap justify-around items-center'
					onSubmit={onSubmit}>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
						id='inputname'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Cliente
						</Form.Label>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							aria-label='Default select'
							{...register('cliente')}
							readOnly={mode === 'view'}>
							<option>Selecciona..</option>
							{users.map((user, index) => (
								<option key={index} value={user.email}>
									{`${user.nombre} ${user.apellido}`}
								</option>
							))}
						</select>
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mt-2'
						id='inputname'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Nro Expediente
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							{...register('nroexpte', {
								required: {
									value: true,
									message: 'El numero de expediente es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.nroexpte && (
							<span className='error-message'>
								{errors.nroexpte.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='mb-3 flex flex-col w-full '
						hidden={mode === 'create'}
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
						id='inputradic'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Fuero
						</Form.Label>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							aria-label='Default select'
							{...register('radicacion', {
								required: {
									value: true,
									message: 'La radicacion es requerida',
								},
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='Civil y Comercial'>
								Civil y Comercial
							</option>
							<option value='Contensioso Admnistrativo'>
								Contensioso Admnistrativo
							</option>
							<option value='Documentos y Locaciones'>
								Documentos y Locaciones
							</option>
							<option value='Familia y Sucesiones'>
								Familia y Sucesiones
							</option>
							<option value='Trabajo'>Trabajo</option>
						</select>
						{errors.radicacion && (
							<span className='error-message'>
								{errors.radicacion.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='inputradic'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Juzgado
						</Form.Label>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							aria-label='Default select'
							{...register('juzgado', {
								required: {
									value: true,
									message: 'El juzgado es requerido',
								},
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='I NOM'>I NOM</option>
							<option value='II NOM'>II NOM</option>
							<option value='III NOM'>III NOM</option>
							<option value='IV NOM'>IV NOM</option>
							<option value='V NOM'>V NOM</option>
							<option value='VI NOM'>VI NOM</option>
							<option value='VII NOM'>VII NOM</option>
							<option value='VIII NOM'>VIII NOM</option>
							<option value='IX NOM'>IX NOM</option>
							<option value='X NOM'>X NOM</option>
							<option value='XI NOM'>XI NOM</option>
							<option value='XII NOM'>XII NOM</option>
						</select>
						{errors.juzgado && (
							<span className='error-message'>
								{errors.juzgado.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-full mx-2'
						id='inputdomic'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Actor
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							{...register('actor', {
								required: {
									value: true,
									message: 'El actor es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.actor && (
							<span className='error-message'>
								{errors.actor.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-full mx-2'
						id='inputcel'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Demandado
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							{...register('demandado', {
								required: {
									value: true,
									message: 'El demandado es requerido',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.demandado && (
							<span className='error-message'>
								{errors.demandado.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='inputemail'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Tipo de Proceso
						</Form.Label>
						<select
							className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
							aria-label='Default select example'
							{...register('proceso', {
								required: {
									value: true,
									message: 'El tipo de proceso es requerido',
								},
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='Cobro de Pesos'>Cobro de Pesos</option>
							<option value='Daños y Perjuicios'>
								Daños y Perjuicios
							</option>
							<option value='Desalojo'>Desalojo</option>
							<option value='Cobro Ejecutivo'>Cobro Ejecutivo</option>
							<option value='Reivindicacion'>Reivindicacion</option>
							<option value='Sucesion'>Sucesion</option>
							<option value='Accion de Consumo'>
								Accion de Consumo
							</option>
						</select>
						{errors.proceso && (
							<span className='error-message'>
								{errors.proceso.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around w-5/12 mx-2'
						id='inputemail'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
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
							})}
							readOnly={mode === 'view'}>
							<option value=''>Selecciona..</option>
							<option value='En tramite'>En tramite</option>
							<option value='Mediacion'>Mediacion</option>
							<option value='Extrajudicial'>Extrajudicial</option>
							<option value='Terminado'>Terminado</option>
							<option value='Caduco'>Caduco</option>
						</select>
						{errors.estado && (
							<span className='error-message'>
								{errors.estado.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
						{mode !== 'view' && (
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								type='submit'>
								<i className='text-xl pe-2 bi bi-check2-square'></i>
								{mode === 'create'
									? 'Registrar Expediente'
									: 'Guardar Cambios'}
							</Button>
						)}
						<Link
							to='/gestionexpedientes'
							onClick={onClose}
							className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'>
							<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
							{mode === 'view' ? 'Volver' : 'Cancelar'}
						</Link>
					</Form.Group>
				</Form>
			</div>
		</>
	);
};
