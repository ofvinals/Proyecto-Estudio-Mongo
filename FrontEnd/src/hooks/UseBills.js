import { apiURL } from '/api/apiURL.js';

export const getGastos = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/gastos', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getGasto = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/gastos/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createGasto = async (values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/gastos', values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error('Error en la solicitud:', error);
		console.log('Datos de la respuesta:', error.response.data);
	}
};

export const updateGasto = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/gastos/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteGasto = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/gastos/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(async () => {
			await getGastos();
		}, 100);
	}
};
