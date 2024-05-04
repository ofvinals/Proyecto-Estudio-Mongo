import { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { apiURL } from '/api/apiURL.js';
import { auth } from '../firebase/config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getUserbyGoogle } from '../hooks/UseUsers.js';

// crea contexto
const AuthContext = createContext();

// funcion que retorna el contexto del objeto creado por useContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('Error, no se creo el contexto!');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [errors, setErrors] = useState([]);
	const [googleToken, setGoogleToken] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// FUNCION REGISTRO DE USUARIOS
	const registro = async (values) => {
		try {
			const res = await apiURL.post('/api/register', values);
			if (res.status === 200) {
				setCurrentUser(res.data);
				setIsAuthenticated(true);
				return res.data;
			}
		} catch (error) {
			console.log(error.response.data);
			setErrors(error.response.data);
		}
	};

	// FUNCION LOGIN CON CORREO ELECTRONICO
	const login = async (values) => {
		try {
			const res = await apiURL.post('/api/login', values, {
				credentials: 'include',
			});
			localStorage.setItem('token', res.data.accessToken);
			setIsAuthenticated(true);
			setCurrentUser(res.data);
			return res.data;
		} catch (error) {
			console.log(error.response.data);
			setErrors(error.response.data);
			throw error;
		}
	};

	// FUNCION LOGIN CON CUENTA GOOGLE
	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		provider.addScope('https://www.googleapis.com/auth/userinfo.email');
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		provider.addScope('https://www.googleapis.com/auth/calendar.events');

		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const GoogleToken = credential.accessToken;
			const currentUser = result.user.providerData[0];
			const userEmail = currentUser.email;
			const user = await getUserbyGoogle(userEmail);
			if (!user) {
				setIsAuthenticated(false); 
				setGoogleToken(null);
				throw new Error('Usuario no registrado'); 
			}
			localStorage.setItem('token', user.accessToken);
			localStorage.setItem('googleToken', credential.accessToken);
			setCurrentUser(user);
			setGoogleToken(GoogleToken);
			setIsAuthenticated(true);
			return user;
		} catch (error) {
			console.error(error);
			return { error: error.message }
		}
	};
	// FUNCION LOGOUT
	const logout = async () => {
		Cookies.remove('token');
		localStorage.removeItem('token');
		localStorage.removeItem('googleToken');
		setCurrentUser(null);
		setIsAuthenticated(false);
	};

	// Función de autenticacion de usuario logueado
	useEffect(() => {
		async function checkLogin() {
			const token = localStorage.getItem('token');
			if (!token) {
				setIsAuthenticated(false);
				setIsLoading(false);
				return setCurrentUser(null);
			}
			try {
				const token = localStorage.getItem('token');
				const res = await apiURL.get('/api/verify', {
					withCredentials: true,
					headers: {
						authorization: `Bearer ${token}`,
					},
				});
				if (!res.data) {
					setIsAuthenticated(false);
					setIsLoading(false);
					setCurrentUser(null);
					return;
				}
				setIsAuthenticated(true);
				setCurrentUser(res.data);
				setGoogleToken();

				setIsLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setIsLoading(false);
				setCurrentUser(null);
			}
		}
		checkLogin();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				googleToken,
				isAuthenticated,
				registro,
				login,
				loginWithGoogle,
				logout,
				isLoading,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
