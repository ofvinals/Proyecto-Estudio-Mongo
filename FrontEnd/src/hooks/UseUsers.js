import { apiURL } from '/api/apiURL.js';

export const getUsers = async () => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get('/api/users', {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/users/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getUserbyGoogle = async (userEmail) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.get(`/api/users/google/${userEmail}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createUser = async (user) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.post(
			'/api/users',
			{ user },
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

export const updateUser = async (id, values) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.put(`/api/users/${id}`, values, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteUser = async (id) => {
	try {
		const token = localStorage.getItem('token');
		const res = await apiURL.delete(`/api/users/${id}`, {
			withCredentials: true,
			headers: { authorization: `Bearer ${token}` },
		});
		if (res.status === 204) console.log(res);
		await getUsers();
	} catch (error) {
		console.log(error);
	} finally {
		// Llama a getUsers independientemente de si hubo éxito o error, con un retardo
		setTimeout(async () => {
			await getUsers();
		}, 100);
	}
};
