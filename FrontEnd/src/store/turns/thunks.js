import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getTurns = createAsyncThunk('turn/getTurns', async (_, { dispatch }) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/turnos', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		dispatch(
			showToast({
				type: 'error',
				message: 'Error al obtener turno',
			})
		);
		console.error(error);
		throw error;
	}
});

export const getTurn = createAsyncThunk('turn/getTurn', async (id, { dispatch }) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/turnos/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		dispatch(
			showToast({
				type: 'error',
				message: 'Error al obtener turno',
			})
		);
		console.error(error);
		throw error;
	}
});

export const createTurn = createAsyncThunk('turn/createTurn', async (turno, { dispatch }) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/turnos', turno, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		getTurns();
		dispatch(
			showToast({
				type: 'success',
				message: 'Turno creado exitosamente',
			})
		);
		return res.data;
	} catch (error) {
		dispatch(
			showToast({
				type: 'error',
				message: 'Error al obtener turno',
			})
		);
		console.log(error);
		throw error;
	}
});

export const updateTurn = createAsyncThunk(
	'turn/updateTurn',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/turnos/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(
				showToast({
					type: 'success',
					message: 'Turno actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener turno',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const deleteTurn = createAsyncThunk('turn/deleteTurn', async (id, { dispatch }) => {
	try {
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: 'Confirmas la eliminacion del turno',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#8f8e8b',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
		});
		if (result.isConfirmed) {
			const token = localStorage.getItem('token');
			const res = await apiURL.delete(`/api/turnos/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(
				showToast({
					type: 'success',
					message: 'Turno eliminado exitosamente',
				})
			);
			return res.data;
		}
	} catch (error) {
		dispatch(
			showToast({
				type: 'error',
				message: 'Error al obtener turno',
			})
		);
		console.log(error);
		throw error;
	}
});
