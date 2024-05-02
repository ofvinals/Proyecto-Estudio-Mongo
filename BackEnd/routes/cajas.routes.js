const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getCajas,
	getCaja,
	createCaja,
	deleteCaja,
	updateCaja,
} = require('../controllers/caja.controller.js');
const { upload } = require('../controllers/upload.controller.js');

const router = express.Router();

router.get('/cajas', authRequired, getCajas);
router.get('/cajas/:id', authRequired, getCaja);
router.post('/cajas', upload.single('file'), authRequired, createCaja);
router.delete('/cajas/:id', authRequired, deleteCaja);
router.put('/cajas/:id', authRequired, updateCaja);

module.exports = router;
