/* eslint-disable react/prop-types */
import { Modal, Form } from 'react-bootstrap';

export const Pagos = ({ showModal, onClose }) => {
	return (
		<>
			<Modal show={showModal} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title className='text-background'>
						Consultar Medios de Pago
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3 text-background' controlId=''>
							<Form.Label>Cuenta Banco Galicia : </Form.Label>
							<ul>
								<li>
									<b>Caja de Ahorro en Pesos</b>
								</li>
								<li>
									<b>Nro cuenta:</b> 4052804-8 089-0
								</li>
								<li>
									<b>CBU:</b> 0070089430004052804802
								</li>
								<li>
									<b>Alias:</b> ofvinals.gali.peso
								</li>
							</ul>
						</Form.Group>
						<Form.Group className='mb-3 text-background' controlId=''>
							<Form.Label>Cuenta Banco Macro : </Form.Label>
							<ul>
								<li>
									<b>Caja de Ahorro en Pesos</b>
								</li>
								<li>
									<b>Nro cuenta:</b> 462809528678896
								</li>
								<li>
									<b>CBU:</b> 2850628540095286788968
								</li>
								<li>
									<b>Alias:</b> ofvinals.macro.peso{' '}
								</li>
							</ul>
						</Form.Group>
						<Form.Group
							className='mb-3 text-background flex flex-col '
							controlId=''>
							<Form.Label className=''>Mercado Pago :</Form.Label>
							<div className='flex flex-col items-center justify-center'>
							<button className='bg-primary w-5/12 p-3 rounded-xl items-center justif'>
								<a
									className='text-white text-decoration-none'
									href='https://link.mercadopago.com.ar/estudioposse'
									target='_blank'>
									<i className='pe-2 fa-solid fa-handshake-simple'></i>
									Boton de Pago
								</a>
							</button>{' '}</div>
							<img
								className='mt-3 align-self-center'
								src='/qr-mp.png'
								alt='QR Mercado Pago'
								width={300}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3 text-background flex flex-col'
							controlId=''>
							<Form.Label>Criptomonedas :</Form.Label>
							<img
								className='mt-3 align-self-center'
								src='/qr-binancec.png'
								alt='QR Mercado Pago'
								width={200}
							/>{' '}
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
			;
		</>
	);
};
