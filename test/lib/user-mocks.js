'use strict';


const User = require('../../model/user.js');
const debug = require('debug')('turnipVentures:user-mock');

module.exports = function(done){
  debug('user-mock');
  new User({
    username: 'boatsboats' + Math.random(),
    email: 'boats@boatsboats.com' + Math.random(),
    password: '1234',
    phone: 2534484479,

  })
  .generatePasswordHash('1234')
  .then(user => user.save())
  .then(user => {
    this.tempUser = user;
    console.log(this.tempUser, '???????');
    return user.generateToken();
  })
  .then(token => {
    this.tempToken = token;
    console.log(this.tempToken, '3434343434');
    done();
  })
  .catch(done);
};
