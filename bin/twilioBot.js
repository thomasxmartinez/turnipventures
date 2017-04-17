// 'use strict';
// require('dotenv').config({path: `${__dirname}/../.env`});
//
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
// const Appointment = require('../model/appointment.js');
// const User = require('../model/user.js');
// var accountSid = process.env.TWILIO_ACCOUNT_SID;
// var authToken = process.env.TWILIO_AUTH_TOKEN;
// const client =require('twilio')(accountSid, authToken);
//
//
//
//
// const twilioBot = module.exports = function (callback) {
//   Appointment.find({completion:false})
//   .then(  (appointments) => {
//     appointments.forEach( function (appointment){
//       User.findById(appointment.userID)
//       .then((user) => {
//         sendText('+1' + user.phone,appointment.title, (err,message)=> {
//           callback(err,message);
//           mongoose.disconnect();
//         });
//       })
//       .catch(err => callback(err));
//     });
//   })
//   .catch(err => callback(err));
// };
//
// function sendText(phone, message, callback){
//   client.messages.create({
//     to: 2534484479,
//     from: process.env.TWILIO_NUMBER,
//     body: message,
//   }, function(err, message) {
//     callback(err,message);
//   });
//
// }
//
// twilioBot((err,message) => {
//   if(err) return console.error(err);
//   console.log(message);
// });
