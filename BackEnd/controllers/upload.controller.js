const multer = require('multer');
const { join } = require('path');

const storage = multer.diskStorage({
	destination: join(__dirname, '../../Uploads'),
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const upload = multer({ storage: storage });

const handleFileUpload = async (req, res) => {
	try {
		// Realizar operaciones de subida de archivos aquí

		// Devolver la ubicación del archivo en la respuesta
		const fileLocation = req.file.path; // Suponiendo que multer almacena la ruta del archivo en req.file.path
		res.status(200).json({ fileLocation: fileLocation });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al cargar el archivo' });
	}
};
module.exports = {
	upload,
	handleFileUpload,
};
