import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getTurns = createAsyncThunk(
	'turn/getTurns',
	async (_, { dispatch }) => {
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
	}
);

export const getTurn = createAsyncThunk(
	'turn/getTurn',
	async (id, { dispatch }) => {
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
	}
);

export const createTurn = createAsyncThunk(
	'turn/createTurn',
	async ({ values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			console.log(values);
			const res = await apiURL.post('/api/turnos', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getTurns());
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
	}
);

export const createEvent = createAsyncThunk(
	'turn/createEvent',
	async (values, { dispatch }) => {
		console.log(values);
		try {
			const googleToken = localStorage.getItem('googleToken');
			const response = await fetch(
				'https://www.googleapis.com/calendar/v3/calendars/365fa9c4ffc2a2c85cd2d4c3e28942427e52a6a2a6d92386566dbe9ada6d50fe@group.calendar.google.com/events',
				{
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + googleToken,
					},
					body: JSON.stringify(values),
				}
			);
			console.log(response)
			if (response.ok) {
				dispatch(
					showToast({
						type: 'success',
						message: 'Turno creado exitosamente en Google Calendar',
					})
				);
				const data = await response.json();
				console.log('Respuesta de Google Calendar:', data);
				const turnData = {
					eventId: data.id,
					tipo: data.summary,
					start: data.start.dateTime,
					motivo: data.description,
					creator: data.creator.email,
					eventUrl: data.htmlLink,
				};
				dispatch(createTurn({ values: turnData }));
				return data;
			} else {
				throw new Error('Error al crear el evento en Google Calendar');
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al crear el turno en Google Calendar',
				})
			);
			console.log('Error:', error);
			throw error;
		}
	}
);

export const updateTurn = createAsyncThunk(
	'turn/updateTurn',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/turnos/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getTurns());
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

export const deleteTurn = createAsyncThunk(
	'turn/deleteTurn',
	async (id, { dispatch }) => {
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
				dispatch(getTurns());
				dispatch(
					showToast({
						type: 'success',
						message: 'Turno eliminado exitosamente',
					})
				);
				return res.data;
			}
			dispatch(getTurns());
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
	}
);
