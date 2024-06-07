import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/Header.css';
import { useAuth } from '../context/UseContext.jsx';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Header } from '../components/Header.jsx';
import Loader from '../components/Loader.jsx';

export const Registro = () => {
	const { registro } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const form = useRef();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => setShowPassword(!showPassword);

	const onSubmit = handleSubmit(async (values) => {
		setLoading(true);
		try {
			await registro(values);
			setLoading(false);
			Swal.fire({
				icon: 'success',
				title: 'Bienvenido! Registro de cuenta exitoso!',
				showConfirmButton: false,
				timer: 2500,
			});
			emailjs.sendForm(
				'service_iew5q2g',
				'template_fgl8bsq',
				form.current,
				'saMzvd5sdlHj2BhYr'
			);
			navigate('/adminusu');
		} catch (error) {
			console.error('Error al registrar:', error);
			setLoading(false);
			Swal.fire({
				icon: 'error',
				title: 'Error de registro',
				text: 'Hubo un error en el registro de usuario. Intenta nuevamente!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	return (
		<section
			className=' bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pt-32
		flex flex-wrap items-center justify-center flex-col  pb-10'>
			<Header />
			<Form
				id='loginFormreg'
				className='flex flex-wrap flex-row justify-around items-center w-9/12 rounded-xl bg-white my-3'
				onSubmit={onSubmit}
				ref={form}>
				<h2 className='text-center textshadow w-full my-3 text-3xl font-bold text-background'>
					Crear Nueva Cuenta
				</h2>
				{loading ? (
					<Loader />
				) : (
					<>
						<Form.Group className='mb-3' id='inputname'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Nombre/s
							</Form.Label>
							<Form.Control
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='text'
								id='name'
								name='nombre'
								{...register('nombre', {
									required: {
										value: true,
										message: 'El nombre o razon social es requerido.',
									},
								})}
							/>
							{errors.nombre && (
								<span className='error-message'>
									{errors.nombre.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3' id='inputsubname'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Apellido/s
							</Form.Label>
							<Form.Control
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='text'
								id='subname'
								name='apellido'
								{...register('apellido')}
							/>{' '}
							{errors.apellido && (
								<span className='error-message'>
									{errors.apellido.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3' id='inputdni'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								DNI/CUIT/CUIL
							</Form.Label>
							<Form.Control
								className='items-center lowercase shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='number'
								id='dni'
								name='dni'
								{...register('dni', {
									required: {
										value: true,
										message: 'El DNI/CUIT es requerido.',
									},
									minLength: {
										value: 8,
										message:
											'El DNI/CUIT debe contenter entre 8 y 11 digitos.',
									},
									maxLength: {
										value: 12,
										message:
											'El DNI/CUIT debe contenter entre 8 y 11 digitos.',
									},
								})}
							/>{' '}
							{errors.dni && (
								<span className='error-message'>
									{errors.dni.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3' id='inputdomic'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Domicilio
							</Form.Label>
							<Form.Control
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='text'
								id='domic'
								name='domicilio'
								{...register('domicilio', {
									required: {
										value: true,
										message: 'El domicilio es requerido.',
									},
								})}
							/>{' '}
							{errors.domicilio && (
								<span className='error-message'>
									{errors.domicilio.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3' id='inputcel'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Celular
							</Form.Label>
							<Form.Control
								className='items-center lowercase shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='number'
								id='cel'
								name='cel'
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
										value: 11,
										message: 'El celular debe contenter 10 digitos.',
									},
								})}
							/>{' '}
							{errors.celular && (
								<span className='error-message'>
									{errors.celular.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3' id='inputemail'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Email
							</Form.Label>
							<Form.Control
								className='items-center lowercase shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type='email'
								id='email'
								name='email'
								{...register('email', {
									required: {
										value: true,
										message: 'El email es requerido',
									},
									pattern: {
										value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
										message: 'Email no válido',
									},
								})}
							/>
							{errors.email && (
								<span className='error-message'>
									{errors.email.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label className='text-start bg-transparent text-xl text-primary w-7/12 font-medium'>
								Contraseña
							</Form.Label>
							<Form.Control
								className='items-center lowercase shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type={showPassword ? 'text' : 'password'}
								id='password'
								{...register('password', {
									required: {
										value: true,
										message: 'La contraseña es requerida',
									},
									minLength: {
										value: 7,
										message:
											'La contraseña debe ser mayor a 7 caracteres',
									},
								})}
							/>{' '}
							{errors.password && (
								<span className='error-message'>
									{errors.password.message}
								</span>
							)}
						</Form.Group>

						<Form.Group className='mb-3 flex flex-col'>
							<Form.Label
								className='text-start bg-transparent text-xl text-primary w-full font-medium'
								id='inputconfirm'>
								Confirmar Contraseña
							</Form.Label>
							<div className='flex flex-row items-center shadow-2xl w-full rounded-md focus:outline-none border-2 border-black'>
								<Form.Control
									className=''
									type={showPassword ? 'text' : 'password'}
									id='copassword'
									{...register('copassword', {
										required: {
											value: true,
											message:
												'La confirmacion de contraseña es requerida',
										},
										minLength: {
											value: 7,
											message:
												'La contraseña debe ser mayor a 7 caracteres',
										},
										validate: (copassword) => {
											const { password } = getValues();
											return (
												copassword === password ||
												'Las contraseñas ingresadas no coinciden'
											);
										},
									})}
								/>{' '}
								{errors.copassword && (
									<span className='error-message'>
										{errors.copassword.message}
									</span>
								)}
								<button
									type='button'
									onClick={toggleShowPassword}
									id='vercontrasena'
									className='border-none'>
									<i
										className={`text-xl p-2 ${
											showPassword ? 'bi-eye-slash' : 'bi-eye'
										}`}></i>
								</button>
							</div>
						</Form.Group>

						<Form.Group className='mb-3 flex justify-center flex-col w-full items-center'>
							<Button
								className='m-3 btnreg w-[192px] bg-background border-2 shadow-3xl border-white text-white p-2 rounded-lg font-semibold'
								type='submit'>
								<i className=' text-xl pe-2 bi bi-r-circle-fill'></i>
								Registrar cuenta
							</Button>

							<p className='text-black text-center'>
								Ya tienes una cuenta ?{' '}
								<Link
									className='link text-primary mt-2 text-sm font-semibold text-decoration-underline'
									to='/login'>
									Ingresar a mi cuenta
								</Link>
							</p>
						</Form.Group>
					</>
				)}
			</Form>
		</section>
	);
};
