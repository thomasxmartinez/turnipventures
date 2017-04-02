'use strict';

const Router = require('express').Router;
const User = require('../model/user.js');
const jsonParser = require('body-parser').json();
const debug = require('debug')('turnipVentures:auth-router');

const userRouter = module.exports = new Router();

userRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup');

  let password = req.body.password;
  delete req.body.password;

  new User(req.body)
  .generatePasswordHash(password)
  .then(user => {
    return user.generateToken();
  })
  .then(token => res.send(token))
  .catch(next);
});
