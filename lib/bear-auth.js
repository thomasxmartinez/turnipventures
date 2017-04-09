'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('turnipVentures:bear-auth-middleware');

const User = require('../model/user.js');

module.exports = function(req,res, next){
  debug('bear-auth-middleware');
  let Authorization = req.headers.authorization;
  if(!Authorization) return (createError(401, 'No authorization headers sent'));

  let token = Authorization.split('Bearer ')[1];

  jwt.verify(token, process.env.APP_SECRET, function(err, decoded){
    if(err) return next(createError(401, err.message));

    User.findOne({findHash: decoded.findHash})
  .then(user => {
    req.user = user;
    next();

  })
  .catch(err => next(createError(401, err.message)));
  });
};
