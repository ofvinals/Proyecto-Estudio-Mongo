const mongoose = require('mongoose');
import { MONGODB_URI } from './app.js';

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('MongoDB conectado desde Atlas');
	} catch (error) {
		console.error(error);
	}
};
