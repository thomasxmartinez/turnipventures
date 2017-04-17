'use strict';

const userMocks = require('./user-mocks.js');
const debug = require('debug')('turnipVentures:profile-mocks');
const Profile = require('../../model/profile');

module.exports = function(done){
  debug('profile-mocks');
  userMocks.call(this, err => {
    if(err) return done(err);
    new Profile({
      title:  'test' + Math.floor(Math.random() * 100),
      userID: this.tempUser._id.toString(),
    }).save()
    .then(profile => {
      this.tempProfile = profile;
      done();
    })
    .catch(done);
  });
};
