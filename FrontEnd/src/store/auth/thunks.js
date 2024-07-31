import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import { auth } from '../../firebase/config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getUserbyGoogle } from '../../hooks/UseUsers.js';

// FUNCION REGISTRO DE USUARIOS
export const register = createAsyncThunk(
	'user/register',
	async (values, { rejectWithValue }) => {
		try {
			const res = await apiURL.post('/api/register', values);
			if (res.status === 200) {
				return res.data;
			} else {
				return rejectWithValue(res.data);
			}
		} catch (error) {
			console.log(error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

// FUNCION LOGIN CON CORREO ELECTRONICO
export const login = createAsyncThunk(
	'user/login',
	async (values, { rejectWithValue }) => {
		try {
			const res = await apiURL.post('/api/login', values, {
				withCredentials: true,
			});
			localStorage.setItem('token', res.data.accessToken);
			return res.data;
		} catch (error) {
			console.log(error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

// FUNCION LOGIN CON CUENTA GOOGLE
export const loginWithGoogle = createAsyncThunk(
	'user/loginGoogle',
	async (_, { rejectWithValue }) => {
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
				throw new Error('Usuario no registrado');
			}
			localStorage.setItem('token', user.accessToken);
			localStorage.setItem('googleToken', GoogleToken);
			return user;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.message);
		}
	}
);

// FUNCION LOGOUT
export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('googleToken');
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
			return rejectWithValue(error.message);
		}
	}
);

// FUNCION VERIFICAR USUARIO LOGUEADO
export const verifyLoggedUser = createAsyncThunk(
	'user/verifyLoggedUser',
	async (_, { rejectWithValue }) => {
		const token = localStorage.getItem('token');
		console.log(token);
		if (!token) {
			return rejectWithValue('No token found');
		}

		try {
			const response = await apiURL.get('/api/verifyToken', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			if (response.status === 200) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			console.log('Error en la verificación del token:', error);
			return rejectWithValue(error.response?.data || 'Server error');
		}
	}
);
