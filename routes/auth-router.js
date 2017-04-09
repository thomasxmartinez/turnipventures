'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');
const debug = require('debug')('turnipVentures: auth-router');

const basicAuthMiddleware = require('../lib/basic-auth.js');

const authRouter = module.exports = new Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup');
  console.log('lulwat', req.body);
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

authRouter.get('/api/login', basicAuthMiddleware,  function(req, res, next){
  debug('GET /api/login');
  console.log(req.user, 'RANDOM STRING');
  req.user.generateToken()
  .then(token => res.send(token))
  .catch(next);
});
