import { apiURL } from '/api/apiURL.js';

export const getTurnos = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/turnos', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getTurno = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/turnos/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createTurno = async (values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/turnos', values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateTurno = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/turnos/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteTurno = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/turnos/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(async () => {
			await getTurnos();
		}, 100);
	}
};
