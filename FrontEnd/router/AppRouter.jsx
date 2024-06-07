import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Login } from '../src/pages/Login';
import { Footer } from '../src/components/Footer';
import { Nosotros } from '../src/pages/About';
import { Contact } from '../src/pages/Contact';
import { Registro } from '../src/pages/Registro';
import { Services } from '../src/pages/Services';
import { Home } from '../src/pages/Home';
import { Interes } from '../src/pages/Interes';

import { AuthProvider } from '../src/context/AuthContext';
import PrivateRoute from './PrivateRoute';

import { Admin } from '../src/pages/Admin';
import { AdminUsu } from '../src/pages/AdminUsu';
import { GestionUsuarios } from '../src/pages/gestion/GestionUsuarios';
import { GestionExpedientes } from '../src/pages/gestion/GestionExpedientes';
import { GestionAgenda } from '../src/pages/gestion/GestionAgenda';
import { GestionGastos } from '../src/pages/gestion/GestionGastos';
import { GestionMovimientos } from '../src/pages/gestion/GestionMovimientos';
import { GestionCaja } from '../src/pages/gestion/GestionCaja';
import { GestionCaducidad } from '../src/pages/gestion/GestionCaducidad';

import { AgendaUsu } from '../src/pages/gestion/AgendaUsu';

import { ExptesArchivados } from '../src/pages/archive/ExptesArchivados';
import { GastosArchivados } from '../src/pages/archive/GastosArchivados';
import { CajasArchivadas } from '../src/pages/archive/CajasArchivadas';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<GoogleOAuthProvider clientId='1050424447842-ekhv37d2lp8shcg8imrsbik8rrrerqh7.apps.googleusercontent.com'>
				<AuthProvider>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/home' element={<Home />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/registro' element={<Registro />}></Route>
						<Route path='/nosotros' element={<Nosotros />}></Route>
						<Route path='/contact' element={<Contact />}></Route>
						<Route
							path='/services'
							element={<Services />}></Route>
						<Route path='/interes' element={<Interes />}></Route>
						<Route element={<PrivateRoute />}>
							<Route
								path='/gestioncaja'
								element={<GestionCaja />}></Route>
							<Route
								path='/exptesarchivados'
								element={<ExptesArchivados />}></Route>
							<Route
								path='/cajasarchivadas'
								element={<CajasArchivadas />}></Route>

							<Route
								path='/gastosarchivados'
								element={<GastosArchivados />}></Route>
							<Route
								path='/gestionmovimientos/:id'
								element={<GestionMovimientos />}></Route>
							<Route
								path='/gestiongastos'
								element={<GestionGastos />}></Route>
							<Route path='/admin' element={<Admin />}></Route>
							<Route
								path='/gestionusuarios'
								element={<GestionUsuarios />}></Route>
							<Route
								path='/gestionexpedientes'
								element={<GestionExpedientes />}></Route>
							<Route
								path='/gestionagenda'
								element={<GestionAgenda />}></Route>
								<Route
								path='/gestioncaducidad'
								element={<GestionCaducidad />}></Route>
							<Route
								path='/gestiongastos'
								element={<GestionGastos />}></Route>
							<Route path='/adminusu' element={<AdminUsu />}></Route>
							<Route path='/agendausu' element={<AgendaUsu />}></Route>
						</Route>
					</Routes>
					<Footer />
				</AuthProvider>
			</GoogleOAuthProvider>
		</BrowserRouter>
	);
};
