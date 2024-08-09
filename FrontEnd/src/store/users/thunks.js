import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getUsers = createAsyncThunk(
	'user/getUsers',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/users', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener usuarios',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getUser = createAsyncThunk(
	'user/getUser',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/users/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener usuario',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getUserbyGoogle = createAsyncThunk(
	'user/getUserbyGoogle',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/users/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener usuario',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createUser = createAsyncThunk(
	'user/createUser',
	async ({ values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/users', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getUsers());
			dispatch(
				showToast({
					type: 'success',
					message: 'Usuario creado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al actualizar el usuario',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/users/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getUsers());
			dispatch(
				showToast({
					type: 'success',
					message: 'Usuario actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Usuarios obtenidos exitosamente',
				})
			);
			console.error('Error:', error);
			throw error;
		}
	}
);

export const deleteUser = createAsyncThunk(
	'user/deleteUser',
	async (id, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del usuario',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(`/api/users/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch(getUsers());
				dispatch(
					showToast({
						type: 'success',
						message: 'Usuario eliminado exitosamente',
					})
				);
				return res.data;
			}
			dispatch(getUsers());
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al eliminar el usuario',
				})
			);
			console.error('Error al eliminar el usuario:', error);
			throw error;
		}
	}
);
