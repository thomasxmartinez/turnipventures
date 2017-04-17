// 'use strict';
// require('dotenv').config({path: `${__dirname}/../.env`});
//
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
//
// const userMocks = require('../test/lib/user-mocks');
// const appointmentMocks = require ('../test/lib/appointment-mocks');
//
// function populateStuff(){
//   userMocks.call(this, (err) => {
//     if (err) return console.log(err);
//     appointmentMocks.call(this, (err)=>{
//       if (err) return console.log(err);
//       mongoose.disconnect();
//     });
//   });
// }
//
// populateStuff.call({});
