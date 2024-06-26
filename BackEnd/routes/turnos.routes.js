const express = require ('express');
const { authRequired } = require ('../middlewares/validateToken.js');
const {
	getTurnos,
	getTurno,
	createTurno,
	deleteTurno,
	updateTurno,
} = require ('../controllers/turno.controller.js');

const router = express.Router();

router.get('/turnos', authRequired, getTurnos);
router.get('/turnos/:id', authRequired, getTurno);
router.post('/turnos', authRequired, createTurno);
router.delete('/turnos/:id', authRequired, deleteTurno);
router.put('/turnos/:id', authRequired, updateTurno);

module.exports = router;
