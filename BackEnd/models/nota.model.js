const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema(
	{
		responsable: {
			type: String,
			require: true,
		},
		recordatorio: {
			type: String,
			require: true,
		},
		estado: {
			type: String,
			require:true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Nota', notaSchema);
