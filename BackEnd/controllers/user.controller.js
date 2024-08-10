const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const createAccessToken = require('../libs/jwt.js');

const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');
		res.json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	// Extraer los campos del cuerpo de la solicitud (request body)
	const { nombre, apellido, email, dni, domicilio, celular, password } =
		req.body;
	try {
		// encripta el password
		const passwordHash = await bcrypt.hash(password, 10);
		// Crear una nueva instancia del modelo User utilizando los datos de la solicitud
		const newUser = new User({
			nombre,
			apellido,
			email,
			dni,
			domicilio,
			celular,
			password: passwordHash,
		});
		const savedUser = await newUser.save();
		// crea el token
		const token = await createAccessToken({ id: savedUser._id });
		res.cookie('token', token);
		// envia respuesta del registro al frontend
		res.json({
			id: savedUser._id,
			email: savedUser.email,
			createdAt: savedUser.createdAt,
		});
	} catch (error) {
		return res.status(500).json(['Error de registro de usuario']);
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user)
			return res.status(404).json({ message: 'Usuario no encontrado' });
		res.json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUserByGoogle = async (req, res) => {
	try {
		const userEmail = req.params.userEmail;
		const userFound = await User.findOne({ email: userEmail });
		const token = await createAccessToken({
			id: userFound._id,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			email: userFound.email,
			admin: userFound.admin,
		});
		res.cookie('token', token);
		return res.status(200).json({
			id: userFound._id,
			email: userFound.email,
			displayName: `${userFound.nombre} ${userFound.apellido}`,
			accessToken: token,
			admin: userFound.admin,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { password, ...updateFields } = req.body;
		// Agregar el password solo si está presente
		if (password) {
			updateFields.password = await bcrypt.hash(password, 10);
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			updateFields,
			{
				new: true,
				lean: true,
			}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}
		res.json(updatedUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser)
			return res.status(404).json({ message: 'Expediente no encontrado' });
		res.json(deletedUser);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getUser,
	getUsers,
	getUserByGoogle,
	createUser,
	updateUser,
	deleteUser,
};
