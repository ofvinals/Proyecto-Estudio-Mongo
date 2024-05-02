import { apiURL } from '/api/apiURL.js';

export const getNotas = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/notas', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createNota = async (values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/notas', values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateNota = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/notas/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteNota = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/notas/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(async () => {
			await getNotas();
		}, 100);
	}
};
