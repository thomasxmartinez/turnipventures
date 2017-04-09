'use strict';

const server = require('../../server.js');

const serverControl = module.exports = {};

serverControl.startServer = function(done){
  if(!server.isOn){
    server.listen(process.env.PORT, () => {
      server.isOn = true;
      console.log('Server is up! tooturnt: ', process.env.PORT);
      done();

    });
    return;
  }
  done();
};

serverControl.killServer = function(done){
  if(server.isOn){
    server.close(() => {
      server.isOn = false;
      console.log('SERVER IS DOWN, SERVER DOWN I REPEAT, server down');
      done();
    });
    return;
  }
  done();
};
