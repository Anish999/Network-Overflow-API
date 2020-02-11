let jwt = require('jsonwebtoken');

const config = require('./config');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        const error = new Error('Token not valid.');
        error.code = 400;
        return next(error);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    const error = new Error('Auth token is not supplied');
    error.code = 400;
    return next(error);
  }
};

module.exports = {
  checkToken: checkToken
};
