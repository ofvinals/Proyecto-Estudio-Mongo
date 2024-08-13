import { useRef } from 'react';
import '../css/Header.css';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/header/Header';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMails } from '../hooks/useMails';

export const Contact = () => {
	const { sendMailContact } = useMails();
	const form = useRef();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = handleSubmit(async (values) => {
		sendMailContact(values);
		reset();
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
