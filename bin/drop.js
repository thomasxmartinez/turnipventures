'use strict';
require('dotenv').config({path: `${__dirname}/../.env`});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const User = require('../model/user.js');
const Appointment= require('../model/appointment.js');

Promise.all([
  User.remove({}),
  Appointment.remove({}),
])
.then(()=> mongoose.disconnect())
.catch(err => {
  console.error(err);
  mongoose.disconnect();
});
