'use strict';

const mockAWS = require('aws-sdk-mock');

mockAWS.mock('S3', 'upload', function(params, callback) {
  if(params.ACL != 'public-read')
    return callback(new Error('ACL must be public read'));
  if(params.Bucket != process.env.AWS_BUCKET)
    return callback(new Error('BUCKET must be process.env.AWS_BUCKET'));
  if(!params.Key)
    return callback(new Error('Key must be set'));
  if(!params.Body)
    return callback(new Error('Body must be set'));
  callback(null, {
    Key: params.Key,
    Location: `www.tempSite.com/${params.Key}`,
  });
});
