'use strict';
var common= require('common');

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01',
    params: {Bucket: process.env.s3bucket}
});


exports.handler = (event, context, callback) => {
    
    var correlationId=event.correlationId;
    common.setup(correlationId);
    var sequenceId = event.sequenceId+1;
    var s3Artifact = event.s3Artifact; 
    
    console.log("s3Artifact: ", s3Artifact); 
   // todo extract out the meta data attributes and put in dynamodb.

    var response={};
    response["correlationId"]=correlationId;
    
    callback(null, response);
};

