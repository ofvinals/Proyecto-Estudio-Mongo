const express = require('express');
const {
	login,
	register,
	logout,
	verifyToken,
	googleLogin,
} = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verifyToken', verifyToken);
router.post('/googleLogin', googleLogin);

module.exports = router;
