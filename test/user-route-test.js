'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js');
const userMocks = require('./lib/user-mocks.js');
const baseURL = `http://localhost:${process.env.PORT}`;
const User = require('../model/user.js');

describe('Testing user model', function(){

  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('Testing GET /api/user/:id', function(){
    before(userMocks.bind(this));

    it('should return a user', (done) => {
      superagent.get(`${baseURL}/api/user/${this.tempUser._id.toString()}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal(this.tempUser.username);
        expect(Boolean(res.body._id)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('test 404, when no user header is provided', (done) => {
      let url = `${baseURL}/api/users/${this.tempUser._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    describe('Testing DELETE /api/user/:id', function(){
      before(userMocks.bind(this));

      it('should return a user', (done) => {
        superagent.delete(`${baseURL}/api/user/${this.tempUser._id.toString()}`)
        .set('Authorization', `Bearer ${this.tempToken}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          done();
        })
        .catch(done);
      });
      it('should respond with a 404', (done) => {
        let url = `${baseURL}/api/user/fakeID`;
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
});
