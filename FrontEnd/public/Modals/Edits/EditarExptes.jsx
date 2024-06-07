/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { getUsers } from '../../../hooks/UseUsers.js';
import { getExpte, updateExpte } from '../../../hooks/UseExptes.js';

export const EditarExptes = ({ rowId, showModal, onClose }) => {
	const id = rowId;
	const [users, setUsers] = useState([]);
	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		watch,
		unregister,
	} = useForm();

	// Función para cargar los datos del expediente al abrir la página
	useEffect(() => {
		async function loadExpte() {
			try {
				const expteData = await getExpte(id);
				setValue('cliente', expteData.cliente);
				setValue('nroexpte', expteData.nroexpte);
				setValue('radicacion', expteData.radicacion);
				setValue('juzgado', expteData.juzgado);
				setValue('caratula', expteData.caratula);
				setValue('actor', expteData.actor);
				setValue('demandado', expteData.demandado);
				setValue('proceso', expteData.proceso);
				setValue('estado', expteData.estado);
				const caratulaValue = `${expteData.actor} c/ ${expteData.demandado} s/ ${expteData.proceso}`;
				setValue('caratula', caratulaValue);
			} catch (error) {
				console.error('Error al editar el expediente', error);
			}
		}
		loadExpte();
	}, [id]);

	useEffect(() => {
		const loadUsuarios = async () => {
			try {
				const usuarios = await getUsers();
				const fetchedUsuarios = usuarios.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				setUsers(fetchedUsuarios);
			} catch (error) {
				console.error('Error al obtener usuarios:', error);
			}
		};
		loadUsuarios();
	}, []);

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
			await updateExpte(id, values);
			Swal.fire({
				icon: 'success',
				title: 'Expediente editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error('Error al eliminar el expediente:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el expediente. Intente nuevamente!',
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
							Modificar Datos de Expediente
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
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
									{...register('cliente')}>
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
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('nroexpte', {
										required: {
											value: true,
											message:
												'El numero de expediente es requerido',
										},
									})}
								/>
								{errors.nroexpte && (
									<span className='text-warning fs-6'>
										{errors.nroexpte.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='mb-3 flex flex-col w-full '
								id='inputcaratula'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Caratula
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('caratula')}
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
									})}>
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
									<span className='text-warning fs-6'>
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
									})}>
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
									<span className='text-warning fs-6'>
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
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('actor', {
										required: {
											value: true,
											message: 'El actor es requerido',
										},
									})}
								/>
								{errors.actor && (
									<span className='text-warning fs-6'>
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
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('demandado', {
										required: {
											value: true,
											message: 'El demandado es requerido',
										},
									})}
								/>
								{errors.demandado && (
									<span className='text-warning fs-6'>
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
											message: 'El concepto del gasto es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='Cobro de Pesos'>
										Cobro de Pesos
									</option>
									<option value='Daños y Perjuicios'>
										Daños y Perjuicios
									</option>
									<option value='Desalojo'>Desalojo</option>
									<option value='Cobro Ejecutivo'>
										Cobro Ejecutivo
									</option>
									<option value='Reivindicacion'>
										Reivindicacion
									</option>
									<option value='Sucesion'>Sucesion</option>
									<option value='Accion de Consumo'>Accion de Consumo</option>
								</select>
								{errors.proceso && (
									<span className='text-warning fs-6'>
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
									})}>
									<option value=''>Selecciona..</option>
									<option value='En tramite'>En tramite</option>
									<option value='Mediacion'>Mediacion</option>
									<option value='Extrajudicial'>Extrajudicial</option>
									<option value='Terminado'>Terminado</option>
									<option value='Caduco'>Caduco</option>
								</select>
								{errors.estado && (
									<span className='text-warning fs-6'>
										{errors.estado.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around mt-3'>
								<Button
									className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
									type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar Cambios
								</Button>
								<Link
									to='/gestionexpedientes'
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
