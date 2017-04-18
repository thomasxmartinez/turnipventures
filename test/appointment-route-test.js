'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user');
const Profile = require('../model/profile');
const Appointment = require('../model/appointment');
const mockUser = require('./lib/user-mocks');
const mockProfile = require('./lib/profile-mocks');
const appointmentMocks = require('./lib/appointment-mocks');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;


describe('testing appointment router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      Appointment.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/appointments', () => {
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));

    it('should respond with an appointment', (done) => {
      let example = { title:'example appointments', completion: false, userID: this.tempProfile.userID.toString() };
      superagent.post(`${baseURL}/api/appointments`)
      .send(example)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('example appointments');
        expect(res.body.completion).to.equal(false);

        done();
      })
      .catch(done);
    });

    it('test 401, when no appointment header is provided', (done) => {
      superagent.post(`${baseURL}/api/appointments `)
      .send({title: 'example appointments',  completion: false })
      .set('Authorization', `Bearer ${this.aintmyToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should return a 400 if missing field', (done) => {
      superagent.post(`${baseURL}/api/appointments`)
      .send('{')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
  it('should respond with a 404 with bad url', (done) => {
    let url = `${baseURL}/api/fakeappointment`;
    superagent.get(url)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(404);
      done();
    })
    .catch(done);
  });

  describe('testing GET /api/appointments/:id', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(appointmentMocks.bind(this));

    it('should respond with an appointment', (done) => {
      let url = `${baseURL}/api/appointments/${this.tempAppointment._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempAppointment.title);
        expect(res.body.completion).to.equal(false);
        done();
      })
      .catch(done);
    });

    it('test 401, when no appointment header is provided', (done) => {
      let url = `${baseURL}/api/appointments/${this.tempAppointment._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404', (done) => {
      let url = `${baseURL}/api/appointments/fakeID`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing DELETE /api/appointments/:id', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(appointmentMocks.bind(this));

    it('should return 204', (done) => {
      let url = `${baseURL}/api/appointments/${this.tempAppointment._id.toString()}`;
      superagent.delete(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });

    it('DELETE test 401, when no authorization header is provided', (done) => {
      let url = `${baseURL}/api/appointments/${this.tempAppointment._id.toString()}`;
      superagent.delete(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404', (done) => {
      let url = `${baseURL}/api/appointments/fakeID`;
      superagent.delete(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
