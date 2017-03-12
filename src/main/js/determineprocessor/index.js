const aws = require('aws-sdk');
const common = require('common');

exports.handler = (event, context, callback) => {
    
   var correlationId=event.correlationId;
   common.setup(correlationId);
   var s3Path = event.s3Path;
   var type = event.type;
   var hashtag =event.hashtag;
   var processingInstructions =event.processingInstructions;
   var bucket =event.bucket;
   var filename =event.filename;

    console.log('Received event:', JSON.stringify(event, null, 2));

    console.log('s3Path: ',s3Path);

    var extension=getExt(s3Path);

    var processor;
    console.log('extension: ', extension);
    if (extension.toUpperCase() == 'JPG' || extension.toUpperCase() == 'PNG' || extension.toUpperCase() == 'GIF') {
      processor='ImageProcessor';
      
    } 
    console.log('processor: ', processor);

    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["hashtag"]=hashtag;
    response["processingInstructions"]=processingInstructions;
    response["processingType"]=processor;
    callback(null,response);

};


function getExt(url) {
  return url.split('.').pop();
}
  
