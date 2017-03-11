var common= require('common');
exports.handler = (event, context, callback) => {

    // perform any setup - here prepending correlationId in logs.
    var correlationId=common.initCorrelation();
   // TODO - ideally we won't pass in the public facing url, but does make it easier to display later anyway.
   var s3Path = event.resourcefile;
   var type = event.type;
   // TODO change to hashtag
   var hashtag =event.description;
   //TODO change name to processing instructions.
   var processingInstructions =event.name;

    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["type"]=type;
    response["hashtag"]=hashtag;
    response["processingInstructions"]=processingInstructions;
    
    console.log('returning',response);
    callback(null, response);
};


