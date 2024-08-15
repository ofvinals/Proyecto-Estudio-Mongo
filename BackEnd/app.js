const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const cajasRoutes = require('./routes/cajas.routes.js');
const eventsRoutes = require('./routes/events.routes.js');
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
			'http://localhost:5174',
			'http://localhost:5173',
			'https://estudioposse.vercel.app/',
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
app.use('/api', eventsRoutes);
app.use('/api', uploadRoutes);
app.use('/api', notasRoutes);

app.get('/scrape', async (req, res) => {
	try {
		const { data } = await axios.get('https://www.diariojudicial.com/');
		const $ = cheerio.load(data);
		let articles = [];

		// Ajustar selectores según la estructura actual de la página
		$('div.col-12.col-lg-3.mb-4').each((index, element) => {
			const title = $(element)
				.find('h5 a.d-block.ff2.fw-bold.text-dark.mb-3')
				.text()
				.trim();

			const link = $(element)
				.find('h5 a.d-block.ff2.fw-bold.text-dark.mb-3')
				.attr('href');

			const imgSrc = $(element).find('amp-img').attr('src');

			const description = $(element)
				.find('h5 a.d-block.h6.text-dark')
				.text()
				.trim();

			if (title && link && imgSrc && description) {
				articles.push({
					title,
					link: `https://www.diariojudicial.com/${link}`,
					imgSrc,
					description,
				});
			}
		});

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
