'use strict';

const mongoose = require('mongoose');


const appointmentSchema = mongoose.Schema({
  title: {type:String, required:true},
  completion: {type:Boolean, default:false},
  start:{type:Date, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  // appointmentID: [{type: mongoose.Schema.Types.ObjectId, ref: 'appointment'}],
});

module.exports = mongoose.model('appointment', appointmentSchema);
