const Caja = require('../models/caja.model.js');

const getCajas = async (req, res) => {
	try {
		const cajas = await Caja.find();
		res.json(cajas);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createCaja = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { fecha, concepto, tipo, monto, estado, fileUrl } = req.body;

	try {
		// Crear una nueva instancia del modelo Caja utilizando los datos de la solicitud
		const newCaja = new Caja({
			fecha,
			concepto,
			tipo,
			monto,
			fileUrl, 
			estado,
		});
		const partesFecha = fecha.split('/');
		const fechaObj = new Date(
			partesFecha[2],
			partesFecha[1] - 1,
			partesFecha[0]
		);
		const month = fechaObj.getMonth() + 1;
		newCaja.mes = month;

		const savedCaja = await newCaja.save();
		res.json(savedCaja);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const getCaja = async (req, res) => {
	try {
		const caja = await Caja.findById(req.params.id);
		if (!caja)
			return res.status(404).json({ message: 'Caja no encontrado' });
		res.json(caja);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateCaja = async (req, res) => {
	try {
		const { fecha, concepto, tipo, monto, adjunto, estado } = req.body;

		const updateCaja = await Caja.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updateCaja);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteCaja = async (req, res) => {
	try {
		const deletedCaja = await Caja.findByIdAndDelete(req.params.id);
		if (!deletedCaja)
			return res.status(404).json({ message: 'Expediente no encontrado' });

		res.json(deletedCaja);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getCaja,
	getCajas,
	createCaja,
	updateCaja,
	deleteCaja,
};
