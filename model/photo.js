'use strict';

const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const Profile = require('../model/profile');
const del = require('del');

const s3 = new AWS.S3();

const PhotoSchema = mongoose.Schema({
  title: {type: String, required: true},
  photoURI: {type: String, required: true},
  awsKey: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  profileID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

PhotoSchema.pre('save', function(next) {
  Profile.findById(this.profileID)
    .then(profile => {
      profile.photo.push(this._id.toString());
      return profile.save();
    })
    .then(() => next())
    .catch(next);
});
PhotoSchema.post('save', function(doc, next) {
  del([`${__dirname}/../assets/images/*`]);
  next();
});
PhotoSchema.pre('remove', function(next) {
  Profile.findById(this.profileID)
    .then(profile => {
      profile.photos = profile.photos.filter(photo => {
        return photo != this._id.toString();
      });
      return profile.save();
    })
    .then(() => {
      return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.awsKey,
      }).promise();
    })
    .then(() => next())
    .catch(next);
});
module.exports = mongoose.model('photo', PhotoSchema);
