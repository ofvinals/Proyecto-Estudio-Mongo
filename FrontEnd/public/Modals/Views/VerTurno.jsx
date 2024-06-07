/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getTurno } from '../../../hooks/UseTurns.js';

export const VerTurno = ({ rowId, showModal, onClose }) => {
	const [turno, setTurno] = useState([]);
	const id = rowId;

	useEffect(() => {
		async function loadTurno() {
			try {
				const turno = await getTurno(id);
				setTurno(turno);
			} catch (error) {
				console.error('Error al cargar el caja', error);
			}
		}
		loadTurno();
	}, [id]);

	return (
		<div>
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background font-bold'>
						Ver Turno seleccionado
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='flex flex-wrap flex-col justify-around items-start'>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' Id='turno'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>Turno <span className='text-black'>{turno.turno}</span></Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' Id='email'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>Cliente <span className='text-black'>{turno.email}</span> </Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' Id='motivo'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>Motivo <span className='text-black'>{turno.motivo}</span> </Form.Label>
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
