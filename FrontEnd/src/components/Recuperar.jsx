/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Modal } from 'react-bootstrap';

export const Recuperar = ({ showModal, onClose }) => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const { resetPassword } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await resetPassword(emailRef.current.value);
			navigate('/home');
		} catch (error) {
			console.error('Error al restablecer la contraseña:', error);
		}
	}

	return (
		<>
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton className='bg-background'>
					<Modal.Title className='bg-background text-center text-3xl text-white'>
						Recuperar contraseña
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='bg-background flex flex-col justify-center items-center  border-2 border-white rounded-xl mt-24 mb-3'>
						<p className='font-2xl text-white text-center py-3'>
							Ingresa tu mail y te enviaremos el procedimiento para
							recuperar tu contraseña
						</p>
						<Form.Group controlId='inputemail'>
							<input
								className='items-center shadow-2xl w-[230px] rounded-md p-2 focus:outline-none border-2 border-black text-black'
								type='email'
								name='emailRef'
								ref={emailRef}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3 d-flex justify-content-center'
							controlId='inputpassword'>
							<button
								className='bg-white shadow-3xl btnAdmin mx-2 text-primary text-center p-2 border-2 w-[150px] my-3 border-primary rounded-xl font-bold'
								onClick={(e) => handleSubmit(e)}>
								Enviar
							</button>
						</Form.Group>
					</Form>{' '}
				</Modal.Body>
			</Modal>
		</>
	);
};
