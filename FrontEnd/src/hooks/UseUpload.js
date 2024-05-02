export const uploadFile = async (file) => {
	try {
		const formData = new FormData();
		formData.append('file', file);
		const response = await fetch('http://localhost:4000/api/uploads', {
			method: 'POST',
			body: formData,
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('Error al cargar el archivo');
		}

		const responseData = await response.json();
		const fileLocation = responseData.fileLocation;
		return fileLocation;
	} catch (error) {
		console.error(error);
		throw new Error('Error al cargar el archivo');
	}
};
