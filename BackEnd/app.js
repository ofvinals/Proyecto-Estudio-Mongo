const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const cajasRoutes = require('./routes/cajas.routes.js');
const turnosRoutes = require('./routes/turnos.routes.js');
const gastosRoutes = require('./routes/gastos.routes.js');
const exptesRoutes = require('./routes/exptes.routes.js');
const uploadRoutes = require('./routes/upload.routes.js');
const notasRoutes = require('./routes/notas.routes.js');

require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://proyecto-estudio-mongo.vercel.app'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://proyecto-estudio-mongo.vercel.app',
			'https://proyecto-estudio-mongo.onrender.com',
		],
		credentials: true,
		optionsSuccessStatus: 200,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
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

app.get('/scrape', async (req, res) => {
	try {
		const { data } = await axios.get('https://www.diariojudicial.com/');
		console.log(data)
		const $ = cheerio.load(data);
		let articles = [];

		// Ajustar selectores según la estructura actual de la página
		$('div.noticia-principal').each((index, element) => {
			const title = $(element).find('h2 a').text().trim();
			const link = $(element).find('h2 a').attr('href');

			if (title && link) {
				articles.push({
					title,
					link: `https://www.diariojudicial.com${link}`,
				});
			}
		});

		// Si hay otros tipos de artículos en la página, puedes agregar más selectores aquí

		res.json(articles);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error al realizar el scraping');
	}
});

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
