'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user.js');
const userMocks = require('./lib/user-mocks.js');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing auth-router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    User.remove({})
    .then(() => done())
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('testing POST /api/signup', function(){
    it('should return a user', function(done){
      superagent.post(`${baseURL}/api/signup`)
      .send({
        username: 'boatsboats',
        email: 'boats@boatsboats.com',
        password: '1234',
        phone: 2534487489,
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(Boolean(res.text)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('a missing field should respond with 500 status', done => {
      superagent.post(`${baseURL}/api/signup`)
      .send({username: 'blah'})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(500);
        done();
      })
      .catch(done);
    });

    it('bad endpoint should respond with 404 status', done => {
      superagent.post(`${baseURL}/api/sign`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
    it('should return a 400 error for bad signup', function(done){
      superagent.post(`${baseURL}/api/signup`)
      .send({
        email: 'boats@boatsboats.com',
        password: '1234',
        phone: 2534487489,
      })
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      });
      it('should respond with 409 status', done => {
        superagent.post(`${baseURL}/api/signup`)
        .send({
          email: 'boats@boatsboats.com',
          password: '1234',
          phone: 2534487489,
        })
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(409);
          done();
        })
        .catch(done);
      });
    });
  });
  describe('testing GET /api/login', function(){
    beforeEach(userMocks.bind(this));

    it('should respond with a token', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth(this.tempUser.username, '1234')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(Boolean(res.text)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should respond with a 401 error', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth(this.tempUser.username, '1235')
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with a 404 error', (done) => {
      superagent.get(`${baseURL}/api/badlogin`)
      .auth(this.tempUser.username, '1234')
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
