import { apiURL } from '/api/apiURL.js';

export const getCajas = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/cajas', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getCaja = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/cajas/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createCaja = async (values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/cajas', values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateCaja = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/cajas/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteCaja = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/cajas/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	} finally {
		// Llama a getCajas independientemente de si hubo éxito o error, con un retardo
		setTimeout(async () => {
			await getCajas();
		}, 100);
	}
};
