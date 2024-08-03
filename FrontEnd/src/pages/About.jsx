import Card from 'react-bootstrap/Card';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/header/Header';

import '../css/Header.css';

export const Nosotros = () => {
	return (
		<>
			<Header />
			<div className='flex flex-wrap justify-center flex-col backgroundimage pt-28'>
				<Whatsapp />
				<h1 className=' text-3xl my-3 font-bold  bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-center'>
					Sobre Nosotros
				</h1>
				<h2 className='text-2xl text-white text-center font-semibold my-3'>
					Historia
				</h2>

				<p className='lh-lg font-semibold text-white text-justify sm:mx-14 my-6 py-3 px-10 '>
					Los orígenes del Estudio Posse se remontan al año 1949, en San
					Miguel de Tucumán, cuando los hermanos Daniel Oscar y Eduardo
					Posse, en busca de cumplir su anhelo de justicia, decidieron
					abrir su propio estudio jurídico.- <br /> Su actual integración
					como Posse & Asociados nos retrotrae al año 1990, en donde la
					segunda generación de abogados, conformada por los hermanos
					Daniel Oscar Posse (h) y Jorge Esteban Posse, y su entrañable
					amiga y compañera, Silvia M. Meneghello, se hicieron cargo del
					estudio, continuando con el legado ético y jurídico de sus
					fundadores, consolidando su perfil profesional, e incorporando
					una amplia y heterogénea red de clientes. Todo esto llevó a
					posicionarlo como uno de los estudios jurídicos más importantes
					de la provincia.- <br /> En la actualidad, la firma es dirigida
					por la tercera generación de letrados. Un staff de reconocidos
					abogados preparados para brindar el mejor asesoramiento
					especializado e integral, acompañados por un talentoso grupo de
					paralegales, pasantes y personal administrativo. Con más de 70
					años de experiencia, el crecimiento y la vigencia de Posse &
					Asociados son frutos de la dedicación, el esfuerzo y la correcta
					aplicación del derecho. Honestidad, lealtad, compromiso y
					confidencialidad son las bases sobre las que se asienta nuestro
					equipo de trabajo.-
				</p>
			</div>
			<div className='flex row row-cols-12 justify-center p-3'>
				<Card.Body className='mt-10 mx-10 py-2 max-w-[800px] bg-background text-white border-white rounded-xl'>
					<Card.Title className=' py-3 text-white text-center text-2xl'>
						Mision
					</Card.Title>
					<Card.Text className='mx-5 pb-3 text-white text-center'>
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
					<Card.Text className='mx-5 pb-3 text-white text-center'>
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
					<Card.Text className='mx-5 pb-3 text-white text-center'>
						Los valores son esenciales en cualquier organización. Es por
						ello que ratificamos nuestro compromiso con el cumplimiento de
						la legislación vigente, y con el mandato de las reglas éticas
						y morales. Todo ello aplicando las mejores prácticas locales e
						internacionales.-
					</Card.Text>
				</Card.Body>
			</div>
		</>
	);
};
