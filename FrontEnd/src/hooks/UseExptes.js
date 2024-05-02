import { apiURL } from '/api/apiURL.js';

export const getExptes = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/exptes', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getExpte = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/exptes/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createExpte = async (values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post('/api/exptes', values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateExpte = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/exptes/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteExpte = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/exptes/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(async () => {
			await getExptes();
		}, 100);
	}
};

export const createMov = async (movData, expteId) => {
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
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateMov = async (expteId, rowId, movData ) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/exptes/${expteId}/movimientos/${rowId}`, movData, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteMov = async (expedienteId, movimientoId) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(
			`/api/exptes/${movimientoId}/movimientos/${expedienteId}`,
			{
				withCredentials: true,
				headers: { authorization: `Bearer ${token}` },
			}
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const calcularDiasTranscurridos = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const expediente = await apiURL.get(`/api/exptes/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		if (expediente.data.movimientos.length === 0) {
			return null;
		}
		// Obtén el último movimiento del expediente
		const ultimoMovimiento =
			expediente.data.movimientos[expediente.data.movimientos.length - 1];
		// Convierte la fecha del último movimiento a objeto Date
		const fechaParts = ultimoMovimiento.fecha.split('/');
		const year = fechaParts[2];
		const month = fechaParts[1].padStart(2, '0');
		const day = fechaParts[0].padStart(2, '0');
		const fechaFormateada = `${year}-${month}-${day}`;

		const fechaUltimoMovimiento = new Date(fechaFormateada);
		// Calcula la diferencia en milisegundos entre la fecha actual y la fecha del último movimiento
		const diferenciaTiempoMs = Date.now() - fechaUltimoMovimiento.getTime();

		// Convierte la diferencia de tiempo de milisegundos a días
		const diasTranscurridos = Math.floor(
			diferenciaTiempoMs / (1000 * 60 * 60 * 24)
		);
		return diasTranscurridos;
	} catch (error) {
		console.error('Error al calcular los días transcurridos:', error);
		throw error;
	}
};

export const filterExpedientes = (expedientes) => {
	const today = new Date();
	return expedientes.filter((expediente) => {
		if (expediente.movimientos.length === 0) {
			return true; 
		}
		const fechaParts =
			expediente.movimientos[expediente.movimientos.length - 1].fecha.split(
				'/'
			);
		const year = fechaParts[2];
		const month = fechaParts[1].padStart(2, '0');
		const day = fechaParts[0].padStart(2, '0');
		const fechaFormateada = `${year}-${month}-${day}`;
		const ultimoMovimiento = new Date(fechaFormateada);
		const diferenciaDias = Math.floor(
			(today - ultimoMovimiento) / (1000 * 60 * 60 * 24)
		);
		return diferenciaDias > 60;
	});
};

export const novedadesExpedientes = (expedientes) => {
	const today = new Date();
	return expedientes.filter((expediente) => {
		if (expediente.movimientos.length === 0) {
			return false; 
		}
		const fechaParts =
			expediente.movimientos[expediente.movimientos.length - 1].fecha.split(
				'/'
			);
		const year = fechaParts[2];
		const month = fechaParts[1].padStart(2, '0');
		const day = fechaParts[0].padStart(2, '0');
		const fechaFormateada = `${year}-${month}-${day}`;
		const ultimoMovimiento = new Date(fechaFormateada);
		// Calcula la diferencia en horas
		const diferenciaHoras = Math.floor(
			(today - ultimoMovimiento) / (1000 * 60 * 60)
		);
		return diferenciaHoras <= 48;
	});
};
