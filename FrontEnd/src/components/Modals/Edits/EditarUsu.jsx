/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../../css/Header.css';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getUser, updateUser } from '../../../hooks/UseUsers.js';

export const EditarUsu = ({ rowId, showModal, onClose }) => {
	const id = rowId;
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		async function loadUser() {
			try {
				const userData = await getUser(id);
				setValue('nombre', userData.nombre);
				setValue('apellido', userData.apellido);
				setValue('email', userData.email);
				setValue('dni', userData.dni);
				setValue('domicilio', userData.domicilio);
				setValue('celular', userData.celular);
			} catch (error) {
				console.error('Error al cargar el usuario', error);
				Swal.fire({
					icon: 'error',
					title: 'Error al editar el usuario. Intente nuevamente!',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
		loadUser();
	}, [id]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			await updateUser(id, values);
			Swal.fire({
				icon: 'success',
				title: 'Usuario editado correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
			onClose();
		} catch (error) {
			console.error('Error al editar el usuario:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al editar el usuario. Intente nuevamente!',
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
							Modificar Datos de Usuario
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form
							onSubmit={onSubmit}
							className='flex flex-wrap justify-around items-center'>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='nombreEditarUsuario'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Nombre
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									id='name'
									{...register('nombre', {
										required: {
											value: true,
											message:
												'El nombre o razon social es requerido.',
										},
									})}
								/>{' '}
								{errors.nombre && (
									<span className='text-warning fs-6'>
										{errors.nombre.message}
									</span>
								)}
							</Form.Group>

							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='apellidoEditarUsuario'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Apellido
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									id='subname'
									{...register('apellido')}
								/>
								{errors.apellido && (
									<span className='text-warning fs-6'>
										{errors.apellido.message}
									</span>
								)}
							</Form.Group>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='dniEditarUsuario'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									DNI/CUIT
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									id='dni'
									{...register('dni', {
										required: {
											value: true,
											message: 'El DNI/CUIT es requerido.',
										},
										minLength: {
											value: 8,
											message:
												'El DNI/CUIT debe contenter entre 8 y 10 digitos.',
										},
										maxLength: {
											value: 11,
											message:
												'El DNI/CUIT debe contenter entre 8 y 10 digitos.',
										},
									})}
								/>
								{errors.dni && (
									<span className='text-warning fs-6'>
										{errors.dni.message}
									</span>
								)}
							</Form.Group>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='domicilioEditarUsuario'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Domicilio
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									id='domic'
									{...register('domicilio', {
										required: {
											value: true,
											message: 'El domicilio es requerido.',
										},
									})}
								/>
								{errors.domicilio && (
									<span className='text-warning fs-6'>
										{errors.domicilio.message}
									</span>
								)}
							</Form.Group>
							<Form.Group
								className='flex flex-col mb-3 items-center justify-around'
								id='celularEditarUsuario'>
								<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
									Celular
								</Form.Label>
								<Form.Control
									className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
									type='text'
									id='cel'
									{...register('celular', {
										required: {
											value: true,
											message: 'El celular es requerido.',
										},
										minLength: {
											value: 10,
											message:
												'El celular debe contenter 10 digitos.',
										},
										maxLength: {
											value: 10,
											message:
												'El celular debe contenter 10 digitos.',
										},
									})}
								/>
								{errors.celular && (
									<span className='text-warning fs-6'>
										{errors.celular.message}
									</span>
								)}
							</Form.Group>

							<Form.Group className='flex flex-wrap items-center w-full justify-around'>
								<Button
									className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
									type='submit'>
									<i className='text-xl pe-2 bi bi-check2-square'></i>
									Guardar cambios
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
