'use strict';

require('dotenv').load();

const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const debug = require('debug')('turnipVentures:server');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());

app.use(require('./routes/auth-router.js'));
app.use(require('./routes/appointment-route.js'));
app.use(require('./routes/user-route.js'));

app.use(require('./routes/profile-route.js'));
app.use(require('./routes/photo-route.js'));


app.use(function(err,req,res,next){
  debug('error middleware');
  console.log(err);
  if(err.status){
    return res.sendStatus(err.status);
  }

  if(err.name === 'ValidationError'){
    return res.sendStatus(400);
  }

  if(err.message.startsWith('E11000 duplicate key')){
    return res.sendStatus(409);
  }

  res.sendStatus(500);
  next();
});

const server = app.listen(process.env.PORT, () => {
  console.log('Server is all the way up: ', process.env.PORT);
});

server.isOn = true;
module.exports = server;



  /*"lint": "./node_modules/eslint/bin/eslint.js .",*/
