const express = require('express');

const eventsController = require('../controllers/events');

const router = express.Router();

//Define all the routes here
router.get('/', eventsController.getEvents);

router.post('/', eventsController.createEvent);

router.get('/:uid', eventsController.getEventById);

router.put('/', eventsController.editEvent);

router.delete('/:uid', eventsController.deleteEvent);

module.exports = router;
