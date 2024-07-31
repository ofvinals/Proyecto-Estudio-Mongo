const createAccessToken = require('../libs/jwt.js');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
// const { TOKEN_SECRET } = require('../app.js');

const register = async (req, res) => {
	const { email, password, nombre, apellido, dni, domicilio, celular } =
		req.body;
	try {
		const userFound = await User.findOne({ email });
		if (userFound)
			return res.status(400).json(['El email ya esta registrado!']);

		// encripta el password (bcrypt instalado)
		const passwordHash = await bcrypt.hash(password, 10);

		// crea nuevo usuario en DB
		const newUser = new User({
			nombre,
			email,
			password: passwordHash,
			apellido,
			dni,
			domicilio,
			celular,
			admin: false,
		});

		// lo guarda en DB
		const userSaved = await newUser.save();

		// crea el token
		const token = await createAccessToken({
			id: userSaved._id,
			displayName: `${userSaved.nombre} ${userSaved.apellido}`,
			email: userSaved.email,
			admin: userSaved.admin,
			coadmin: userSaved.coadmin,
		});

		res.cookie('token', token);
		localStorage.setItem('token', token);

		return res.status(200).json({
			accessToken: token,
			id: userSaved._id,
			email: userSaved.email,
			displayName: `${userSaved.nombre} ${userSaved.apellido}`,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(['Error de registro de usuario']);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userFound = await User.findOne({ email });

		// Validacion usuario y contraseña por backend
		if (!userFound)
			return res.status(400).json({
				message: ['El mail y/o contraseña ingresados es incorrecta'],
			});

		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch)
			return res.status(400).json({
				message: ['El mail y/o contraseña ingresados es incorrecta'],
			});

		// genera el token
		const token = await createAccessToken({
			id: userFound._id,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			email: userFound.email,
			admin: userFound.admin,
			coadmin: userFound.coadmin,
		});

		res.cookie('token', token);

		// envia respuesta al frontend
		return res.status(200).json({
			id: userFound._id,
			email: userFound.email,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			accessToken: token,
			admin: userFound.admin,
			coadmin: userFound.coadmin,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(['Error de Ingreso']);
	}
};

const logout = (req, res) => {
	res.cookie('token', '', { expires: new Date(0) });
	return res.sendStatus(200);
};

const profile = async (req, res) => {
	const userFound = await User.findById(req.user.id);
	if (!userFound) return res.status(400).json(['Usuario no encontrado']);

	return res.json({
		id: userFound._id,
		email: userFound.email,
		createdAt: userFound.createdAt,
	});
};

const verifyToken = async (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	console.log(token);
	if (!token) return res.send(false);

	Jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
		if (error) return res.status(401).json(['No autorizado']);
		console.log(error, 'user', user);
		const userFound = await User.findById(user.id);
		if (!userFound) return res.status(401).json(['No autorizado']);
		console.log('userFound', userFound);
		return res.json({
			id: userFound._id,
			email: userFound.email,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			token: token,
			admin: userFound.admin,
			coadmin: userFound.coadmin,
		});
	});
};

module.exports = {
	register,
	login,
	logout,
	profile,
	verifyToken,
};
