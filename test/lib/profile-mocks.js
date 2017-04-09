'use strict';

const debug = require('debug')('turnipVentures:profile-mocks');
const Profile = require('../../model/profile');

module.exports = function(done){
  debug('profile-mocks');
  new Profile({
    title:  'test' + Math.floor(Math.random() * 100),
    userID: this.tempUser._id.toString(),
  }).save()
  .then(profile => {
    this.tempProfile = profile;
    done();
  })
  .catch(done);
};
