import import { setup } from '../common/util';
exports.handler = (event, context, callback) => {
    
    // perform any setup - here prepending correlationId in logs.
    var correlationId=setup();
    var response={};
    response["correlationId"]=correlationId;
    
    console.log('returning',response);
    callback(null, response);
};


