/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../../css/Header.css';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useUserActions } from '../../hooks/UseUserActions.js';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader.jsx';

export const UserForm = ({ rowId, onClose, mode }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { getUser, updateUser } = useUserActions();
	const user = useSelector((state) => state.users.user);
	const statusUser = useSelector((state) => state.users.statusUser);

	useEffect(() => {
		if (mode === 'edit' || mode === 'view') {
			getUser(rowId);
		}
	}, [rowId]);

	useEffect(() => {
		if (
			statusUser === 'Exitoso' &&
			user &&
			(mode === 'edit' || mode === 'view')
		) {
			setValue('nombre', user.nombre);
			setValue('apellido', user.apellido);
			setValue('email', user.email);
			setValue('dni', user.dni);
			setValue('domicilio', user.domicilio);
			setValue('celular', user.celular);
		}
	}, [statusUser, user]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			if (mode === 'edit') {
				await updateUser({ rowId, values });
				onClose();
			}
		} catch (error) {
			console.error('Error al editar el usuario:', error);
		}
	});

	if (statusUser === 'Cargando') {
		return <Loader />;
	}

	return (
		<>
			<div>
				<Form
					onSubmit={onSubmit}
					className='flex flex-wrap justify-around items-center'>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around'
						id='nombreEditarUsuario'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Nombre
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							id='name'
							{...register('nombre', {
								required: {
									value: true,
									message: 'El nombre o razon social es requerido.',
								},
							})}
							readOnly={mode === 'view'}
						/>{' '}
						{errors.nombre && (
							<span className='error-message'>
								{errors.nombre.message}
							</span>
						)}
					</Form.Group>

					<Form.Group
						className='flex flex-col mb-3 items-center justify-around'
						id='apellidoEditarUsuario'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Apellido
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							id='subname'
							{...register('apellido')}
							readOnly={mode === 'view'}
						/>
						{errors.apellido && (
							<span className='error-message'>
								{errors.apellido.message}
							</span>
						)}
					</Form.Group>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around'
						id='dniEditarUsuario'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							DNI/CUIT
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
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
							readOnly={mode === 'view'}
						/>
						{errors.dni && (
							<span className='error-message'>
								{errors.dni.message}
							</span>
						)}
					</Form.Group>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around'
						id='domicilioEditarUsuario'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Domicilio
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							id='domic'
							{...register('domicilio', {
								required: {
									value: true,
									message: 'El domicilio es requerido.',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.domicilio && (
							<span className='error-message'>
								{errors.domicilio.message}
							</span>
						)}
					</Form.Group>
					<Form.Group
						className='flex flex-col mb-3 items-center justify-around'
						id='celularEditarUsuario'>
						<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
							Celular
						</Form.Label>
						<Form.Control
							className={`items-center w-full p-2 focus:outline-none text-black ${
								mode === 'view'
									? 'border-none shadow-none bg-transparent'
									: 'border-2 border-black shadow-2xl rounded-md'
							}`}
							type='text'
							id='cel'
							{...register('celular', {
								required: {
									value: true,
									message: 'El celular es requerido.',
								},
								minLength: {
									value: 10,
									message: 'El celular debe contenter 10 digitos.',
								},
								maxLength: {
									value: 10,
									message: 'El celular debe contenter 10 digitos.',
								},
							})}
							readOnly={mode === 'view'}
						/>
						{errors.celular && (
							<span className='error-message'>
								{errors.celular.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='flex flex-wrap items-center w-full justify-around'>
						{mode !== 'view' && (
							<Button
								className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
								type='submit'>
								<i className='text-xl pe-2 bi bi-check2-square'></i>
								{mode === 'create'
									? 'Registrar Usuario'
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
