const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getGastos,
	getGasto,
	createGasto,
	deleteGasto,
	updateGasto,
} = require('../controllers/gasto.controller.js');
const { upload } = require('../controllers/upload.controller.js');

const router = express.Router();

router.get('/gastos', authRequired, getGastos);
router.get('/gastos/:id', authRequired, getGasto);
router.post('/gastos', upload.single('file'), authRequired, createGasto);
router.delete('/gastos/:id', authRequired, deleteGasto);
router.put('/gastos/:id', authRequired, updateGasto);

module.exports = router;
