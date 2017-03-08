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
    
    

    console.log('process.env',process.env);
    console.log('context',context);
    var uuid=getUuid();
    console.log('uuid: ',uuid);
    var pType = 'LowLatency';
    var response={};
    response["processingType"]="LowLatency";
    response["correlationId"]=correlationId;
    response["sequenceId"]=sequenceId;
    callback(null,response);


};

function getUuid() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}