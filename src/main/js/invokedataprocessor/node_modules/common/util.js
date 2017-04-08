const uuidV4 = require('uuid/v4');

exports.setup = function setup(correlationId,functionName) {
  setCorrelationLog(correlationId,functionName); 
}

exports.initCorrelation =function initCorrelation(functionName) {
  var correlationId= uuidV4();
  setCorrelationLog(correlationId,functionName); 
  return correlationId;
}

function setCorrelationLog(correlationId,functionName) {

  console.log('setting correlation id to: ',correlationId + ' function name to: '+ functionName);

  (function(){
    if(console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, ' ',',' + correlationId + ',' + functionName + ',');
            old.apply(this, arguments)
        }
    }
  })();

}


