'use strict';
var common= require('common');

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01',
    params: {Bucket: process.env.s3bucket}
});


exports.handler = (event, context, callback) => {
    
    var functionName = context.functionName;
    var correlationId=event.correlationId;
    common.setup(correlationId,functionName);
    var sequenceId = event.sequenceId+1;
    
    console.log("extracting metadata for: ", event.s3Path); 
   // todo extract out the meta data attributes and put in dynamodb.

    var response={};
    response["correlationId"]=correlationId;
    
    callback(null, response);
};

