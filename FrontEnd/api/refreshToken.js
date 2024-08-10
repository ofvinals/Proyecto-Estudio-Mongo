import axios from 'axios';
import { refreshGoogleToken } from '../src/store/auth/thunks'; // Importa la función para refrescar el token

// Crear una instancia de Axios
const apiClient = axios.create({
	baseURL: '/api', // Asegúrate de ajustar esto a tu configuración
});

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Intenta refrescar el token
				const refreshToken = localStorage.getItem('refreshToken'); // O de donde lo hayas guardado
				const newAccessToken = await refreshGoogleToken(refreshToken);

				// Guarda el nuevo token de acceso
				localStorage.setItem('googleToken', newAccessToken);

				// Actualiza el token en la configuración de la solicitud original
				apiClient.defaults.headers.common[
					'Authorization'
				] = `Bearer ${newAccessToken}`;
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${newAccessToken}`;

				// Reintenta la solicitud original con el nuevo token
				return apiClient(originalRequest);
			} catch (refreshError) {
				// Maneja el error de refresco de token
				console.error('Error al refrescar el token:', refreshError);
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
