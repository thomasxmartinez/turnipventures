'use strict';
process.env.MONGODB_URI = 'mongodb://localhost:test';
// fake tokens to be written below
process.env.APP_SECRET = 'boatsboats';
process.env.AWS_BUCKET= 'testBucket';
process.env.AWS_ACCESS_KEY_ID = 'fakeID';
process.env.AWS_SECRET_ACCESS_KEY = 'fakeKey';

require('./lib/AWS-mocks');
