import Card from 'react-bootstrap/Card';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/Header';

import '../css/Nosotros.css';

export const Nosotros = () => {
	return (
		<>
			<Header />
			<div className='container-lg flex flex-wrap justify-center flex-col about pt-24'>
				<Whatsapp />
				<h1 className=' text-3xl my-3 font-bold  bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-center'>
					Sobre Nosotros
				</h1>
				<h2 className='text-2xl text-white text-center font-semibold my-3'>
					Historia
				</h2>

				<p className='lh-lg font-semibold text-white text-justify mx-14 my-6 py-3 px-8 '>
					Fundado en ..... por ....., desde entonces nos hemos consolidado
					como un destacado estudio jurídico en Tucumán y todo el Noroeste
					Argentino. Con más de 35 años de experiencia y una trayectoria
					sólida, nos hemos dedicado a brindar servicios legales de calidad
					y a establecer relaciones solidas y duraderas con nuestros
					clientes.- <br /> Nuestro compromiso es brindar un servicio legal
					confiable, ético y orientado a obtener resultados positivos.
					Basados en la excelencia, la integridad y la atención
					personalizada. Trabajamos en estrecha colaboración con nuestros
					clientes, comprendiendo sus necesidades y objetivos legales, para
					ofrecerles un asesoramiento integral y adaptado a cada situación.
				</p>
			</div>
			<div className='flex row row-cols-12 justify-center p-3'>
				<Card.Body className='mt-10 mx-10 py-2 max-w-[800px] bg-background text-white border-white rounded-xl'>
					<Card.Title className=' py-3 text-white text-center text-2xl'>
						Mision
					</Card.Title>
					<Card.Text className='contcard text-white text-center'>
						Nuestra mision consiste en diagnosticar y evaluar
						correctamente los problemas, conflictos y consultas de
						nuestros clientes, alineando las alternativas de solución con
						la defensa de sus intereses. Nuestro foco está orientado a
						encontrar y lograr la solución más eficiente a cada uno de los
						desafíos planteados. Todo ello se logra con especialización,
						alta responsabilidad profesional y trabajo en equipo, dentro
						de la ley y cumpliendo con las reglas impuestas por la moral,
						las buenas costumbres y las mejores prácticas.-
					</Card.Text>
				</Card.Body>

				<Card.Body className=' mt-10 mx-10 py-2 max-w-[800px] bg-background border-white rounded-xl'>
					<Card.Title className=' py-3 text-white text-center text-2xl'>
						Vision
					</Card.Title>
					<Card.Text className='contcard text-white text-center'>
						Nuestra visión se basa en el liderazgo respaldado por la
						profesionalidad, el más estricto y cuidadoso análisis del
						marco regulatorio, y la más calificada doctrina a la que
						contribuimos con nuestra opinión legal. Nuestro asesoramiento
						es y debe tomar como objetivo central prevenir conflictos,
						minimizar contingencias, y resolver problemas complejos
						planteados por nuestros Clientes.-
					</Card.Text>
				</Card.Body>

				<Card.Body className=' mt-10 mx-10 py-2 max-w-[800px] bg-background border-white rounded-xl'>
					<Card.Title className='py-3 text-white text-center text-2xl'>
						Valores
					</Card.Title>
					<Card.Text className='contcard text-white text-center'>
						Los valores son esenciales en cualquier organización. Es por
						ello que ratificamos nuestro compromiso con el cumplimiento de
						la legislación vigente, y con el mandato de las reglas éticas
						y morales. Todo ello aplicando las mejores prácticas locales e
						internacionales.-
					</Card.Text>
				</Card.Body>
			</div>

			<div className='team'>
				<h1 className='text-black w-full text-3xl font-bold text-center py-3'>
					Nuestro Equipo
				</h1>

				<div className='col-md-4 col-sm-6 cardnosotros bg-background'>
					<div className='our-team'>
						<div className='team-image'>
							<img src='' />
							<p className='description'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Praesent urna diam, maximus ut ullamcorper quis
							</p>
						</div>
						<div className='team-info'>
							<h3 className='titlenosotros'>Oscar Frias Viñals</h3>
							<span className='post'>Abogado</span>
						</div>
					</div>
				</div>

				<div className='col-md-4 col-sm-6 cardnosotros bg-background'>
					<div className='our-team'>
						<div className='team-image'>
							<img src='' />
							<p className='description'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Praesent urna diam, maximus ut ullamcorper quis
							</p>
						</div>
						<div className='team-info'>
							<h3 className='titlenosotros'>Jorge Posse Ponessa (h)</h3>
							<span className='post'>Abogado</span>
						</div>
					</div>
				</div>

				<div className='col-md-4 col-sm-6 cardnosotros bg-background'>
					<div className='our-team'>
						<div className='team-image'>
							<img src='' />
							<p className='description'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Praesent urna diam, maximus ut ull
							</p>
						</div>

						<div className='team-info'>
							<h3 className='titlenosotros'>M. Soledad Lizarraga</h3>
							<span className='post'>Abogado Junior</span>
						</div>
					</div>
				</div>
				<div className='col-md-4 col-sm-6 cardnosotros bg-background'>
					<div className='our-team'>
						<div className='team-image'>
							<img src='' />
							<p className='description'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Praesent urna diam, maximus ut ull
							</p>
						</div>

						<div className='team-info'>
							<h3 className='titlenosotros'>Martin A. Soto </h3>
							<span className='post'>Abogado Junior</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
