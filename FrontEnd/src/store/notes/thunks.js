import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '/api/apiURL.js';
import Swal from 'sweetalert2';
import { showToast } from '../toast/slice';

export const getNotes = createAsyncThunk(
	'note/getNotes',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get('/api/notas', {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener nota',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const getNote = createAsyncThunk(
	'note/getNote',
	async (id, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.get(`/api/notas/${id}`, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener nota',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const createNote = createAsyncThunk(
	'note/createNote',
	async (note, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.post('/api/notas', note, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			getNotes();
			dispatch(
				showToast({
					type: 'success',
					message: 'Nota creado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener nota',
				})
			);
			console.log(error);
			throw error;
		}
	}
);

export const updateNote = createAsyncThunk(
	'note/updateNote',
	async ({ id, values }, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const res = await apiURL.put(`/api/notas/${id}`, values, {
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			});
			dispatch(
				showToast({
					type: 'success',
					message: 'Nota actualizado exitosamente',
				})
			);
			return res.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener nota',
				})
			);
			console.error(error);
			throw error;
		}
	}
);

export const deleteNote = createAsyncThunk(
	'note/deleteNote',
	async (id, { dispatch }) => {
		try {
			const result = await Swal.fire({
				title: '¿Estás seguro?',
				text: 'Confirmas la eliminacion de la nota',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#8f8e8b',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'Cancelar',
			});
			if (result.isConfirmed) {
				const token = localStorage.getItem('token');
				const res = await apiURL.delete(`/api/notas/${id}`, {
					withCredentials: true,
					headers: { authorization: `Bearer ${token}` },
				});
				dispatch(
					showToast({
						type: 'success',
						message: 'Nota eliminada exitosamente',
					})
				);
				return res.data;
			}
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener nota',
				})
			);
			console.log(error);
			throw error;
		}
	}
);
