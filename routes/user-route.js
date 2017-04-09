'use strict';

const Router = require('express').Router;
const User = require('../model/user.js');
const bearerAuth = require('../lib/bear-auth.js');
const createError = require('http-errors');
const debug = require('debug')('turnipVentures:user-route');
const userRouter = module.exports = new Router();


userRouter.get('/api/user/:id', bearerAuth, function(req,res,next){
  debug('GET /api/user/:id');

  User.findOne({ _id: req.params.id})
  .then(user => res.json(user))
  .catch(err => next(createError(404, err.message)));

});

userRouter.delete('/api/user/:id', bearerAuth, function(req,res,next){
  debug('DELETE /api/user/:id');
  User.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});
