const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();
const util = require('util');
const common= require('common'); 

exports.handler = (event, context, callback) => {

    var correlationId = event.correlationId;
    var functionName = context.functionName;
    common.setup(correlationId,functionName);
    var stateMachineArn = process.env.stateMachineArn;

   var s3Path   = event.s3Path
    //quite a hack.
    const origStr= s3Path.substring(s3Path.indexOf("https://s3.amazonaws.com/") + 25);
    const bucket = origStr.substring(0,origStr.indexOf("us-west-2:")-1);
    console.log('bucket:', bucket);
    const s3Key=origStr.substring(origStr.indexOf("us-west-2:") );
    console.log('s3Key:',s3Key);
    const objectID=s3Key.substring(s3Key.indexOf('/') +1);
    console.log('objectID:',objectID);
    
    var input = {
      "s3Key": s3Key,
      "objectID" : objectID,
      "s3Bucket" : bucket
    }

    console.log('stateMachineArn',stateMachineArn);

   var params = {
      stateMachineArn: stateMachineArn, 
      input: JSON.stringify(input),
    };

    console.log('starting',stateMachineArn);
stepfunctions.startExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
    console.log('ending',stateMachineArn);

    console.log('waiting for executionArnPromise'); 


};
