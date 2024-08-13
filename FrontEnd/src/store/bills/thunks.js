import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getBills = createAsyncThunk(
	'bill/getBills',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/gastos', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener gastos',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getBill = createAsyncThunk(
	'bill/getBill',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/gastos/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener gasto',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createBill = createAsyncThunk(
	'bill/createBill',
	async ({ values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/gastos', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getBills());
			dispatch(
				showToast({
					type: 'success',
					message: 'Gasto creado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener gasto',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const updateBill = createAsyncThunk(
	'bill/updateBill',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/gastos/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getBills());
			dispatch(
				showToast({
					type: 'success',
					message: 'Gasto actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener gasto',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const deleteBill = createAsyncThunk(
	'bill/deleteBill',
	async (id, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del gasto',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(`/api/gastos/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch(getBills());
				dispatch(
					showToast({
						type: 'success',
						message: 'Gasto eliminado exitosamente',
					})
				);
				return res.data;
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener gasto',
				})
			);
			console.log(error);
			throw error;
		}
	}
);
