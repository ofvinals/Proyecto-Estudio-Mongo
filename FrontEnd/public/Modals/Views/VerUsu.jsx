/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getUser } from '../../../hooks/UseUsers.js';

export const VerUsu = ({ rowId, showModal, onClose }) => {
	const [users, setUsers] = useState([]);
	const id = rowId;

	useEffect(() => {
		async function loadUsuario() {
			try {
				const usuario = await getUser(id);
				setUsers(usuario);
			} catch (error) {
				console.error('Error al cargar el usuario', error);
			}
		}
		loadUsuario();
	}, [id]);

	return (
		<div>
			{' '}
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background font-bold'>
						Ver Datos de Usuario
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='flex flex-col flex-wrap justify-around items-start'>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='nombre'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Nombre o Razon Social{' '}
								<span className='text-black'> {users.nombre}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='apellido'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Apellido{' '}
								<span className='text-black'> {users.apellido}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='dni'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								DNI/CUIT{' '}
								<span className='text-black'>{users.dni} </span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='celular'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Celular{' '}
								<span className='text-black'>{users.celular}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='email'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Email <span className='text-black'>{users.email}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='domicilio'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Domicilio{' '}
								<span className='text-black'>{users.domicilio}</span>
							</Form.Label>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<button
						className='bg-background shadow-3xl btnLogout text-white text-center p-2 border-2 w-[150px] my-3  border-white rounded-xl font-semibold'
						onClick={() => {
							onClose();
						}}>
						Volver
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
