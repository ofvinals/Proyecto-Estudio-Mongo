import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../css/Header.css';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/header/Header';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export const Contact = () => {
	const toast = useRef(null);
	const form = useRef();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const showToast = (severity, summary, detail) => {
		if (toast.current) {
			toast.current.show({
				severity: severity,
				summary: summary,
				detail: detail,
			});
		}
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
		const templateParams = {
			url: await fetchImageUrl(),
			user_name: values.user_name,
			user_email: values.user_email,
			message: values.message,
			proyect: 'Estudio Juridico Posse y Asociados',
			messageLog: `Recibimos tu contacto. A la brevedad posible nos pondremos en contacto con vos!.-`,
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
					showToast(
						'success',
						'Formulario Enviado',
						'Formulario de contacto enviado correctamente!'
					);
				},
				(error) => {
					console.error('Error al enviar el correo:', error.text);
				}
			);
	});

	return (
		<>
			<Header />
			<section className='pb-5 flex flex-col justify-center items-center backgroundimage'>
				<Whatsapp />
				<div className=''>
					<h1 className='text-3xl font-bold mt-28 bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-center'>
						¡Contactanos!
					</h1>
					<p className='text-center text-white p-2 md:mx-24'>
						Por cualquier duda, comentario o sugerencia puedes
						contactarnos y nos comunicaremos a la brevedad posible.
					</p>
				</div>
				<form
					className=' bg-white p-4 rounded-xl flex flex-wrap w-full sm:w-2/3 max-w-[335px] flex-col justify-center items-center mt-10'
					ref={form}
					onSubmit={onSubmit}>
					<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-bold w-full '>
						Tu Nombre
					</label>
					<input
						className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
						type='text'
						name='user_name'
						{...register('user_name', {
							required: {
								value: true,
								message: 'Tu nombre es obligatorio',
							},
						})}
					/>
					{errors.user_name && (
						<span className='error-message'>
							{errors.user_name.message}
						</span>
					)}
					<label
						className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-bold'
						placeholder='Ingrese su email..'>
						Email
					</label>
					<input
						className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
						type='email'
						name='user_email'
						{...register('user_email', {
							required: {
								value: true,
								message: 'Tu email es obligatorio',
							},
						})}
					/>
					{errors.user_email && (
						<span className='error-message'>
							{errors.user_email.message}
						</span>
					)}
					<label
						className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-bold'
						placeholder='Ingrese su mensaje..'>
						Mensaje
					</label>
					<textarea
						className='items-center shadow-2xl w-full h-[200px] rounded-md p-2 focus:outline-none border-2 border-black text-black'
						name='message'
						placeholder='Escribi tu mensaje...'
						{...register('message', {
							required: {
								value: true,
								message: 'Tu mensaje es obligatorio',
							},
						})}
					/>
					{errors.message && (
						<span className='error-message'>
							{errors.message.message}
						</span>
					)}
					<Button
						className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
						type='submit'>
						Enviar
					</Button>
				</form>
			</section>
		</>
	);
};
