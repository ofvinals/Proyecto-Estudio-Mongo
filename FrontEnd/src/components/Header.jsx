import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/Header.css';
import Swal from 'sweetalert2';

export const Header = () => {
	const [expand, setExpand] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const user = currentUser ? currentUser.email : null;
	const admin = currentUser ? currentUser.admin : null;

	const handleNavCollapseToggle = () => {
		setExpand(true);
	};

	const handleNavCollapse = () => {
		setExpand(false);
	};

	const handleLogOut = async () => {
		await logout();
		Swal.fire({
			icon: 'success',
			title: 'Su sesion fue cerrada!',
			showConfirmButton: false,
			timer: 1500,
		});
		navigate('/home');
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const navbarClassName = scrolled
		? 'w-full bg-background sticky-top navbar text-black'
		: 'w-full bg-transparent sticky-top navbar';

	return (
		<>
			<Navbar
				data-bs-theme='dark'
				expand='lg'
				id='navbar'
				className={navbarClassName}>
				<Container className='flex flex-row justify-between'>
					<Navbar.Brand href='/home'>
						<img
							className='ms-3'
							src='/logo estudio.png'
							width={60}
							alt='logoestudio'
						/>
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-lg`}
						onClick={handleNavCollapseToggle}
					/>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-lg`}
						show={expand}
						onHide={() => setExpand(false)}
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement='end'>
						<Offcanvas.Header closeButton></Offcanvas.Header>
						<Offcanvas.Body className='flex flex-row justify-start lg:justify-end items-start'>
							<Nav className='flex flex-col flex-wrap items-center md:items-start justify-center'>
								<Link
									className='p-3 text-wrap hover:underline hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
									to='/especialidad'
									onClick={handleNavCollapse}>
									<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-server'></i>
									Servicios
								</Link>
								<Link
									className='p-3 text-wrap hover:underline hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
									to='/nosotros'
									onClick={handleNavCollapse}>
									<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-file-person-fill'></i>
									Quienes Somos
								</Link>
								<Link
									className='p-3 text-wrap  hover:underline hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
									to='/contact'
									onClick={handleNavCollapse}>
									<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-chat-square-text-fill'></i>
									Contacto
								</Link>
								<Link
									className='p-3 text-wrap hover:underline hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
									to='/interes'
									onClick={handleNavCollapse}>
									<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-browser-safari'></i>
									Sitios de interes
								</Link>
								{user ? (
									<Link
										className='p-3 text-wrap hover:underline  hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
										to='/adminusu'
										onClick={handleNavCollapse}>
										<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-person-fill-check'></i>
										Panel de Usuarios
									</Link>
								) : null}
								{admin ? (
									<Link
										className='p-3 text-wrap hover:underline hover:decoration-2 lg:text-center hover:decoration-blue-600 hover:underline-offset-8'
										to='/admin'
										onClick={handleNavCollapse}>
										<i className='pr-2 text-xl text-[#185574] lg:hidden bi bi-person-fill-gear'></i>
										Panel de Administracion
									</Link>
								) : null}
								<div className='flex flex-wrap items-center justify-center'>
									{user ? (
										<button
											onClick={() => {
												handleNavCollapse();
												handleLogOut();
											}}
											className='mx-3 lg:m-0 btnlogin md:mb-2 lg:mb-0 w-[162px] bg-transparent border-2 border-white p-2 lg:mr-3 rounded-lg'>
											<i className='pr-2 text-xl bi bi-box-arrow-left'></i>
											Cerrar Sesión
										</button>
									) : (
										<Link
											to='/login'
											onClick={handleNavCollapse}
											className='m-3 lg:m-0 btnlogin md:mb-2 lg:mb-0 w-[142px] bg-transparent border-2 border-[#185574] p-2 lg:mr-3 rounded-lg'>
											<i className='pr-2 text-xl bi bi-box-arrow-in-right'></i>
											Iniciar Sesión
										</Link>
									)}
									<Link
										to='/registro'
										className={`btnreg md:mb-1 bg-[#185574] w-[142px] text-white border-2 border-[#185574] p-2 rounded-lg  ${
											user ? 'hidden' : ''
										}`}
										onClick={() => {
											handleNavCollapse();
										}}>
										<i className='btnreg pr-2 text-xl bi bi-r-circle-fill '></i>
										Registrarme
									</Link>
								</div>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
};
