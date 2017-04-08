const aws = require('aws-sdk');
const common = require('common');

exports.handler = (event, context, callback) => {
    

   console.log(JSON.stringify(event, null, 2));
    console.log(JSON.stringify(context, null, 2));

    var s3Path = event.s3Path;
    console.log("s3Path: " + s3Path);
    const origStr= s3Path.substring(s3Path.indexOf("https://s3.amazonaws.com/") + 25);
    const bucket = origStr.substring(0,origStr.indexOf("us-west-2:")-1);
    console.log('bucket:', bucket);
    const s3Key=origStr.substring(origStr.indexOf("us-west-2:") );
    console.log('s3Key:',s3Key);
    const objectID=s3Key.substring(s3Key.indexOf('/') +1);
    console.log('objectID:',objectID);

   var correlationId=event.correlationId;
   var functionName = context.functionName;
   console.log('functionName =', context.functionName);
   console.log('functionName =', functionName);
   common.setup(correlationId,functionName);
   var s3Path = event.s3Path;
   var type = event.type;
   var hashtag =event.hashtag;
   var processingInstructions =event.processingInstructions;

    console.log('Received event:', JSON.stringify(event, null, 2));

    console.log('s3Path: ',s3Path);

    var extension=getExt(s3Path);

   // see if this is supposed to be flagged as a task.

   console.log('extension: ', extension);
   var processor;
   if ((processingInstructions.toUpperCase().search("#TASK") != -1) ||
       (processingInstructions.toUpperCase().search("#TODO") != -1 )) {
      console.log("processingInstructions are not empty: " + processingInstructions);
      // string is not empty and not just whitespace
      console.log("This is to be processed as a task setting task to TaskProcessor.");
      processor='TaskProcessor';
    } else if (extension.toUpperCase() == 'JPG' || extension.toUpperCase() == 'PNG' || extension.toUpperCase() == 'GIF' || extension.toUpperCase() == 'JPEG') {
      console.log("This is to be processed as an image setting task to ImageProcessor.");
      processor='ImageProcessor';
        
    } else {
      console.log("This is to be processed using default Processor: Data Processor.");
      processor='DataProcessor';
    } 
    console.log('processor: ', processor);
    var response={};
    response["processingType"]=processor;
    response["s3Key"]=s3Key;
    response["objectID"]=objectID;
    callback(null,response);

};


function getExt(url) {
  return url.split('.').pop();
}
  
