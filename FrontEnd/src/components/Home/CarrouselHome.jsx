import Carousel from 'react-bootstrap/Carousel';

export const CarrouselHome = () => {
	return (
		<section className='flex items-center justify-center '>
			<Carousel
				slide={false}
				className='lg:w-[1000px] md:w-[700px] w-full h-full '>
				<Carousel.Item>
					<div className='imagencar1 items-center rounded-xl'>
						<div className='flex flex-col'>
							<h3 className='text-[#25b0f0] w-full text-4xl font-bold text-center mb-8'>
								Disponibilidad
							</h3>
							<ul className='text-white text[14px] font-bold flex flex-col text-center mx-10 lg:mx-32'>
								<li>Varias vias de comunicacion</li>
								<li>Videollamadas - Reuniones Virtuales</li>
								<li>Meet - Zoom - Discord</li>
								<li>Whatsapp - Telegram</li>
								<li>Correo Electronico</li>
							</ul>
						</div>
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div className='imagencar2 rounded-xl'>
						<div className='d-flex flex-column'>
							<h3 className='text-[#25b0f0] w-full text-4xl font-bold text-center mb-8'>
								Expediente Virtual
							</h3>
							<ul className='text-white text[14px] font-bold flex flex-col text-center mx-10 lg:mx-32'>
								<li>
									Conoce el estado y situacion de tu expediente
									judicial en tiempo real
								</li>
								<li>Adjunta documentacion digitalizada</li>
								<li>
									Recordatorios automaticos de audiencias,reuniones y
									vencimientos
								</li>
							</ul>
						</div>{' '}
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div className='imagencar3 rounded-xl'>
						<div className='d-flex flex-column'>
							<h3 className='text-[#25b0f0] w-full text-4xl font-bold text-center mb-8'>
								Formas de pago
							</h3>
							<ul className='text-white text[14px] font-bold flex flex-col text-center mx-10 lg:mx-32'>
								<li>Paga de la forma que mas te convenga</li>
								<li>Abonos mensuales para empresas</li>
								<li>Efectivo o transferencias bancarias</li>
								<li>Tarjeta de credito - Debito - MercadoPago</li>
								<li>Criptomonedas</li>
							</ul>
						</div>{' '}
					</div>
				</Carousel.Item>

				<Carousel.Item>
					<div className='imagencar2 rounded-xl'>
						<div className='d-flex flex-column'>
							<h3 className='text-[#25b0f0] w-full text-4xl font-bold text-center mb-8'>
								Estudio Juridico 2.0
							</h3>
							<p className='text-white text[14px] font-bold flex flex-col text-center mx-10 lg:mx-32'>
								Ponemos a tu disposicion el mejor servicio es nuestro
								objetivo, por ello evolucionamos hacia el concepto
								asesoría legal online para brindarte respuestas con
								agilidad y eficiencia.
							</p>
						</div>{' '}
					</div>
				</Carousel.Item>

				<Carousel.Item>
					<div className='imagencar2 rounded-xl'>
						<div className='d-flex flex-column'>
							{' '}
							<h3 className='text-[#25b0f0] w-full text-4xl font-bold text-center mb-8'>
								Asesoramiento para empresas
							</h3>
							<ul className='text-white text[14px] font-bold flex flex-col text-center mx-10 lg:mx-32'>
								<li>Asesoramiento empresario integral</li>
								<li>Gestión de cobranzas</li>
								<li>Revisión y redacción de contratos en general</li>
								<li>
									Creación, transformacion y liquidacion de todo tipo
									de sociedades
								</li>
							</ul>
						</div>{' '}
					</div>
				</Carousel.Item>
			</Carousel>
		</section>
	);
};
