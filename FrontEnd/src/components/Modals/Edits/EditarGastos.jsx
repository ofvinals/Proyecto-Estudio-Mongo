/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getExptes } from '../../../hooks/UseExptes.js';
import { uploadFile } from '../../../firebase/config.js';
import { getGasto, updateGasto } from '../../../hooks/UseBills.js';

export const EditarGastos = ({ rowId, showModal, onClose }) => {
	const id = rowId;
	const navigate = useNavigate();
	const [exptes, setExptes] = useState([]);
	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		watch,
	} = useForm();
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
				console.error('Error al obtener usuarios:', error);
			}
		};
		fetchExptes();
	}, []);

	useEffect(() => {
		async function loadGasto() {
			try {
				const gastoData = await getGasto(id);
				setValue('nroexpte', gastoData.nroexpte);
				setValue('caratula', gastoData.caratula);
				setValue('concepto', gastoData.concepto);
				setValue('comprobante', gastoData.comprobante);
				setValue('monto', gastoData.monto);
				setValue('estado', gastoData.estado);
			} catch (error) {
				console.error('Error al cargar el gasto', error);
			}
		}
		loadGasto();
	}, [id]);

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
			const gastoData = {
				expte: values.nroexpte,
				caratula: selectedExpteCaratula,
				concepto: values.concepto,
				monto: parseInt(values.monto, 10),
				fileUrl: fileDownloadUrl,
				estado: values.estado,
			};

			await updateGasto(id, gastoData);

			Swal.fire({
				icon: 'success',
				title: 'Gasto editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
			navigate('/gestiongastos');
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el gasto. Intente nuevamente!',
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
							Modificar Gasto
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form className='flex flex-wrap justify-around items-center' onSubmit={onSubmit}>
							<Form.Group className='flex flex-col mb-3 items-center justify-around' id='inputname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Expediente
								</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									name='expte'
									{...register('nroexpte')}
									onChange={handleExpteSelectChange}>
									<option>Selecciona..</option>
									{exptes.map((expte, index) => (
										<option key={index} value={expte.nroexpte}>
											{expte.nroexpte}
										</option>
									))}
								</select>
							</Form.Group>

							<Form.Group
								className='mb-3 flex flex-col w-full'
								id='inputcaratula'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Caratula</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									{...register('caratula')}
									readOnly
								/>
							</Form.Group>

							<Form.Group className='flex flex-col mb-3 items-center justify-around' id='inputconcepto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Concepto</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									onChange={(e) => {
										updateCaratula(watch('nroexpte'));
									}}
									{...register('concepto', {
										required: {
											value: true,
											message: 'El concepto es requerido',
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

							<Form.Group className='flex flex-col mb-3 items-center justify-around' id='inputmonto'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Monto</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='number'
									onChange={(e) => {
										updateCaratula(watch('nroexpte'));
									}}
									{...register('monto', {
										required: {
											value: true,
											message: 'El monto es requerido',
										},
									})}
								/>
								{errors.monto && (
									<span className='text-warning fs-6'>
										{errors.monto.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-col mb-3 items-center justify-around' id='inputsubname'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Estado</Form.Label>
								<select
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									aria-label='Default select'
									onChange={(e) => {
										updateCaratula(watch('nroexpte'));
									}}
									{...register('estado', {
										required: {
											value: true,
											message: 'El estado es requerido',
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

							<Form.Group className='flex flex-col mb-3 items-center justify-around' id='fileUrl'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Comprobante de gasto
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='file'
									{...register('fileUrl')}
									onChange={(e) => {
										updateCaratula(watch('nroexpte'));
									}}
								/>
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around'>
								<Button className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold' type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar Cambios
								</Button>
								<Button
									type='button'
									className='bg-white shadow-3xl btnAdmin text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-semibold'
									onClick={onClose}>
									<i className='text-xl pe-2 bi bi-x-circle-fill'></i>
									Cancelar
								</Button>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};
