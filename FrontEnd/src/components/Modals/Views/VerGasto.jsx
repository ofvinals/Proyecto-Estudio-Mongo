/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getGasto } from '../../../hooks/UseBills.js';

export const VerGasto = ({ rowId, showModal, onClose }) => {
	const [gasto, setGasto] = useState([]);
	const id = rowId;

	useEffect(() => {
		async function loadGasto() {
			try {
				const gasto = await getGasto(id);
				setGasto(gasto);
			} catch (error) {
				console.error('Error al cargar el gasto', error);
			}
		}
		loadGasto();
	}, [id]);

	return (
		<div>
			{' '}
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background font-bold'>
						Ver Gasto seleccionado
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='flex flex-col flex-wrap justify-around items-start'>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='expte'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Nro Expte <span className='text-black'>{gasto.nroexpte}</span></Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='concepto'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Concepto <span className='text-black'>{gasto.concepto}</span></Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='monto'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Monto <span className='text-black'>$ {gasto.monto}</span></Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='file'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
								Comprobante Adjunto:{' '}
								{gasto.fileUrl ? (
									<a
										href={gasto.fileUrl}
										target='_blank'
										className='text-white'
										rel='noopener noreferrer'>
										Ver Comprobante
									</a>
								) : (
									<span className='text-black'>Sin comprobante </span>
								)}
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
