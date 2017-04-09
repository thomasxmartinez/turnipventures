'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('turnipVentures:profile_router');
const Profile = require('../model/profile');
const bearerAuth = require('../lib/bear-auth');

const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile', bearerAuth, jsonParser,  function(req, res, next){
  debug('POST /api/profile');
  if(!req.body.title)
    return next(createError(400, 'requires title'));
  new Profile({
    title: req.body.title,
    userID: req.user._id.toString(),
  }).save()
  .then(profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/profile/:id', bearerAuth, function(req, res, next){
  debug('GET /api/profile/:id');
  Profile.findOne({
    userID: req.user._id.toString(),
    _id: req.params.id,
  })
  .populate('photo')
  .then(profile => res.json(profile))
  .catch(err => {
    if(err) return next(createError(404, 'didn\'t find the profile'));
  });
});
profileRouter.delete('/api/profile/:id', bearerAuth, function(req, res, next) {
  debug('DELETE /api/profile/:id');
  Profile.findOneAndRemove({
    userID: req.user._id.toString(),
    _id: req.params.id,
  })
  .then(() => res.status(204).send())
  .catch(() => next(createError(404, 'didn\'t find the gallery to remove')));
});
