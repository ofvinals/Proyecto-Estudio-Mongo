const mongoose = require ('mongoose');

const gastoSchema = new mongoose.Schema(
	{
		nroexpte: {
			type: String,
			required: true,
			index: false,
					},
		caratula: {
			type: String,
			required: true
		},
		concepto: {
			type: String,
			required: true,
		},
		cliente:{
			type:String,
		},
		file: {
			type: mongoose.Schema.Types.Mixed,
			filename: String,
			filePath: String,
		},	
		fileUrl:{
			type: String,
		},
		monto: {
			type: Number,
			required: true,
		},
		estado: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

gastoSchema.methods.setFile = function setFile(
	filename,
	filePath
) {
	this.file = {
		filename: filename,
		filePath: filePath,
	};
};
module.exports = mongoose.model('Gasto', gastoSchema);
