const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema(
	{
		turno: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
		},
		tipo: {
			type: String,
		},
		motivo: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Turno', turnoSchema);
