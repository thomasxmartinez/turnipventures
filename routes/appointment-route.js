'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('turnipVentures:appointment_router');
const Appointment = require('../model/appointment');
const bearerAuth = require('../lib/bear-auth');
const appointmentRouter = module.exports = new Router();

appointmentRouter.post('/api/appointments', bearerAuth, jsonParser,  function(req, res, next){
  debug('POST /api/appointments');
  if(!req.body.title)
    return next(createError(400, 'requires title'));
  new Appointment({
    title: req.body.title,
    userID: req.user._id.toString(),
  }).save()
  .then(appointment => res.json(appointment))
  .catch(next);
});

appointmentRouter.get('/api/appointments/:id', bearerAuth, function(req, res, next){
  debug('GET /api/appointments/:id');
  Appointment.findOne({
    userID: req.user._id.toString(),
    _id: req.params.id,
  })
  .then(appointment => res.json(appointment))
  .catch(err => {
    if(err) return next(createError(404, 'didn\'t find the appointment'));
  });
});
