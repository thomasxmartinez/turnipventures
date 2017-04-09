'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');

const User = require('../model/user');
const Profile = require('../model/profile');
const mockUser = require('./lib/user-mocks');
const mockPhoto = require('./lib/photo-mocks');
const mockProfile = require('./lib/profile-mocks');
const serverControl = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing profile_router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  after((done) => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/profile', function(){
    beforeEach(mockUser.bind(this));

    it('should respond with a profile', (done) => {
      superagent.post(`${baseURL}/api/profile`)
      .send({ title: 'testProfile' })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('testProfile');
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });
    it('should respond with 400', done => {
      superagent.post(`${baseURL}/api/profile`)
      .send({title: ''})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
      let url = `${baseURL}/api/profile/123124`;
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
      let url = `${baseURL}/api/fakeprofile`;
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
  describe('testing DELETE /api/profile', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));
    beforeEach(mockPhoto.bind(this));

    it('should delete a profile', (done) => {
      superagent.delete(`${baseURL}/api/profile/${this.tempPhoto._id.toString()}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should respond with a 401', done => {
      superagent.delete(`${baseURL}/api/profile/${this.tempPhoto._id.toString()}`)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404', done => {
      superagent.delete(`${baseURL}/api/profile/fakeID`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/profile/:id', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));
    beforeEach(mockPhoto.bind(this));

    it('should respond with a profile', (done) => {
      let url = `${baseURL}/api/profile/${this.tempProfile._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempProfile.title);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
      let url = `${baseURL}/api/profile/1234}`;
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
      let url = `${baseURL}/api/profile/fakeID`;
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
});
