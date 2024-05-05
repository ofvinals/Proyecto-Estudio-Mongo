const express = require('express');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const cajasRoutes = require('./routes/cajas.routes.js');
const turnosRoutes = require('./routes/turnos.routes.js');
const gastosRoutes = require('./routes/gastos.routes.js');
const exptesRoutes = require('./routes/exptes.routes.js');
const uploadRoutes = require('./routes/upload.routes.js');
const notasRoutes = require('./routes/notas.routes.js');

const connectDB = require('./db/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://proyecto-estudio-mongo.vercel.app/',
			'https://proyecto-estudio-mongo.onrender.com',
			'*',
		],
		credentials: true,
		optionsSuccessStatus: 200,

	})
);
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', cajasRoutes);
app.use('/api', gastosRoutes);
app.use('/api', exptesRoutes);
app.use('/api', turnosRoutes);
app.use('/api', uploadRoutes);
app.use('/api', notasRoutes);

async function main() {
	try {
		await connectDB();
		console.log(`Escuchando en el puerto:`, process.env.PORT);
		app.listen(process.env.PORT);
	} catch (error) {
		console.error(error);
	}
}

main();
