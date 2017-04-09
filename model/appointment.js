'use strict';

const mongoose = require('mongoose');


const appointmentSchema = mongoose.Schema({
  title: {type:String, required:true},
  start:{type:Date, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('appointment', appointmentSchema);
