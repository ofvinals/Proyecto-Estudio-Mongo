import { Form, Button } from 'react-bootstrap';

export const Pagos = ({ onClose }) => {
	return (
		<>
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
						<Button className='bg-primary w-5/12 p-3 rounded-xl items-center justif'>
							<a
								className='text-white text-decoration-none'
								href='https://link.mercadopago.com.ar/estudioposse'
								target='_blank'>
								<i className='pe-2 fa-solid fa-handshake-simple'></i>
								Boton de Pago
							</a>
						</Button>{' '}
					</div>
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
			;
		</>
	);
};
