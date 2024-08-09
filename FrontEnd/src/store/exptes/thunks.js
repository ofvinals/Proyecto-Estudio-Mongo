import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getExptes = createAsyncThunk(
	'expte/getExptes',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/exptes', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener expedientes',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getExpte = createAsyncThunk(
	'expte/getExpte',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/exptes/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});

			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener expedientes',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createExpte = createAsyncThunk(
	'expte/createExpte',
	async ({values}, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/exptes', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getExptes());
			dispatch(
				showToast({
					type: 'success',
					message: 'Expediente creado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener expedientes',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const updateExpte = createAsyncThunk(
	'expte/updateExpte',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/exptes/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getExptes());
			dispatch(
				showToast({
					type: 'success',
					message: 'Expediente actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener expedientes',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const deleteExpte = createAsyncThunk(
	'expte/deleteExpte',
	async (id, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del expediente',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(`/api/exptes/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch(getExptes());
				dispatch(
					showToast({
						type: 'success',
						message: 'Expediente eliminado exitosamente',
					})
				);
				return res.data;
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener expedientes',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const createMov = createAsyncThunk(
	'expte/createMov',
	async ({ movData, expteId }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.post(
				`/api/exptes/${expteId}/movimientos`,
				movData,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			getExpte(expteId);
			dispatch(
				showToast({
					type: 'success',
					message: 'Movimiento creado exitosamente',
				})
			);
			return response.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener movimientos',
				})
			);
			console.log(error);
		}
	}
);

export const updateMov = createAsyncThunk(
	'expte/updateMov',
	async ({ expteId, rowId, movData }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(
				`/api/exptes/${expteId}/movimientos/${rowId}`,
				movData,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			getExpte(expteId);
			dispatch(
				showToast({
					type: 'success',
					message: 'Movimiento actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener movimientos',
				})
			);
			console.error(error);
		}
	}
);

export const deleteMov = createAsyncThunk(
	'expte/deleteMov',
	async ({ expedienteId, movimientoId }, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion del movimiento?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(
					`/api/exptes/${movimientoId}/movimientos/${expedienteId}`,
					{
						withCredentials: true,
						headers: { authorization: `Bearer ${token}` },
					}
				);
				dispatch(
					showToast({
						type: 'success',
						message: 'Movimiento eliminado exitosamente',
					})
				);
				return res.data;
			}
			dispatch(getExptes());
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener movimientos',
				})
			);
			console.log(error);
		}
	}
);
