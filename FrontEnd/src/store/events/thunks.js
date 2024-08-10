import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';
import moment from 'moment-timezone';

export const getEvents = createAsyncThunk(
	'event/getEvents',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/events', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener evento',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getEvent = createAsyncThunk(
	'event/getEvent',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/events/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener evento',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createEvent = createAsyncThunk(
	'event/createEvent',
	async (values, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/events', values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getEvents());
			dispatch(
				showToast({
					type: 'success',
					message: 'Evento creado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener evento',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const createGoogleEvent = createAsyncThunk(
	'event/createGoogleEvent',
	async (values, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const response = await apiURL.post(
				`/api/events/createGoogleEvent`,
				values,
				{
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				}
			);
			if (response.status === 200) {
				dispatch(
					showToast({
						type: 'success',
						message: 'Evento creado exitosamente en Google Calendar',
					})
				);
				const data = response.data;
				console.log('Respuesta de Google Calendar:', data);
				const eventData = {
					eventId: data.event.id,
					summary: data.event.summary,
					start: moment(data.event.start.dateTime).format(
						'DD-MM-YYYY HH:mm'
					),
					description: data.event.description,
					user: values.user,
					eventUrl: data.event.htmlLink,
				};
				dispatch(createEvent(eventData));
				return data;
			} else {
				throw new Error('Error al crear el evento en Google Calendar');
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al crear el evento en Google Calendar',
				})
			);
			console.log('Error:', error);
			throw error;
		}
	}
);

export const deleteEvent = createAsyncThunk(
	'event/deleteGoogleEvent',
	async ({ eventId, id }, { dispatch }) => {
		console.log(eventId, id);
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminación del evento',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const response = await apiURL.delete(`/api/events/deleteEvent`, {
					params: { eventId, id },
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				if (response.status === 200) {
					dispatch(
						showToast({
							type: 'success',
							message:
								'Evento eliminado exitosamente en Google Calendar',
						})
					);
				}
			} else {
				throw new Error('Error al eliminar el evento en Google Calendar');
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al eliminar el evento',
				})
			);
			console.log('Error:', error);
			throw error;
		}
	}
);

export const updateEvent = createAsyncThunk(
	'event/updateEvent',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/events/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(getEvents());
			dispatch(
				showToast({
					type: 'success',
					message: 'Evento actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener evento',
				})
			);
			console.error(error);
			throw error;
		}
	}
);
