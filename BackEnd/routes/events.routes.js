const express = require('express');
const { authRequired } = require('../middlewares/validateToken.js');
const {
	getEvents,
	getEvent,
	createEvent,
	createGoogleEvent,
	updateEvent,
	deleteEvent,
	deleteGoogleEvent
} = require('../controllers/event.controller.js');

const router = express.Router();

router.get('/events', authRequired, getEvents);
router.get('/events/:id', authRequired, getEvent);
router.post('/events', authRequired, createEvent);
router.post('/events/createGoogleEvent', authRequired, createGoogleEvent);
router.put('/events/:id', authRequired, updateEvent);
router.delete('/events/deleteEvent', authRequired, deleteEvent);

module.exports = router;
