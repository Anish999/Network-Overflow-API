const express = require('express');

const usersController = require('../controllers/users');
const middleware = require('../authentication/checkToken');

const router = express.Router();

//router.get('/', middleware.checkToken, usersController.getUsers);

router.get('/', usersController.getUsers);

router.get('/:email', usersController.getUserByEmail);

router.post('/signUp', usersController.signUp);

router.post('/', usersController.addUser);

router.get('/:uid', usersController.getUserById);

router.put('/', usersController.editUser);

router.delete('/:uid', usersController.deleteUser);

module.exports = router;
