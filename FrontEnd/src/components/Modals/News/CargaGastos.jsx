/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../../css/Header.css';
import { useForm } from 'react-hook-form';
import { createGasto } from '../../../hooks/UseBills.js';
import { getExptes } from '../../../hooks/UseExptes.js';
import { getUsers } from '../../../hooks/UseUsers.js';
import { uploadFile } from '../../../firebase/config.js';

export const CargaGastos = ({ showModal, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [exptes, setExptes] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedExpteCaratula, setSelectedExpteCaratula] = useState('');

	useEffect(() => {
		const fetchExptes = async () => {
			try {
				const expedientes = await getExptes();
				const fetchedExptes = expedientes.map((doc) => {
					return { ...doc, _id: doc._id };
				});
				setExptes(fetchedExptes);
			} catch (error) {
				console.error('Error al obtener expedientes:', error);
			}
		};
		fetchExptes();
	}, []);

	useEffect(() => {
		const fetchUsuarios = async () => {
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
		fetchUsuarios();
	}, []);

	const onSubmit = handleSubmit(async (values) => {
		try {
			let fileDownloadUrl = null;
			if (values.file && values.file[0]) {
				const file = values.file[0];
				fileDownloadUrl = await uploadFile(file);
			}
			const gastoData = {
				nroexpte: values.nroexpte,
				cliente: values.cliente,
				caratula: selectedExpteCaratula,
				concepto: values.concepto,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};
			await createGasto(gastoData);
			Swal.fire({
				icon: 'success',
				title: 'Gasto registrado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error al registrar el gasto. Intente nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	// Función para manejar el cambio en el select de número de expediente
	const handleExpteSelectChange = async (e) => {
		const selectedExpteNro = e.target.value;
		const selectedExpte = exptes.find(
			(expte) => expte.nroexpte === selectedExpteNro
		);
		// Obtén la carátula del expediente seleccionado
		const caratulaToUpdate = selectedExpte ? selectedExpte.caratula : '';
		// Actualiza la carátula de manera asíncrona
		await setSelectedExpteCaratula(caratulaToUpdate);
		// Continúa con otras operaciones después de asegurarte de que la carátula está actualizada
	};

	return (
		<>
			<div className=''>
				<Modal show={showModal} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title className='text-background font-bold'>
							Cargar Nuevo Gasto
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							className='flex flex-wrap justify-around items-center'
							onSubmit={onSubmit}>
							<Form.Group className='flex flex-col' id='nroexpte'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Expediente
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('nroexpte')}
									onChange={handleExpteSelectChange}>
									<option>Selecciona..</option>
									{exptes.map((expte, index) => (
										<option key={index} value={expte.nroexpte}>
											{expte.nroexpte}
										</option>
									))}
								</select>{' '}
								{errors.nroexpte && (
									<span className='text-warning fs-6'>
										{errors.nroexpte.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='mb-3 flex flex-col w-full'
								id='inputcaratula'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Caratula
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									value={selectedExpteCaratula}
									{...register('caratula')}
								/>
							</Form.Group>

							<Form.Group className='flex flex-col' id='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Cliente
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('cliente')}>
									<option>Selecciona..</option>
									{users.map((user, index) => (
										<option key={index} value={user.cliente}>
											{`${user.nombre} ${user.apellido}`}
										</option>
									))}
								</select>
							</Form.Group>

							<Form.Group className='flex flex-col' id='inputconcepto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Concepto
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('concepto', {
										required: {
											value: true,
											message: 'El concepto del gasto es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='Planilla Fiscal'>
										Planilla Fiscal
									</option>
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
								</select>
								{errors.concepto && (
									<span className='text-warning fs-6'>
										{errors.concepto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-col' id='inputmonto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
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
								{errors.monto && (
									<span className='text-warning fs-6'>
										{errors.monto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-col' id='file'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
									Comprobante de gasto
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='file'
									{...register('file')}
								/>
							</Form.Group>

							<Form.Group className='flex flex-col' id='inputestado'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-7/12 font-medium'>
									Estado
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									{...register('estado', {
										required: {
											value: true,
											message: 'El estado del gasto es requerido',
										},
									})}>
									<option value=''>Selecciona..</option>
									<option value='Pendiente'>Pendiente</option>
									<option value='Pagado'>Pagado</option>
									<option value='Cancelado'>Cancelado</option>
								</select>
								{errors.estado && (
									<span className='text-warning fs-6'>
										{errors.estado.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-wrap items-center w-full justify-around'
								controlId='inputpassword'>
								<Button
									className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
									type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Registrar Gasto
								</Button>
								<Link
									to='/gestiongastos'
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
