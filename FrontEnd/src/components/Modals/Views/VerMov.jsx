/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../../../css/Header.css';
import { Form, Modal } from 'react-bootstrap';
import { getExpte } from '../../../hooks/UseExptes';

export const VerMov = ({ rowId, expteId, showModal, onClose }) => {
	const [selectedMov, setSelectedMov] = useState([]);

	useEffect(() => {
		async function loadMov() {
			try {
				const expte = await getExpte(expteId);
				const selectedMovimiento = expte.movimientos.find(
					(mov) => mov._id === rowId
				);
				setSelectedMov(selectedMovimiento);
			} catch (error) {
				console.error('Error al obtener movimientos del expediente', error);
			}
		}
		loadMov();
	}, []);

	return (
		<div>
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background font-bold'>Consultar Movimiento</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='flex flex-wrap flex-col justify-around items-start'>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='datemov'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>Fecha <span className='text-black'>{selectedMov.fecha}</span></Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='descripmov'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
								Movimiento <span className='text-black'>{selectedMov.descripcion}</span>
							</Form.Label>
						</Form.Group>
						<Form.Group className='flex flex-row mb-3 items-center justify-around' id='filemov'>
							<Form.Label className='text-start bg-transparent text-xl mb-0 mt-2 text-primary w-full font-medium'>
								Archivo Adjunto{' '}
								{selectedMov.fileUrl ? (
									<a
										href={selectedMov.fileUrl}
										target='_blank'
										className='text-white'
										rel='noopener noreferrer'>
										Ver Archivo Adjunto
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
