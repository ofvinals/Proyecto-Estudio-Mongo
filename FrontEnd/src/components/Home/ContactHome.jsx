import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modals from '../../utils/Modals';
import { Login } from '../header/Login';

export const ContactHome = () => {
	const [openLogin, setOpenLogin] = useState(false);

	const handleLogin = () => {
		setOpenLogin(true);
	};

	return (
		<section className='flex items-center justify-center pt-10'>
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
					<div className='w-full sm:w-6/12 flex flex-col items-center justify-center gap-6 mt-5 sm:mt-0'>
						<div className='conttel flex flex-col text-center items-center max-w-[264px] px-4'>
							<i className='text-[#25b0f0] text-2xl bi bi-telephone-fill mb-3'></i>
							<p className='text-white text-xl sm:text-2xl'>
								+54 381-458 1382
							</p>
						</div>
						<div className='contmail flex flex-col text-center items-center max-w-[264px] px-4'>
							<i className='text-[#25b0f0] text-2xl bi bi-envelope-at-fill mb-1'></i>
							<p className='text-white text-xl sm:text-2xl break-words'>
								estudioposseyasociados @ 
								gmail.com
							</p>
						</div>
						<div className='contdir flex flex-col text-center items-center max-w-[264px] px-4 pt-8'>
							<i className='text-[#25b0f0] text-2xl bi bi-geo-alt-fill mb-3'></i>
							<p className='text-white text-xl sm:text-2xl'>
								9 de Julio 620 Planta Baja C - SMT
							</p>
						</div>
					</div>
					<div className='contbtn '>
						<Button
							className='btnhome text-base p-2 bg-background text-white rounded-lg font-semibold min-w-[222px] max-w-[300px] flex items-center justify-center text-center border-1 border-white hover:border-[#25aff0]'
							onClick={handleLogin}>
							<i className='icosecboton bi bi-calendar-check me-2'></i>
							AGENDA TU CITA ONLINE!
						</Button>
					</div>
				</div>
			</div>
			{openLogin && (
				<Modals
					title='Ingreso a Mi Cuenta'
					isOpen={openLogin}
					onClose={() => setOpenLogin(false)}>
					<Login />
				</Modals>
			)}
		</section>
	);
};
