import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getCashs = createAsyncThunk(
	'cash/getCashs',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/cajas', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener cajas',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getCash = createAsyncThunk(
	'cash/getCash',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/cajas/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener caja',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createCash = createAsyncThunk(
	'cash/createCash',
	async (values, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/cajas', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getCashs());
			dispatch(
				showToast({
					type: 'success',
					message: 'Caja creada exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener caja',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const updateCash = createAsyncThunk(
	'cash/updateCash',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/cajas/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getCashs());
			dispatch(
				showToast({
					type: 'success',
					message: 'Caja actualizada exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener caja',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const deleteCash = createAsyncThunk(
	'cash/deleteCash',
	async (id, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion de la caja',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(`/api/cajas/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch(getCashs());
				dispatch(
					showToast({
						type: 'success',
						message: 'Caja eliminada exitosamente',
					})
				);
				return res.data;
			}
			dispatch(getCashs());
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener caja',
				})
			);
			console.log(error);
			throw error;
		}
	}
);
