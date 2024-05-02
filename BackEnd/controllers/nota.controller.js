const Nota = require('../models/nota.model.js');

const getNotas = async (req, res) => {
	try {
		const notas = await Nota.find();
		res.json(notas);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createNota = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { responsable, recordatorio, estado } = req.body;

	try {
		// Crear una nueva instancia del modelo Nota utilizando los datos de la solicitud
		const newNota = new Nota({
			responsable,
			recordatorio,
			estado,
		});
		const savedNota = await newNota.save();

		res.json(savedNota);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateNota = async (req, res) => {
	try {
		const { responsable, recordatorio, estado } = req.body;
		const updateNota = await Nota.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		
		res.json(updateNota);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteNota = async (req, res) => {
	try {
		const deletedNota = await Nota.findByIdAndDelete(req.params.id);
		if (!deletedNota)
			return res.status(404).json({ message: 'Expediente no encontrado' });

		res.json(deletedNota);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getNotas,
	createNota,
	updateNota,
	deleteNota,
};
