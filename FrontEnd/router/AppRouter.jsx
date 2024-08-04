import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Footer } from '../src/components/Footer';
import { Nosotros } from '../src/pages/About';
import { Contact } from '../src/pages/Contact';
import { Services } from '../src/pages/Services';
import { Home } from '../src/pages/Home';
import { Interes } from '../src/pages/Interes';

import PrivateRoute from './PrivateRoute';

import { DashboardUser } from '../src/pages/DashboardUser';
import { DashboardAdmin } from '../src/pages/DashboardAdmin';
import { GestionUsers } from '../src/pages/gestion/GestionUsers';
import { GestionExpedientes } from '../src/pages/gestion/GestionExpedientes';
import { GestionAgenda } from '../src/pages/gestion/GestionAgenda';
import { GestionBills } from '../src/pages/gestion/GestionBills';
import { GestionMovimientos } from '../src/pages/gestion/GestionMovimientos';
import { GestionCash } from '../src/pages/gestion/GestionCash';
import { UserAgenda } from '../src/pages/gestion/UserAgenda';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<GoogleOAuthProvider clientId='1050424447842-ekhv37d2lp8shcg8imrsbik8rrrerqh7.apps.googleusercontent.com'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/home' element={<Home />}></Route>
					<Route path='/nosotros' element={<Nosotros />}></Route>
					<Route path='/contact' element={<Contact />}></Route>
					<Route path='/services' element={<Services />}></Route>
					<Route path='/interes' element={<Interes />}></Route>
					<Route element={<PrivateRoute />}>
						<Route path='/gestioncaja' element={<GestionCash />}></Route>
						<Route
							path='/gestionmovimientos/:id'
							element={<GestionMovimientos />}></Route>
						<Route
							path='/gestiongastos'
							element={<GestionBills />}></Route>
						<Route path='/adminusu' element={<DashboardUser />}></Route>
						<Route
							path='/gestionusuarios'
							element={<GestionUsers />}></Route>
						<Route
							path='/gestionexpedientes'
							element={<GestionExpedientes />}></Route>
						<Route
							path='/gestionagenda'
							element={<GestionAgenda />}></Route>
						<Route path='/admin' element={<DashboardAdmin />}></Route>
						<Route path='/agendausu' element={<UserAgenda />}></Route>
					</Route>
				</Routes>
				<Footer />
			</GoogleOAuthProvider>
		</BrowserRouter>
	);
};
