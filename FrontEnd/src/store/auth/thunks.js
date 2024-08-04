import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import { auth } from '../../firebase/config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { showToast } from '../toast/slice';

// FUNCION REGISTRO DE USUARIOS
export const register = createAsyncThunk(
	'user/register',
	async (values, { rejectWithValue, dispatch }) => {
		try {
			const res = await apiURL.post('/api/register', values);
			localStorage.setItem('token', res.data.accessToken);
			dispatch(
				showToast({
					type: 'success',
					message: 'Usuario registrado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al registrar el usuario',
				})
			);
			console.log(error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

// FUNCION LOGIN CON CORREO ELECTRONICO
export const login = createAsyncThunk(
	'user/login',
	async (values, { rejectWithValue, dispatch }) => {
		try {
			const res = await apiURL.post('/api/login', values, {
				withCredentials: true,
			});
			localStorage.setItem('token', res.data.accessToken);
			dispatch(
				showToast({
					type: 'success',
					message: 'Usuario logueado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al iniciar sesion',
				})
			);
			console.log(error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

// FUNCION LOGIN CON CUENTA GOOGLE
export const loginWithGoogle = createAsyncThunk(
	'user/loginGoogle',
	async (_, { rejectWithValue, dispatch }) => {
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.email');
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const GoogleToken = credential.accessToken;
			const currentUser = result.user.providerData[0];
			const userEmail = currentUser.email;
			// Enviar token de Google al backend para verificar/registrar al usuario
			const res = await apiURL.post('/api/googleLogin', {
				token: GoogleToken,
				email: userEmail,
			});
			localStorage.setItem('token', res.data.accessToken);
			localStorage.setItem('googleToken', GoogleToken);
			dispatch(
				showToast({
					type: 'success',
					message: 'Inicio de sesion con Google exitoso',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al iniciar sesion con Google',
				})
			);
			console.error(error);
			return rejectWithValue(error.message);
		}
	}
);

// FUNCION LOGOUT
export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('googleToken');
			dispatch(
				showToast({
					type: 'success',
					message: 'Sesion cerrada exitosamente',
				})
			);
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al cerrar sesion',
				})
			);
			console.error('Error al cerrar sesión:', error);
			return rejectWithValue(error.message);
		}
	}
);

// FUNCION VERIFICAR USUARIO LOGUEADO
export const verifyLoggedUser = createAsyncThunk(
	'user/verifyLoggedUser',
	async (_, { rejectWithValue, dispatch }) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(
				showToast({
					type: 'error',
					message: 'No tienes token de usuario. Ingresa nuevamente',
				})
			);
			return rejectWithValue('No token found');
		}
		try {
			const res = await apiURL.get('/api/verifyToken', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.status === 200) {
				dispatch(
					showToast({
						type: 'success',
						message: 'Token Verificado correctamente',
					})
				);
				return res.data;
			} else {
				console.log('Verification failed with status:', res.status);
				return rejectWithValue(res.data);
			}
		} catch (error) {
			console.log('Error en la verificación del token:', error);
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al verificar token de usuario',
				})
			);
			return rejectWithValue(error.response?.data || 'Server error');
		}
	}
);
