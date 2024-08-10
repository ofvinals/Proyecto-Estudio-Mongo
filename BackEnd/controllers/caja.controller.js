const Caja = require('../models/caja.model.js');

const getCajas = async (req, res) => {
	try {
		const cajas = await Caja.find();
		res.json(cajas);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getCaja = async (req, res) => {
	try {
		const caja = await Caja.findById(req.params.id);
		res.json(caja);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createCaja = async (req, res) => {
	console.log(req.body);
	const { fecha, mes, concepto, tipo, monto, estado, fileUrl } = req.body;
	try {
		const newCaja = new Caja({
			fecha,
			concepto,
			tipo,
			monto,
			mes,
			fileUrl,
			estado,
		});
		const savedCaja = await newCaja.save();
		res.json(savedCaja);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const updateCaja = async (req, res) => {
	try {
		const { fecha, mes, concepto, tipo, monto, adjunto, estado } = req.body;
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
