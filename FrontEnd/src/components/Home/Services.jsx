import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export const Services = () => {

   return (
		<section>
			<h2 className='text-black text-center text-4xl font-bold mb-5'>Somos expertos brindando <span className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text'>  asesoria juridica de excelencia</span> </h2>
			<Container>
				<Row>
					<CardGroup className='flex flex-wrap flex-row justify-around items-center'>
						<Col xs={10} sm={6} md={4} className='flex justify-center'>
							<Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-file-contract'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Civil
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className=' text-center'>
											<li className='pb-2'>Contratos</li>
											<li className='pb-2'>Prescripcion Adquisitiva</li>
											<li className='pb-2'>Accidentes de transito</li>
											<li>Daños y perjuicios</li>
										</ul>
									</div>
								</div>
								<Link className='text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services '>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>

						<Col xs={10} sm={6} md={4} className='flex justify-center'>
							<Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-person-digging'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Laboral
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className='ps-4 text-start'>
											<li className='pb-2'>Despidos</li>
											<li className='pb-2'>Accidentes laborales</li>
											<li>Acoso laboral y mobbing</li>
										</ul>
									</div>
								</div>
								<Link className=' text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services '>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>

						<Col xs={10} sm={6} md={4} className='flex justify-center'>
                  <Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-stamp'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Sucesorio
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className='ps-1 text-start'>
											<li className='pb-2'>Declaratoria de herederos</li>
											<li className='pb-2'>Adjudicacion de bienes</li>
											<li>Recupero de herencia</li>
										</ul>
									</div>
								</div>
								<Link className=' text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services '>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>

						<Col xs={10} sm={6} md={4} className='flex justify-center'>
                  <Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-landmark'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Comercial
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className=' ps-1 text-start'>
											<li className='pb-2'>Ejecucion de deudas</li>
											<li className='pb-2'>Incumplimiento contractual</li>
											<li className='pb-2'>Desalojo</li>
											<li>Confeccion de contratos</li>
										</ul>
									</div>
								</div>
								<Link className=' text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services'>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>

						<Col xs={10} sm={6} md={4} className='flex justify-center'>
                  <Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-briefcase'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Societario
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className='ps-1 text-start'>
											<li className='pb-2'>Constitucion de sociedades</li>
											<li className='pb-2'>Conflictos societarios</li>
											<li>Liquidacion y disolucion</li>
										</ul>
									</div>
								</div>
								<Link className=' text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services '>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>

						<Col xs={10} sm={6} md={4} className='flex justify-center'>
                  <Card className='cardbody d-flex flex-col flex-nowrap justify-center w-[210px] h-[350px] items-center text-center text-white bg-[#185574] m-3 transform transition duration-300 hover:scale-105'>
								<div className='h-full'>
									<i className='text-3xl mt-7 fa-solid fa-scale-balanced'></i>
									<Card.Title className='text-xl font-semibold text-white text-center m-2'>
										Derecho Concursal
									</Card.Title>
									<div className='text-base m-1 font-normal p-3 '>
										<ul className='ps-1 text-start'>
											<li className='pb-2'>Acuerdos preventivos</li>
											<li className='pb-2'>Verificacion de creditos</li>
											<li>Salvataje de empresas</li>
										</ul>
									</div>
								</div>
								<Link className=' text-[#25b0f0] pb-3 font-bold hover:text-white' to='/services '>
									Saber mas<i className="ps-2 fa-solid fa-arrow-right-long"></i>
								</Link>
							</Card>
						</Col>
					</CardGroup>
				</Row>
			</Container>
		</section>
   )
};
