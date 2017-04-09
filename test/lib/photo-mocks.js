'use strict';

const debug = require('debug')('turnipVentures:photo-mocks');
const Photo = require('../../model/photo');

module.exports = function(done){
  debug('photo-mocks');
  new Photo({
    title:  'test' + Math.floor(Math.random() * 100),
    userID: this.tempUser._id.toString(),
    profileID: this.tempProfile._id.toString(),
    awsKey: 'test.jpg',
    photoURI: 'http://tempPhoto.com/tempPhoto.jpg',
  }).save()
  .then(photo => {
    this.tempPhoto = photo;
    done();
  })
  .catch(done);
};
