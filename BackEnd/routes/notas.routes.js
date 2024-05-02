const express = require ('express');
const { authRequired } = require ('../middlewares/validateToken.js');
const {
	getNotas,
	createNota,
	updateNota,
	deleteNota,
} = require ('../controllers/nota.controller.js');

const router = express.Router();

router.get('/notas', authRequired, getNotas);
router.post('/notas', authRequired, createNota);
router.put('/notas/:id', authRequired, updateNota);
router.delete('/notas/:id', authRequired, deleteNota);

module.exports = router;
