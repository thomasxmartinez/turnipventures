'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const debug = require('debug');


const userSchema = mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  phone:{type:Number, required:true},
  findHash:{type:String, unique:true},
});

userSchema.methods.generatePasswordHash = function(password){
  debug('generatePasswordHash');
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 11, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password){
  debug('comparePasswordHash');
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'please input the correct passwords'));
      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function(){
  debug('generateFindHash');
  return new Promise((resolve, reject) => {
    let tries = 3;
    let _generateFindHash = () => {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save().then(() => resolve(this))
      .catch(err => {
        if (tries < 1)
          return reject(err);
        tries--;
        _generateFindHash();
      });
    };

    _generateFindHash();
  });
};

userSchema.methods.generateToken = function(){
  debug('generateToken');
  return this.generateFindHash()
  .then(user => {
    return jwt.sign({findHash: user.findHash}, process.env.APP_SECRET);
  });
};




module.exports = mongoose.model('user', userSchema);
