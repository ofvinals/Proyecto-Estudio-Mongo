const Event = require('../models/event.model.js');
const { google } = require('googleapis');

const getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		res.json(event);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createEvent = async (req, res) => {
	const { eventId, user, summary, start, description, eventUrl } = req.body;
	try {
		const newEvent = new Event({
			eventId,
			summary,
			user,
			start,
			description,
			eventUrl,
		});
		const savedEvent = await newEvent.save();
		res.json(savedEvent);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createGoogleEvent = async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile:
			'client_secret_993541654096-l9jffbub2h4ro7c2d59r1euucrakkfen.apps.googleusercontent.com (2).json',
		scopes: ['https://www.googleapis.com/auth/calendar'],
	});
	const calendar = google.calendar({ version: 'v3', auth });
	try {
		const event = {
			summary: req.body.summary,
			description: req.body.description,
			start: {
				dateTime: req.body.start.dateTime,
				timeZone: req.body.start.timeZone,
			},
			end: {
				dateTime: req.body.end.dateTime,
				timeZone: req.body.end.timeZone,
			},
		};
		const response = await calendar.events.insert({
			auth,
			calendarId: process.env.CALENDAR_ID,
			resource: event,
		});
		res.status(200).json({
			message: 'Evento creado con éxito',
			event: response.data,
		});
	} catch (error) {
		console.error('Error al crear evento:', error);
		res.status(500).json({ message: 'Error al crear evento', error });
	}
};

const updateEvent = async (req, res) => {
	try {
		const { eventId, user, tipo, start, description, eventUrl } = req.body;
		const updateEvent = await Event.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateEvent);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const { eventId, id } = req.query;
		// Obtiene el usuario de google autenticado
		const auth = new google.auth.GoogleAuth({
			credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),

			scopes: ['https://www.googleapis.com/auth/calendar'],
		});
		const calendar = google.calendar({ version: 'v3', auth });
		// Elimina el evento de Google Calendar
		await calendar.events.delete({
			auth,
			calendarId: process.env.CALENDAR_ID,
			eventId: eventId,
		});
		// Elimina el evento de la base de datos
		await Event.findByIdAndDelete(id);
		return res.status(200).json({
			message:
				'Evento de Mongo y de Google Calendar eliminados exitosamente',
		});
	} catch (error) {
		console.error('Error al eliminar el evento:', error);
		return res.status(500).json({
			message: 'Error al eliminar el evento',
			error: error.message,
		});
	}
};

module.exports = {
	getEvent,
	getEvents,
	createEvent,
	createGoogleEvent,
	updateEvent,
	deleteEvent,
};
