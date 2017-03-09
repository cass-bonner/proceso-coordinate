var common= require('common');
exports.handler = (event, context, callback) => {

   // TODO - ideally we won't pass in the public facing url, but does make it easier to display later anyway.
   var s3Path = event.resourcefile;
   var type = event.type;
   // TODO change to hashtag
   var hashtag =event.description;
   //TODO change name to processing instructions.
   var processingInstructions =event.name;


    // string out bucket name and filename from url.
    const origStr= s3Path.substring(s3Path.indexOf("https://s3.amazonaws.com/") + 25);
    const bucket = origStr.substring(0,origStr.indexOf(":"));
    console.log('bucket:', bucket);
    const filename=origStr.substring(origStr.indexOf(":"))+1;
    console.log('filename:',filename);

    
    // perform any setup - here prepending correlationId in logs.
    var correlationId=common.initCorrelation();
    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["type"]=type;
    response["hashtag"]=hashtag;
    response["processingInstructions"]=processingInstructions;
    
    console.log('returning',response);
    callback(null, response);
};


