/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.js';
import '../../css/Header.css';
import { Button } from 'react-bootstrap';
import { Recuperar } from './Recuperar.jsx';
import Modals from '../../utils/Modals.jsx';
import { Registro } from './Registro.jsx';
import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Login = ({ setOpenLogin }) => {
	const { loginGoogle, loginEmail } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [openModal, setOpenModal] = useState(null);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const statusAuth = useSelector((state) => state.auth.statusAuth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const handleRecModal = () => {
		setOpenModal('recpassword');
	};

	const handleRegister = () => {
		setOpenLogin && setOpenLogin(false);
		setOpenModal('register');
	};

	const onSubmit = handleSubmit(async (values) => {
		try {
			await loginEmail(values);
		} catch (error) {
			console.log(error);
		}
	});

	const handleGoogle = async (e) => {
		e.preventDefault();
		try {
			await loginGoogle();
		} catch (error) {
			console.error('Error en el inicio de sesión:', error);
		}
	};

	return (
		<>
			<Form
				id='loginForm'
				className='flex flex-col justify-center items-center bg-background rounded-xl py-4'
				onSubmit={onSubmit}>
				<>
					<Form.Group
						className='flex flex-col w-full items-center'
						controlId='inputemail'>
						<Form.Label
							className='text-start bg-transparent text-xl text-neutral-200 w-6/12 font-medium '
							id='email'>
							Email
						</Form.Label>
						<input
							className='items-center lowercase shadow-2xl w-8/12 rounded-md p-2 focus:outline-none border-2 border-black'
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

					<Form.Group
						className='flex flex-col w-full items-center mt-3'
						controlId='inputpassword'>
						<Form.Label className='text-start  bg-transparent text-xl text-neutral-200 w-6/12 font-medium'>
							Contraseña
						</Form.Label>
						<div className='flex flex-row shadow-2xl justify-center w-8/12 bg-white rounded-lg border-2 border-black'>
							<input
								className='items-center text-black  p-2 w-full rounded-md focus:outline-none '
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

							<Button
								type='button'
								onClick={toggleShowPassword}
								id='vercontrasena'
								className=' border-none bg-transparent text-black '>
								<i
									className={`text-xl p-2 ${
										showPassword ? 'bi-eye-slash' : 'bi-eye'
									}`}></i>
							</Button>
						</div>
						{errors.password && (
							<span className='error-message'>
								{errors.password.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='mt-2'>
						<Button
							className='link bg-transparent border-none text-neutral-200 mt-2 text-sm font-semibold text-decoration-underline'
							onClick={handleRecModal}>
							¿ Olvidaste tu contraseña ?
						</Button>
					</Form.Group>
					{statusAuth === 'Cargando' ? (
						<Form.Group
							className='flex flex-col items-center'
							controlId='inputpassword'>
							<Button
								className='m-3 btnlogin w-[142px] bg-white flex items-center justify-center border-2 shadow-3xl border-background text-background p-2 rounded-lg font-semibold'
								type='submit'>
								<ProgressSpinner
									style={{
										width: '30px',
										height: '30px',
									}}
									strokeWidth='8'
									fill='var(--surface-ground)'
									animationDuration='.6s'
								/>
								Cargando
							</Button>
						</Form.Group>
					) : (
						<Form.Group
							className='flex flex-col items-center'
							controlId='inputpassword'>
							<Button
								className='m-3 btnlogin w-[142px] bg-white flex items-center justify-center border-2 shadow-3xl border-background text-background p-2 rounded-lg font-semibold'
								type='submit'>
								<i className='text-xl pe-2 bi bi-box-arrow-in-right'></i>
								Ingresar
							</Button>
							<Button
								type='button'
								onClick={(e) => handleGoogle(e)}
								className='text-center font-semibold flex justify-center items-center text-neutral-200 shadow-3xl bg-background border-neutral-200 border-2 p-2 mx-3   rounded-lg hover:bg-neutral-200 hover:border-background hover:text-background'
								id='googleLogin'>
								<img
									className='w-6 h-6 mr-3'
									src='https://www.svgrepo.com/show/475656/google-color.svg'
									alt='google logo'
								/>
								Ingresar con Google
							</Button>
						</Form.Group>
					)}

					<p className='mt-6 text-neutral-400 text-sm text-center'>
						No tienes una cuenta?<br></br>
						<Button
							className='link bg-transparent border-none text-neutral-200 mt-2 text-sm font-semibold text-decoration-underline'
							onClick={handleRegister}>
							Registrarme ahora
						</Button>
					</p>
				</>
			</Form>
			{openModal === 'recpassword' && (
				<Modals
					isOpen={openModal === 'recpassword'}
					onClose={() => setOpenModal(null)}
					title='Recupera tu contraseña'>
					<Recuperar />
				</Modals>
			)}
			{openModal === 'register' && (
				<Modals
					isOpen={openModal === 'register'}
					onClose={() => setOpenModal(null)}>
					<Registro />
				</Modals>
			)}
		</>
	);
};
