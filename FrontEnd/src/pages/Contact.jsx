import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../css/Header.css';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/header/Header';

export const Contact = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_iew5q2g',
				'template_qar0tof',
				form.current,
				'saMzvd5sdlHj2BhYr'
			)
			.then(
				() => {
					Swal.fire({
						icon: 'success',
						title: 'Mensaje enviado correctamente! Te responderemos a la brevedad posible!',
						showConfirmButton: false,
						timer: 3000,
					});
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	return (
		<>
			<Header />
			<div className='pb-5 flex flex-col justify-center items-center backgroundimage'>
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
					onSubmit={sendEmail}>
					<label className='text-start bg-transparent text-xl mb-0 mt-2 text-background font-bold w-full '>
						Tu Nombre
					</label>
					<input
						className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
						type='text'
						name='user_name'
						required
					/>
					<label
						className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-bold'
						placeholder='Ingrese su email..'>
						Email
					</label>
					<input
						className='items-center shadow-2xl w-full rounded-md p-2 focus:outline-none border-2 border-black text-black'
						type='email'
						name='user_email'
						required
					/>
					<label
						className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-bold'
						placeholder='Ingrese su mensaje..'>
						Mensaje
					</label>
					<textarea
						className='items-center shadow-2xl w-full h-[200px] rounded-md p-2 focus:outline-none border-2 border-black text-black'
						name='message'
						placeholder='Escribi tu mensaje...'
						required
					/>
					<button
						className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[230px] my-3  border-white rounded-xl font-semibold'
						type='submit'
						value='Enviar'>
						Enviar
					</button>
				</form>
			</div>
		</>
	);
};
