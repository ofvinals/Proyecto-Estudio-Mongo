const Expte = require('../models/expte.model.js');

const getExptes = async (req, res) => {
	try {
		const exptes = await Expte.find();
		res.json(exptes);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createExpte = async (req, res) => {
	const {
		cliente,
		nroexpte,
		radicacion,
		juzgado,
		actor,
		demandado,
		proceso,
		estado,
	} = req.body;

	try {
		const newExpte = new Expte({
			cliente,
			nroexpte,
			radicacion,
			juzgado,
			caratula: `${actor} c/ ${demandado} s/ ${proceso}`,
			actor,
			demandado,
			proceso,
			estado,
			user: req.user.id,
		});

		const savedExpte = await newExpte.save();
		res.json(savedExpte);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getExpte = async (req, res) => {
	try {
		const expte = await Expte.findById(req.params.id);
		if (!expte)
			return res.status(404).json({ message: 'Expediente no encontrado' });
		res.json(expte);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateExpte = async (req, res) => {
	try {
		const {
			cliente,
			nroexpte,
			radicacion,
			juzgado,
			actor,
			demandado,
			proceso,
			estado,
		} = req.body;

		const caratula = `${actor} C/ ${demandado} S/ ${proceso}`;

		const updateExpte = await Expte.findByIdAndUpdate(
			req.params.id,
			{
				cliente,
				nroexpte,
				radicacion,
				juzgado,
				actor,
				demandado,
				proceso,
				caratula,
				estado,
			},
			{ new: true }
		);
		res.json(updateExpte);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteExpte = async (req, res) => {
	try {
		const deletedExpte = await Expte.findByIdAndDelete(req.params.id);
		if (!deletedExpte)
			return res.status(404).json({ message: 'Expediente no encontrado' });

		res.json(deletedExpte);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createMov = async (req, res) => {
	const { fecha, descripcion, fileUrl } = req.body;

	try {
		const expteId = req.params.id; // Asegúrate de ajustar esto según tu ruta de API

		// Buscar el expediente por ID
		const expte = await Expte.findById(expteId);
		if (!expte) {
			return res.status(404).json({ message: 'Expediente no encontrado' });
		}
		// Crear una nueva instancia del modelo Expte utilizando los datos de la solicitud
		const newMovimiento = {
			fecha,
			descripcion,
			fileUrl,
		};
		expte.movimientos.push(newMovimiento);

		// Guardar el expediente actualizado en la base de datos
		const savedExpte = await expte.save();
		res.json(savedExpte.movimientos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateMov = async (req, res) => {
	try {
		const { fecha, descripcion, fileUrl } = req.body;
		const { movimientoId } = req.params;
		const expte = await Expte.findById(req.params.expedienteId);

		if (!expte) {
			return res.status(404).json({ message: 'Expte no encontrado' });
		}
		const movimiento = expte.movimientos.find(
			(mov) => mov._id.toString() === movimientoId
		);
		if (!movimiento) {
			return res.status(404).json({ message: 'Movimiento no encontrado' });
		}

		movimiento.fecha = fecha;
		movimiento.descripcion = descripcion;
		movimiento.fileUrl = fileUrl;

		await expte.save();

		res.json(movimiento);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteMov = async (req, res) => {
	try {
		const { expedienteId, movimientoId } = req.params; // Obtén los parámetros desde la URL
		const deletedMov = await Expte.findByIdAndUpdate(
			expedienteId,
			{ $pull: { movimientos: { _id: movimientoId } } },
			{ new: true }
		);
		if (!deletedMov) {
			return res.status(404).json({ message: 'Expediente no encontrado' });
		}
		res.json(deletedMov);
	} catch (error) {
		console.error('Error al eliminar movimiento:', error);
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getExpte,
	getExptes,
	createExpte,
	updateExpte,
	deleteExpte,
	createMov,
	deleteMov,
	updateMov,
};
