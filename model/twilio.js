'use strict';

require('dotenv').load();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client =require('twilio')(accountSid, authToken);

module.exports = exports = {};

exports.twilio = function(phone, message, callback){
  console.log(client.messages);
  client.messages.create({
    to: '+12069229154',
    from: '+13602802891',
    body: message,
  }, function(err, message) {
    callback(err, message);
  });

};

exports.twilio();
