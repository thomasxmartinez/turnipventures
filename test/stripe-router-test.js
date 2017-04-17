'use strict';

require('./mock-env');
const expect = require ('chai').expect;
const superagent = require('superagent');
const User = require('../model/user.js');
const Profile = require('../model/profile.js');
const Appointment = require('../model/appointment.js');
const userMock = require('./lib/user-mocks.js');
const profileMock = require('./lib/profile-mocks.js');
const appointmentMock = require('./lib/appointment-mocks.js');
const serverControl = require('./lib/server-control.js');
const baseURL = `http://localhost:${process.env.PORT}`;

if(process.env.NODE_ENV === 'dev') {
  describe('testing stripe-router', function() {
    this.timeout(15000);
    before(serverControl.startServer);
    after(serverControl.killServer);
    afterEach(done => {
      Promise.all([
        Appointment.remove({}),
        User.remove({}),
        Profile.remove({}),
      ])
      .then(() => done())
      .catch(done);
    });

  //   describe('testing POST /api/charge/:appointmentID', function() {
  //     beforeEach(userMock.bind(this));
  //     beforeEach(profileMock.bind(this));
  //     beforeEach(appointmentMock.bind(this));
  //     it('should respond with a charge object', done => {
  //       superagent.post(`${baseURL}/api/charge/${this.tempAppointment._id.toString()}`)
  //       .send({
  //         exp_month: 11,
  //         exp_year: 2017,
  //         number: '4242 4242 4242 4242',
  //         cvc: 731,
  //       })
  //       .set('Authorization', `Bearer ${this.tempToken}`)
  //       .then(res => {
  //         expect(res.status).to.equal(200);
  //         expect(typeof res.body).to.equal('object');
  //         done();
  //       })
  //       .catch(done);
  //     });
  //   });
  //
  // });
}
