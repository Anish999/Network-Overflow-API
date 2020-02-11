const express = require('express');

const roommatesController = require('../controllers/roommates');

const router = express.Router();

//Define Routes here

router.get('/', roommatesController.getRoommates);

router.post('/', roommatesController.createRoommate);

router.get('/:uid', roommatesController.getRoommateById);

router.put('/', roommatesController.editRoommate);

router.delete('/:uid', roommatesController.deleteRoommate);

module.exports = router;
