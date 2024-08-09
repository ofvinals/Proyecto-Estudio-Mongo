const Turno = require('../models/turno.model.js');

const getTurnos = async (req, res) => {
	try {
		const turnos = await Turno.find();
		res.json(turnos);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createTurno = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { eventId, tipo, start, motivo, creator, eventUrl } = req.body;
	try {
		// Crear una nueva instancia del modelo Turno utilizando los datos de la solicitud
		const newTurno = new Turno({
			eventId,
			tipo,
			start,
			motivo,
			creator,
			eventUrl,
		});
		const savedTurno = await newTurno.save();

		// envia respuesta del registro al frontend
		res.json({
			id: savedTurno._id,
			email: savedTurno.email,
			createdAt: savedTurno.createdAt,
		});
	} catch (error) {
		return res.status(500).json(['Error de registro de turno']);
	}
};

const getTurno = async (req, res) => {
	try {
		const turno = await Turno.findById(req.params.id);
		if (!turno)
			return res.status(404).json({ message: 'Turno no encontrado' });
		res.json(turno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateTurno = async (req, res) => {
	try {
		const { turno, email, tipo, motivo } = req.body;
		const updateTurno = await Turno.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateTurno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteTurno = async (req, res) => {
	try {
		const deletedTurno = await Turno.findByIdAndDelete(req.params.id);
		if (!deletedTurno)
			return res.status(404).json({ message: 'Turno no encontrado' });

		res.json(deletedTurno);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createTurnoGoogle = async (req, res) => {
	const { summary, description, start, end } = req.body;
	console.log(req.body);
	try {
		const event = {
			summary: summary,
			description: description,
			start: {
				dateTime: start,
				timeZone: 'Europe/Madrid', // Cambia según la zona horaria
			},
			end: {
				dateTime: end,
				timeZone: 'Europe/Madrid',
			},
		};

		const response = await calendar.events.insert({
			calendarId: 'primary', // O el ID del calendario específico
			resource: event,
		});

		res.status(200).send('Evento creado con éxito');
	} catch (error) {
		console.error('Error al crear el evento:', error);
		res.status(500).send('Error al crear el evento');
	}
};

module.exports = {
	getTurno,
	getTurnos,
	createTurnoGoogle,
	createTurno,
	updateTurno,
	deleteTurno,
};
