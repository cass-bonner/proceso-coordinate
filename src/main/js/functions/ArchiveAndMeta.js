'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01',
    params: {Bucket: process.env.s3bucket}
});


exports.handler = (event, context, callback) => {
    
    var correlationId=event.correlationId;
    var sequenceId = event.sequenceId+1;
    
    (function(){
    if(console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, 'functionName: ', context.functionName, ' | correlationId: ',correlationId, ' | sequenceId: ', sequenceId);
            old.apply(this, arguments)
        }
    }  
})();
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log(process.env)

    s3.putObject({Key: correlationId, Body: JSON.stringify(event, null, 2)}, function(err, data) {
      if (err) {
        console.log('There was an error creating your album: ' + err.message);
      } else {
          console.log(data);
      }
      console.log('Completed putting object.');
      context.done();
    });
    
    var response={};
    response["correlationId"]=correlationId;
    response["sequenceId"]=sequenceId;
    
    console.log('returning',response);
    callback(null, response);
};

