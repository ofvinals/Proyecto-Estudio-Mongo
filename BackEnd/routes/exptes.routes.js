const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getExptes,
	getExpte,
	createExpte,
	deleteExpte,
	updateExpte,
	createMov,
	deleteMov,
	updateMov
} = require('../controllers/expte.controller.js');
const { upload } = require('../controllers/upload.controller.js');

const router = express.Router();

router.get('/exptes', authRequired, getExptes);
router.get('/exptes/:id', authRequired, getExpte);
router.post('/exptes', upload.single('file'), authRequired, createExpte);
router.delete('/exptes/:id', authRequired, deleteExpte);
router.put('/exptes/:id', authRequired, updateExpte);
router.post('/exptes/:id/movimientos', authRequired, createMov);
router.delete('/exptes/:expedienteId/movimientos/:movimientoId', authRequired, deleteMov);
router.put('/exptes/:expedienteId/movimientos/:movimientoId', authRequired, updateMov);

module.exports = router;
