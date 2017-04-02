'use strict';

require('dotenv').load();


const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('turnipVentures:server');



const app = express();

// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
// app.use(morgan(process.env.LOG_FORMAT));
//
// app.use(require('./routes/goal-route.js'));
// app.use(require('./routes/user-route.js'));
//
// app.use(require('./routes/profile-route.js'));
// app.use(require('./routes/photo-route.js'));
// app.use(require('./routes/task-route.js'));
app.use(require('./route/auth-router.js'));
// app.use(require('./router/profile-router.js'));
// app.use(require('./router/listing-router.js'));
// app.use(require('./router/stripe-router.js'));


app.use(function(err, req, res, next){
  debug('error middleware');
  console.log(err.message);
  if(err.status){
    res.status(err.status).send();
    return;
  }
  if(err.name === 'ValidationError'){
    res.status(400).send();
    return;
  }
  if(err.name === 'ValidationError'){
    res.status(409).send();
    return;
  }
  res.status(500).send();
});

const server = app.listen(process.env.PORT, () => {
  console.log('server up ::', process.env.PORT);
});

server.isRunning = true;
module.exports =  server;
// let app = module.exports = express();

// app.use(function(err,req,res,next){
//   debug('error middleware');
//   console.log(err);
//   if(err.status){
//     return res.sendStatus(err.status);
//   }
//   res.sendStatus(500);
//   next();
// });
//

// app.use(express.static(`${__dirname}/../build`));
// app.get('*', (req, res) => res.redirect('/'));

// app.use((err, req, res, next) => {
//   debug('error middleware');
//   console.error(err.message);
//   console.log('err:', err);
//   if(err.status) return res.sendStatus(err.status);
//   if(err.name === 'ValidationError') return res.sendStatus(400);
//   if(err.name === 'MongoError' && err.code == '11000')
//     return res.sendStatus(409);
//   res.sendStatus(500);
//   next();
// });
