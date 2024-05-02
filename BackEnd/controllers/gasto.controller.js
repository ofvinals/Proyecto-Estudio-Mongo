const Gasto = require('../models/gasto.model.js');

const getGastos = async (req, res) => {
	try {
		const gastos = await Gasto.find();
		res.json(gastos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createGasto = async (req, res) => {
	const { nroexpte, caratula, concepto, monto, estado, fileUrl } = req.body;
	try {
		// Crear una nueva instancia del modelo Gasto utilizando los datos de la solicitud
		const newGasto = new Gasto({
			nroexpte,
			caratula,
			concepto,
			monto,
			fileUrl,
			estado,
		});

		const savedGasto = await newGasto.save();

		// envia respuesta del registro al frontend
		res.json(savedGasto);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getGasto = async (req, res) => {
	try {
		const gasto = await Gasto.findById(req.params.id);
		res.json(gasto);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateGasto = async (req, res) => {
	try {
		const { nroexpte, caratula, concepto, comprobante, monto, estado, fileUrl } =
			req.body;
		const updateGasto = await Gasto.findByIdAndUpdate(
			req.params.id,
			{
				nroexpte,
				caratula,
				concepto,
				comprobante,
				monto,
				estado,
				fileUrl,
			},
			{
				new: true,
			}
		);
		res.json(updateGasto);
	} catch (error) {
		console.error('Error al actualizar el gasto:', error);

		if (error.name === 'MongoError' && error.code === 11000) {
			// Manejar el error de clave duplicada (E11000)
			return res
				.status(400)
				.json({ message: 'Error: Clave duplicada', error });
		}

		return res
			.status(500)
			.json({ message: 'Error interno del servidor', error });
	}
};

const deleteGasto = async (req, res) => {
	try {
		const deletedGasto = await Gasto.findByIdAndDelete(req.params.id);
		res.json(deletedGasto);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getGasto,
	getGastos,
	createGasto,
	updateGasto,
	deleteGasto,
};
