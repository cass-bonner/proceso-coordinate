var common= require('common');
exports.handler = (event, context, callback) => {

    // perform any setup - here prepending correlationId in logs.
    var correlationId=common.initCorrelation();

   var s3Path = event.resourcefile;
   var type = event.type;
   var hashtags =event.tags;
   //TODO change name to processing instructions.
   var processingInstructions =event.processingInstructions;

    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["type"]=type;
    response["hashtags"]=hashtags;
    response["processingInstructions"]=processingInstructions;
    
    console.log('returning',response);
    callback(null, response);
};


