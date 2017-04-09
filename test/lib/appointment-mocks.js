'use strict';

const debug = require('debug')('turnipVentures:appointment-mocks');
const Appointment = require('../../model/appointment.js');

module.exports = function(done){
  debug('appointment-mocks');
  new Appointment({
    title:  'test' + Math.floor(Math.random() * 100),
    start: Date.now(),
    userID: this.tempUser._id.toString(),
  }).save()
  .then(appointment => {
    this.tempAppointment = appointment;
    done();
  })
  .catch(done);
};
