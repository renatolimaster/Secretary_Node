const jwt = require('jsonwebtoken');
const { User } = require('../models/user/');
const { SECRET_KEY } = require('../../config');

const log = console.log;

const auth = async (req, res, next) => {
  try {
    if (req.header('Authorization') === undefined) {
      res.status(401).send({ error: 'Please authenticate.' });
      return;
    }
    // take the token from header inside "Authorization" variable and get rid 'Bearer '
    // pay attention in spaces after word Bearer
    const token = req.header('Authorization').replace('Bearer ', '');
    // verify if token is correct
    const decoded = jwt.verify(token, SECRET_KEY);
    // find user with the id and token grabbed inside tokens
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })
      .populate('publishersId')
      .populate('roleId');
    // console.log('user auth:', user);
    if (!user) {
      throw new Error();
    }
    // return token to delete this specific token when user logout
    // its because user can login on others devices and authenticate
    req.token = token;
    // returns the user
    req.user = user;
    // log('Auth =================> User:', user);
    next();
  } catch (e) {
    log('Error: ', e);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
