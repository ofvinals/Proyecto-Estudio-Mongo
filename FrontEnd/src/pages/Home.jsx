import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Home.css';
import { Header } from '../components/header/Header';
import { Count } from '../components/Home/Count';
import { Whatsapp } from '../components/Whatsapp';
import { Services } from '../components/Home/Services';
import { News } from '../components/Home/News';

export const Home = () => {
	return (
		<>
			<Header />
			<section className='bg-white'>
				<Whatsapp />
				<div className='imagennav rounded-b-lg flex flex-col h-[450px]'>
					<div className='flex flex-col absolute top-1/4 sm:top-1/3 left-0 right-0 items-center text-center text-3xl text-white font-bold'>
						<p>Experiencia, Etica y Profesionalismo</p>
						<p className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text flex mt-2 justify-center text-3xl text-[#25aff0] font-bold '>
							Evolucionamos el concepto de estudio juridico
						</p>
					</div>

					<div className='flex flex-row justify-center top-3/4 left-0 right-0 sm:top-80 absolute'>
						<Link
							className='btnhome text-base p-1 bg-background text-white rounded-lg font-semibold min-w-[222px] max-w-[300px] flex items-center justify-center text-center border-1 border-white hover:border-[#25aff0] '
							to='/login'>
							<i className=' text-2xl pr-1 bi bi-calendar-check me-2 '></i>
							Agenda tu turno ahora!
						</Link>
					</div>
				</div>
			</section>

			<section className='imagenlogosec2 h-[290px] mt-10 bg-white flex justify-center'>
				<Link
					className='btnhome text-base p-2 bg-background text-white rounded-lg font-semibold flex items-center justify-center text-center cursor-pointer mt-[250px] min-w-[222px] max-w-[300px] border-1 hover:bg-white hover:text-[#25aff0]'
					to='/login'>
					<i className='text-xl fa-solid fa-right-to-bracket me-2'></i>
					Ingresa a tu cuenta
				</Link>
			</section>

			<p className=' bg-[#185574] p-5 rounded-lg w-full text-5xl font-bold text-center my-10 text-white'>
				Somos el {''}
				<span className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
					primer Estudio Juridico online {''}
				</span>
				{''}de Tucuman!
			</p>

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
										Recordatorios automaticos de audiencias,reuniones
										y vencimientos
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
										Creación, transformacion y liquidacion de todo
										tipo de sociedades
									</li>
								</ul>
							</div>{' '}
						</div>
					</Carousel.Item>
				</Carousel>
			</section>
			<Count />

			<section className='d-flex flex-row justify-center my-10 mr-2 md:mx-16 xl:mx-36 h-[380px]'>
				<div className='imagenlogosec4 flex justify-center items-center  w-5/12'></div>
				<div className='w-7/12 h-full flex bg-[#185574] rounded-md flex-col justify-center align-center'>
					<p className='text-white w-full flex text-center justify-center text-2xl lg:text-3xl font-bold mt-3 '>
						PORQUE ELEGIRNOS
					</p>
					<p className='text-white text-[14px] w-full text-center px-1 pt-3 sm:text-[16px]'>
						Mas de 35 años de ejercicio de la abogacia avalan el
						profesionalismo con el que llevamos a cabo un servicio de
						asesoría legal de excelencia. Nos caracteriza la seriedad y
						responsabilidad en la relacion con nuestros clientes.-
					</p>
				</div>
			</section>

			<Services />
			<News />
			<section className='flex items-center justify-center'>
				<div className='imagensection4 md:w-[750px] xl:w-[1100px] rounded-xl mt-3 flex flex-col flex-around h-[550px] sm:h-[450px] w-full mb-10'>
					<p className=' titlecontac w-full flex justify-center font-bold text-4xl text-[#25b0f0] text-center items-center'>
						CONTACTO
					</p>
					<div className='flex flex-col sm:flex-row w-full justify-center items-center'>
						<div className='w-full mt-28 sm:w-6/12 hidden sm:flex items-center justify-center'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.013312683754!2d-65.20918052524385!3d-26.83952887669088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c09395f6643%3A0x48e82a10f44c7cbe!2s9%20de%20Julio%20620%2C%20T4000IHN%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1714396430198!5m2!1ses-419!2sar'
								width='250'
								height='250'
								allowFullScreen=''
								loading='lazy'></iframe>
						</div>
						<div className='sm:w-6/12 w-full top flex-nowrap flex-col flex items-center justify-center'>
							<div className='conttel flex flex-col text-center items-center w-6/12 text-base '>
								<i className='text-[#25b0f0] text-2xl bi bi-telephone-fill mb-3l bi bi-telephone-fill me-2 mb-3'></i>
								<p className='text-white text-2xl'>+54 381-458 1382</p>
							</div>
							<div className='contmail flex flex-col text-center items-center w-6/12 text-base mt-12 sm:mt-4'>
								<i className='text-[#25b0f0] text-2xl bi bi-envelope-at-fill me-2 '></i>
								<p className='text-white text-2xl'>
									ofvinals@gmail.com
								</p>
							</div>
							<div className='contdir flex flex-col text-center items-center w-6/12 text-base mt-16 sm:mt-8'>
								<i className='text-[#25b0f0] text-2xl bi bi-geo-alt-fill me-2 '></i>
								<p className='text-white text-2xl'>
									9 de Julio 620 Planta Baja C - SMT
								</p>
							</div>
						</div>
						<div className='contbtn '>
							<Link
								className='btnhome text-base p-2 bg-background text-white rounded-lg font-semibold min-w-[222px] max-w-[300px] flex items-center justify-center text-center border-1 border-white hover:border-[#25aff0]'
								to='/login'>
								<i className='icosecboton bi bi-calendar-check me-2'></i>
								AGENDA TU TURNO ONLINE!
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
