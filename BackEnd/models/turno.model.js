const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema(
	{
		eventId: {
			type: String,
		},
		tipo: {
			type: String,
			required: true,
		},
		start: {
			type: String,
			required: true,
		},
		motivo: {
			type: String,
			required: true,
		},
		creator: {
			type: String,
			required: true,
		},
		eventUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Turno', turnoSchema);
