import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className='pt-5 bg-[#222a37]'>
			<div className='container text-center'>
				<div className='row'>
					<ul className='col-6 col-md-4 nav justify-center items-center my-1'>
						<li className='text-center font-bold text-white text-base nav-item '>
							<Link
								to='/home'
								className='nav-link link text-center font-bold text-white text-base'>
								Home
							</Link>
						</li>
						<li className='text-center font-bold text-white text-base nav-item '>
							<Link
								to='/nosotros'
								className='nav-link link text-center font-bold text-white text-base'>
								Nosotros
							</Link>
						</li>
						<li className='nav-link link text-center font-bold text-white text-base'>
							<Link
								to='/contact'
								className='nav-link link text-center font-bold text-white text-base'>
								Contacto
							</Link>
						</li>
					</ul>

					<div className='social-item col-6 col-md-4 d-flex flex-wrap align-items-center justify-content-around my-1'>
						<Link
							className='link text-white text-2xl m-3 text-center'
							to='https://www.facebook.com/estudiopossetucuman?mibextid=ZbWKwL'
							target='_blank'>
							<i className='bi bi-facebook'></i>
						</Link>
						<Link
							className='link text-white text-2xl  m-3 text-center'
							to='https://www.instagram.com/estudioposseasociados?igsh=bmYzN3VybGdlZGgw'
							target='_blank'>
							<i className='bi bi-instagram'></i>
						</Link>
						<Link
							className='link text-white text-2xl  m-3 text-center'
							to='http://www.twitter.com'
							target='_blank'>
							<i className='bi bi-twitter-x'></i>
						</Link>
					</div>

					<div className='col-12 col-md-4 text-center items-center justify-center'>
						<Link
							className=' text-center items-center justify-center flex'
							to='/home'>
							<img
								className='mt-5 justify-center  '
								src='/logo estudio.png'
								width={100}
								alt='logoestudio'
							/>
						</Link>
						<p className='text-center text-[10px] text-white mt-3'>
							© 2024 Todos los Derechos Reservados - Estudio Juridico
							Posse & Asoc.
						</p>
						<p className='text-center text-[10px] text-white mt-3'>
							Diseño y Desarrollo: Oscar Frias Viñals
						</p>
						`
					</div>
				</div>
			</div>
		</footer>
	);
};
