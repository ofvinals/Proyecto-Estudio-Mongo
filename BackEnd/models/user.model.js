const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
		},
		dni: {
			type: String,
			required: true,
			maxlength: [
				10,
				'El DNI/CUIT debe contener hasta 11 caracteres numericos (sin espacios ni guiones)',
			],
		},
		domicilio: {
			type: String,
			required: true,
		},
		celular: {
			type: String,
			required: true,
			maxlength: 10,
		},
		admin:{
			type:Boolean,
			defaultValue: false
		},
		coadmin:{
			type:Boolean,
			defaultValue: false
		},
		active:{
			type:Boolean,
			defaultValue: true
		}
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('User', userSchema);
