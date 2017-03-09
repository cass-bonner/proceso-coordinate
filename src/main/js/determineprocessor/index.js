const readChunk = require('read-chunk');
const fileType = require('file-type');
const aws = require('aws-sdk');
const common = require('common');

const s3 = new aws.S3({ apiVersion: '2006-03-01',
    params: {
      Bucket: process.env.s3bucket,
      Region: 'us-east-1'
      }
});

exports.handler = (event, context, callback) => {
    
   var correlationId=event.correlationId;
   common.setup(correlationId);
   var s3Path = event.resourcefile;
   var type = event.type;
   // TODO change to hashtag
   var hashtag =event.hashtag;
   //TODO change name to processing instructions.
   var processingInstructions =event.processingInstructions;
   var bucket =event.bucket;
   var filename =event.filename;

    
    console.log('Received event:', JSON.stringify(event, null, 2));

    // pull out the s3 image
    var params = {Bucket: bucket, Key: filename};
    var file = require('fs').createWriteStream('/path/to/file');
    console.log('file: ' ,file);
    
    // determine the file type
    const buffer = readChunk.sync(file, 0, 4100);
    console.log(fileType(buffer));
    

    var pType = 'LowLatency';
    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["type"]=type;
    response["hashtag"]=hashtag;
    response["processingInstructions"]=processingInstructions;
    response["processingType"]="LowLatency";
    response["correlationId"]=correlationId;
    response["bucket"]=bucket;
    response["filename"]=filename;
    callback(null,response);

};

