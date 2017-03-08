var common= require('common');
exports.handler = (event, context, callback) => {
    
    // perform any setup - here prepending correlationId in logs.
    var correlationId=common.initCorrelation();
    var response={};
    response["correlationId"]=correlationId;
    
    console.log('returning',response);
    callback(null, response);
};


