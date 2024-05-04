/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getCaja } from '../../../hooks/UseCajas.js';

export const VerCaja = ({ rowId, showModal, onClose }) => {
	const [caja, setCaja] = useState([]);
	const id = rowId;

	useEffect(() => {
		async function loadCaja() {
			try {
				const caja = await getCaja(id);
				setCaja(caja);
			} catch (error) {
				console.error('Error al cargar el caja', error);
			}
		}
		loadCaja();
	}, [id]);

	return (
		<div>
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background font-bold'>
						Ver Movimiento de Caja
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='flex flex-col flex-wrap justify-around items-start'>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='fecha'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Fecha <span className='text-black'> {caja.fecha}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='concepto'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Concepto{' '}
								<span className='text-black'>{caja.concepto}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-center justify-around'
							id='monto'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Monto <span className='text-black'>$ {caja.monto}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-start justify-start'
							id='comprobante'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Comprobante Adjunto:{' '}
								{caja.fileUrl ? (
									<a
										href={caja.fileUrl}
										target='_blank'
										className='text-black'
										rel='noopener noreferrer'>
										Ver Comprobante
									</a>
								) : (
									<span className='text-black'>Sin comprobante </span>
								)}
							</Form.Label>
						</Form.Group>
						<Form.Group
							className='flex flex-row mb-3 items-start justify-start'
							id='estado'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-background w-full font-medium'>
								Estado <span className='text-black'>{caja.estado}</span>{' '}
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
