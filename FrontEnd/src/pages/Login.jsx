/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import '../css/Header.css';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Header } from '../components/Header.jsx';
import { Recuperar } from '../components/Recuperar.jsx';
import Loader from '../components/Loader.jsx';

export const Login = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const [openRecModal, setopenRecModal] = useState(false);
	const { loginGoogle, loginEmail, statusSign } = useAuth();
	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleRecModal = () => {
		setopenRecModal(true);
	};
	const handleCloseModal = () => {
		setopenRecModal(false);
	};

	const onSubmit = handleSubmit(async (values) => {
		try {
			await loginEmail(values);
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Ingreso rechazado',
				text: 'El usuario y/o contraseña no son correctos!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});

	const handleGoogle = async (e) => {
		e.preventDefault();
		try {
			const user = await loginGoogle();
			Swal.fire({
				icon: 'success',
				title: 'Inicio de sesión Google exitoso!',
				showConfirmButton: false,
				timer: 1500,
			});
			if (user.admin || user.coadmin) {
				navigate('/admin', { replace: true });
			} else {
				navigate('/adminusu', { replace: true });
			}
		} catch (error) {
			console.error('Error en el inicio de sesión:', error);
			Swal.fire({
				icon: 'error',
				title: 'Ingreso rechazado',
				text: 'El inicio de sesion Google falló!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<section className=' bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pt-32 flex flex-wrap items-center justify-center flex-col pb-10'>
			<Header />

			<Form
				id='loginForm'
				className='mt-10 flex flex-col justify-center items-center w-auto border-2 border-black bg-white pb-6'
				onSubmit={onSubmit}>
				<h2 className='text-center textshadow text-3xl text-background font-bold m-7 '>
					Ingreso a Mi cuenta
				</h2>

				<>
					<Form.Group
						className='flex flex-col w-full items-center'
						controlId='inputemail'>
						<Form.Label
							className='text-start bg-transparent text-xl text-primary w-7/12 font-medium '
							id='email'>
							Email
						</Form.Label>
						<input
							className='items-center lowercase shadow-2xl w-9/12 rounded-md p-2 focus:outline-none border-2 border-black'
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
						<Form.Label className='text-start  bg-transparent text-xl text-primary w-7/12 font-medium'>
							Contraseña
						</Form.Label>
						<div className='flex flex-row shadow-2xl justify-center w-9/12 bg-white rounded-lg border-2 border-black'>
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

							<button
								type='button'
								onClick={toggleShowPassword}
								id='vercontrasena'
								className=' border-none '>
								<i
									className={`text-xl p-2 ${
										showPassword ? 'bi-eye-slash' : 'bi-eye'
									}`}></i>
							</button>
						</div>
						{errors.password && (
							<span className='error-message'>
								{errors.password.message}
							</span>
						)}
					</Form.Group>

					<Form.Group className='mt-2'>
						<Button
							className='link bg-transparent border-none text-primary mt-2 text-sm font-semibold text-decoration-underline'
							onClick={handleRecModal}>
							¿ Olvidaste tu contraseña ?
						</Button>
					</Form.Group>

					<Form.Group
						className='flex flex-col items-center'
						controlId='inputpassword'>
						<Button
							className='m-3 btnlogin w-[142px] bg-white border-2 shadow-3xl border-background text-background p-2 rounded-lg font-semibold'
							type='submit'>
							<i className='text-xl pe-2 bi bi-box-arrow-in-right'></i>
							Ingresar
						</Button>
						<button
							type='button'
							onClick={(e) => handleGoogle(e)}
							className='text-center font-semibold text-white shadow-3xl bg-background border-background border-2 p-2 w-[215px] rounded-lg btngoogle'
							id='googleLogin'>
							<i className=' text-xl pe-2 bi bi-google'></i>Ingresar con
							Google
						</button>
					</Form.Group>

					<p className='mt-6 text-black text-sm text-center'>
						No tienes una cuenta?<br></br>
						<Link
							className='link text-primary mt-2 text-sm font-semibold text-decoration-underline'
							to='/registro'>
							Registrarme ahora
						</Link>
					</p>
				</>
			</Form>

			{openRecModal && (
				<Recuperar showModal={openRecModal} onClose={handleCloseModal} />
			)}
		</section>
	);
};
