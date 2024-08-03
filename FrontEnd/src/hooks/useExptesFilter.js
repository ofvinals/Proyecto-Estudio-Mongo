import { apiURL } from '/api/apiURL.js';

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

		if (fechaParts.length !== 3) {
			console.error(
				`Formato de fecha inesperado para expediente ID ${
					expediente._id
				}: ${
					expediente.movimientos[expediente.movimientos.length - 1].fecha
				}`
			);
			return false;
		}
		const [day, month, year] = fechaParts;
		const fechaFormateada = `${year}-${month.padStart(2, '0')}-${day.padStart(
			2,
			'0'
		)}`;
		const ultimoMovimiento = new Date(fechaFormateada);
		const diferenciaDias = Math.round(
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
