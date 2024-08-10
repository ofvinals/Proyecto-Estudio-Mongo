const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		eventId: {
			type: String,
		},
		summary: {
			type: String,
			required: true,
		},
		start: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: String,
		},
		eventUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Event', eventSchema);
