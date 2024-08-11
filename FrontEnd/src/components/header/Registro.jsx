/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../css/Header.css';
import { useAuth } from '../../hooks/useAuth';
import emailjs from '@emailjs/browser';
import Modals from '../../utils/Modals';
import { Login } from './Login';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export const Registro = ({ setOpenRegister }) => {
	const { registerUser } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const form = useRef();
	const [showPassword, setShowPassword] = useState(false);
	const [showCoPassword, setShowCoPassword] = useState(false);

	const [openModal, setOpenModal] = useState(null);

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleShowCoPassword = () => setShowCoPassword(!showCoPassword);

	const handleLogin = () => {
		setOpenRegister && setOpenRegister(false);
		setOpenModal('login');
	};

	const fetchImageUrl = async () => {
		try {
			const storage = getStorage();
			const imageRef = ref(storage, '/LOGOHOME.jpg');
			const url = await getDownloadURL(imageRef);
			return url;
		} catch (error) {
			console.error('Error al obtener la URL de la imagen:', error);
			return '';
		}
	};

	const onSubmit = handleSubmit(async (values) => {
		try {
			await registerUser(values);
			const templateParams = {
				url: await fetchImageUrl(),
				user_name: values.user_name,
				user_email: values.user_email,
				message: values.message,
				proyect: 'Estudio Juridico Posse y Asociados',
				messageLog: `Bienvenido al primer Estudio Juridico online de Tucuman. Estamos a tu disposicion para brindarte el mejor asesoramiento juridico!.-`,
			};
			emailjs
				.send(
					'service_iew5q2g',
					'template_fgl8bsq',
					templateParams,
					'saMzvd5sdlHj2BhYr'
				)
				.then(
					(result) => {
						console.log('Correo enviado con éxito:', result.text);
						reset();
					},
					(error) => {
						console.error('Error al enviar el correo:', error.text);
					}
				);
			navigate('/adminusu');
		} catch (error) {
			console.error('Error al registrar el usuario:', error);
		}
	});

	return (
		<>
			<Form
				id='loginFormreg'
				className='flex flex-wrap flex-row justify-around items-center w-full rounded-xl bg-background py-3'
				onSubmit={onSubmit}
				ref={form}>
				{/* Agrupa los inputs del formulario */}
				{['nombre', 'apellido', 'dni', 'domicilio', 'celular', 'email'].map(
					(field, index) => (
						<Form.Group className='mb-3' key={index}>
							<Form.Label className='text-start bg-transparent text-xl text-neutral-200 w-7/12 font-medium'>
								{field.charAt(0).toUpperCase() + field.slice(1)}
							</Form.Label>
							<Form.Control
								className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black'
								type={field === 'email' ? 'email' : 'text'}
								id={field}
								name={field}
								{...register(field, {
									required: {
										value: true,
										message: `${
											field.charAt(0).toUpperCase() + field.slice(1)
										} es requerido.`,
									},
								})}
							/>
							{errors[field] && (
								<span className='error-message'>
									{errors[field].message}
								</span>
							)}
						</Form.Group>
					)
				)}
				<Form.Group className='mb-3 flex flex-col w-10/12 md:w-8/12'>
					<Form.Label className='text-start bg-transparent text-xl text-neutral-200 w-10/12 font-medium'>
						Contraseña
					</Form.Label>
					<div className='flex flex-row items-center bg-neutral-200 shadow-2xl w-full rounded-md focus:outline-none border-2 border-black'>
						<Form.Control
							className='border-none'
							type={showPassword ? 'text' : 'password'}
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
						/>
						{errors.password && (
							<span className='error-message'>
								{errors.password.message}
							</span>
						)}
						<Button
							type='button'
							onClick={toggleShowPassword}
							className='border-none bg-white text-black'>
							<i
								className={`text-xl p-2 ${
									showPassword ? 'bi-eye-slash' : 'bi-eye'
								}`}></i>
						</Button>
					</div>
				</Form.Group>

				<Form.Group className='mb-3 flex flex-col w-10/12 md:w-8/12'>
					<Form.Label
						className='text-start bg-transparent text-xl text-neutral-200  font-medium'
						id='inputconfirm'>
						Confirmar Contraseña
					</Form.Label>
					<div className='flex flex-row items-center bg-neutral-200 shadow-2xl w-full rounded-md focus:outline-none border-2 border-black'>
						<Form.Control
							className='border-none '
							type={showCoPassword ? 'text' : 'password'}
							{...register('copassword', {
								required: {
									value: true,
									message:
										'La confirmacion de contraseña es requerida',
								},
								validate: (copassword) => {
									const { password } = getValues();
									return (
										copassword === password ||
										'Las contraseñas no coinciden'
									);
								},
							})}
						/>
						{errors.copassword && (
							<span className='error-message'>
								{errors.copassword.message}
							</span>
						)}
						<Button
							type='button'
							onClick={toggleShowCoPassword}
							className='border-none  bg-white text-black'>
							<i
								className={`text-xl p-2 ${
									showCoPassword ? 'bi-eye-slash' : 'bi-eye'
								}`}></i>
						</Button>
					</div>
				</Form.Group>

				<Form.Group className='mb-3 flex justify-center flex-col w-full items-center'>
					<Button
						className='m-3 w-[192px] bg-background border-2 shadow-3xl hover:text-background hover:bg-neutral-200 border-neutral-200 hover:border-background text-neutral-200 p-2 rounded-lg font-semibold'
						type='submit'>
						<i className='text-xl pe-2 bi bi-r-circle-fill'></i>
						Registrar cuenta
					</Button>
					<p className='text-neutral-400 text-center'>
						Ya tienes una cuenta?{' '}
						<Button
							className='link bg-transparent border-none text-neutral-200 mt-2 text-sm font-semibold text-decoration-underline'
							onClick={handleLogin}>
							Ingresar a mi cuenta
						</Button>
					</p>
				</Form.Group>
			</Form>

			{openModal === 'login' && (
				<Modals
					isOpen={openModal === 'login'}
					onClose={() => setOpenModal(null)}>
					<Login />
				</Modals>
			)}
		</>
	);
};
