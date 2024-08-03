import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { Whatsapp } from '../components/Whatsapp';
import { Header } from '../components/header/Header';
import '../css/Header.css';

export const Interes = () => {
	const pages = [
		{
			name: 'Poder Judicial de Tucuman',
			img: '/poder judicial tuc1.png',
			link: 'https://www.justucuman.gov.ar/',
		},
		{
			name: 'Colegio de Abogados de Tucuman',
			img: '/colegio abogados.jpeg',
			link: 'https://colegioabogadostuc.org.ar/',
		},
		{
			name: 'Poder Judicial de la Nacion',
			img: '/poder judicial tuc.png',
			link: 'https://www.pjn.gov.ar/',
		},
		{
			name: 'Direccion General de Rentas de Tucuman',
			img: '/rentas.png',
			link: 'https://www.rentastucuman.gob.ar/',
		},
		{
			name: 'Boletin Judicial de Tucuman',
			img: '/edictos.jpeg',
			link: 'https://edictos.justucuman.gov.ar/',
		},
		{
			name: 'Jurisprudencia de la Provincia de Tucuman',
			img: '/jurisprudencia.jpg',
			link: 'https://www.justucuman.gov.ar/jurisprudencia',
		},
	];
	return (
		<>
			<Header />

			<section className='backgroundimage pt-28 flex flex-wrap h-auto items-center justify-center flex-col pb-3'>
				<Whatsapp />
				<h1 className='text-3xl font-bold bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text mb-5'>
					Webs de Interes
				</h1>
				<Container>
					<Row>
						<CardGroup className='flex flex-wrap justify-center'>
							{pages.map((page, index) => (
								<Col key={index} xs={10} md={4} className='mb-3'>
									<Card className='flex flex-col flex-wrap justify-center h-[250px] items-center text-center rounded-xl border-white border-2 bg-background m-2'>
										<Card.Body className='flex flex-col items-center'>
											<Card.Title className='text-xl font-semibold text-white text-center h-[56px]'>
												{page.name}
											</Card.Title>
											<NavLink to={page.link}>
												<Card.Img
													className='w-[250px] h-[145px]'
													variant='top'
													src={page.img}
													width='100px'
													height='100px'
												/>
											</NavLink>
										</Card.Body>
									</Card>
								</Col>
							))}
						</CardGroup>
					</Row>
				</Container>
			</section>
		</>
	);
};
