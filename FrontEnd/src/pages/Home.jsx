import '../css/Home.css';
import { Header } from '../components/header/Header';
import { Count } from '../components/Home/Count';
import { Whatsapp } from '../components/Whatsapp';
import { Services } from '../components/Home/Services';
import { News } from '../components/Home/News';
import { CarrouselHome } from '../components/Home/CarrouselHome';
import { ContactHome } from '../components/Home/ContactHome';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modals from '../utils/Modals';
import { Login } from '../components/header/Login';
import { Registro } from '../components/header/Registro';

export const Home = () => {
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const handleLogin = () => {
		setOpenRegister(false);
		setOpenLogin(true);
	};

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
						<a
							href='https://chatgpt.com/g/g-677eed1b1b0c8191a677c280be06d7f1-abogado-virtual-argentina'
							target='_blank'
							rel='noopener noreferrer'>
							<Button className='btnhome text-base p-1 px-3 bg-background text-white rounded-lg font-semibold min-w-[222px] max-w-[300px] flex items-center justify-center text-center border-1 border-white hover:border-[#25aff0]'>
								<i className='text-2xl pr-1 fa-solid fa-hexagon-nodes me-2'></i>
								Consulta Nuestro Asistente Virtual!
							</Button>
						</a>
					</div>
				</div>
			</section>

			<section className='imagenlogosec2 h-[290px] mt-10 bg-white flex justify-center'>
				<Button
					className='btnhome text-base p-2 bg-background text-white rounded-lg font-semibold flex items-center justify-center text-center cursor-pointer mt-[250px] min-w-[222px] max-w-[300px] border-1 hover:bg-white hover:text-[#25aff0]'
					onClick={handleLogin}>
					<i className='text-xl fa-solid fa-right-to-bracket me-2'></i>
					Ingresa a tu cuenta
				</Button>
			</section>

			<p className=' bg-[#185574] p-5 rounded-lg w-full text-5xl font-bold text-center my-10 text-white'>
				Somos el {''}
				<span className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>
					primer Estudio Juridico online {''}
				</span>
				{''}de Tucuman!
			</p>

			<CarrouselHome />

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

			<ContactHome />
			{openLogin && (
				<Modals
					title='Ingreso a Mi Cuenta'
					isOpen={openLogin}
					onClose={() => setOpenLogin(false)}>
					<Login />
				</Modals>
			)}
			{openRegister && (
				<Modals
					isOpen={openRegister}
					title='Registro de Nuevo Usuario'
					onClose={() => setOpenRegister(false)}>
					<Registro />
				</Modals>
			)}
		</>
	);
};
