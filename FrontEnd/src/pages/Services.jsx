import { Header } from '../components/Header';
import { Whatsapp } from '../components/Whatsapp';

export const Services = () => {
	return (
		<>
			<Header />
			<section className='bg-gradient-to-tl from-[#1e1e1e] to-[#4077ad] pt-28 flex flex-wrap h-auto items-center justify-center flex-col pb-10'>
				<Whatsapp />
				<h2 className='text-center bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-3xl font-bold mt-5 pb-10'>
					Servicios
				</h2>

				<div className='flex flex-col sm:flex-row'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0003.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12 h-[400px] px-10 flex items-center justify-center flex-col text-center bg-white text-background'>
						<h3 className='font-bold text-3xl mb-4'>Derecho Civil</h3>
						<p className='font-semibold'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consectetur quibusdam error impedit expedita delectus
							perferendis ab reiciendis officia, nisi vero id voluptas!
							Dignissimos dolores, dolor nobis ipsam ex optio delectus.
						</p>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row-reverse'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0005.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12 h-[400px] px-10 flex items-center justify-center flex-col text-center bg-background text-white'>
						<h3 className='font-bold text-3xl mb-4'>Derecho Laboral</h3>
						<p className='font-semibold'>
							Contamos con la idoneidad y experiencia para asesorar a
							trabajadores que han sufrido despidos sin justa causa,
							despido indirecto, despido discriminatorio o han sido
							víctimas de violencia laboral, mobbing o acoso laboral.- Te
							representamos en litigios por enfermedades profesionales o
							accidentes laborales.-
						</p>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0004.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12  h-[400px] px-10 flex items-center justify-center flex-col text-center bg-white text-background'>
						<h3 className='font-bold text-3xl mb-4'>Derecho Sucesorio</h3>
						<p className='font-semibold'>
							Gestión integral en procesos de sucesión de bienes,
							agilidad en declaratorias de herederos.- Anticipación
							mediante planificación sucesoria, testamentos y
							fideicomisos
						</p>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row-reverse'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0007.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12 px-10  h-[400px] flex items-center justify-center flex-col text-center text-white bg-background'>
						<h3 className='font-bold text-3xl mb-4'>Derecho Concursal</h3>
						<p className='font-semibold'>
							Asesoramiento integral de acuerdo a la ley de concurso y
							quiebras procesos preventivos buscando la optimización de
							costos para nuestro cliente.-
						</p>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0008.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12 px-10 h-[400px] flex items-center justify-center flex-col text-center bg-white text-background'>
						<h3 className='font-bold text-3xl mb-4'>
							Derecho Societario
						</h3>
						<p className='font-semibold'>
							Asesoramiento sobre el procedimiento para constituir una
							sociedad, nuestros abogados cuentan con experiencia en
							constitución de distintos tipos de sociedades, estatutos,
							resolvemos conflictos societarios.-
						</p>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row-reverse'>
					<div className='h-[400px] sm:w-6/12'>
						<img
							src='/IMG-20240504-WA0005.jpg'
							alt=''
							className='h-[400px] w-full'
						/>
					</div>
					<div className='sm:w-6/12 px-10 h-[400px] flex items-center justify-center flex-col text-center text-white bg-background'>
						<h3 className='font-bold text-3xl mb-4'>Derecho Comercial</h3>
						<p className='font-semibold'>
							Confeccionamos contratos de alquiler, compraventa,
							arrendamientos, entre otros.- También realizamos
							escrituración de propiedades y asesoramiento en todo el
							marco legal de operaciones inmobiliarias. Estudio de
							titulos.-
						</p>
					</div>
				</div>
			</section>
		</>
	);
};
