'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const Photo = require('../model/photo');
const User = require('../model/user');
const Profile = require('../model/profile');
const mockUser = require('./lib/user-mocks');
const mockPhoto = require('./lib/photo-mocks');
const mockProfile = require('./lib/profile-mocks');
const serverControl = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing photo_router', function() {
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      Photo.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/photos', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));


    it('should return a photo model', (done) => {
      console.log(this.tempToken, 'hahahah');
      superagent.post(`${baseURL}/api/photos`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .field('title', 'puppy2')
      .field('profileID', this.tempProfile._id.toString())
      .attach('file', `${__dirname}/assets/images/puppy2.jpg`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('puppy2');
        expect(res.body.profileID).to.equal(this.tempProfile._id.toString());
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        expect(Boolean(res.body.photoURI)).to.equal(true);

        done();
      })
      .catch(done);
    });

    it('should respond with 401', done => {
      superagent.post(`${baseURL}/api/photos`)
      .send({title: 'fakephoto'})
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with a 404 with bad url', (done) => {
      let url = `${baseURL}/api/fakephoto`;
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
  describe('testing GET /api/photos/:id', function() {
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));
    beforeEach(mockPhoto.bind(this));
    it('should respond with a photos', done => {
      let url = `${baseURL}/api/photos/${this.tempPhoto._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempPhoto.title);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with a 401', done => {
      let url = `${baseURL}/api/photos/${this.tempPhoto._id.toString()}`;
      superagent.get(url)
      .set('Authorization', 'Bearer badtoken')
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should respond with a 404', done => {
      let url = `${baseURL}/api/photos/fakeID`;
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
  describe('testing DELETE /api/photos', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));
    beforeEach(mockPhoto.bind(this));

    it('should delete a photo', (done) => {
      superagent.delete(`${baseURL}/api/photos/${this.tempPhoto._id.toString()}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should respond with a 401', done => {
      superagent.delete(`${baseURL}/api/photos/${this.tempPhoto._id.toString()}`)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404', done => {
      superagent.delete(`${baseURL}/api/photos/fakeID`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

});
