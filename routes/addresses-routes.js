const express = require('express');

const addressesController = require('../controllers/addresses');

const router = express.Router();

//Define Routes here

router.get('/', addressesController.getAddresses);

router.post('/', addressesController.createAddress);

router.get('/:addressid', addressesController.getAddressById);

module.exports = router;
