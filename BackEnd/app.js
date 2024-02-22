const express = require('express');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const { connectDB } = require('./db.js');
require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://flourishing-tanuki-55bdc2.netlify.app',
			'http://localhost:5174',
			'*',
		],
	})
);

app.use(cookieParser());

// app.use(morgan('dev'));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);

async function main() {
	try {
		await connectDB();
		console.log(`Escuchando en el puerto:`, 4000);
		app.listen(4000);
	} catch (error) {
		console.error(error);
	}
}

main();
