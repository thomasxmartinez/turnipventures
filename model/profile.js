'use strict';

const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  title: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photo: [{type: mongoose.Schema.Types.ObjectId, ref: 'photo'}],
});

module.exports = mongoose.model('profile', ProfileSchema);
