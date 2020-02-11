const express = require('express');

const handler = require('../authentication/login-handler');
const middleware = require('../authentication/checkToken');

const router = express.Router();

router.use(
  express.urlencoded({
    extended: true
  })
);

router.use(express.json());

router.post('/login', handler.login);

router.get('/', middleware.checkToken, handler.index);

module.exports = router;
