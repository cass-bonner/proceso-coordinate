const uuidV4 = require('uuid/v4');

exports.setup = function setup(correlationId) {
  setCorrelationLog(correlationId); 
}

exports.initCorrelation =function initCorrelation() {
  var correlationId= uuidV4();
  setCorrelationLog(correlationId); 
  return correlationId;
}

function setCorrelationLog(correlationId) {

  console.log('setting correlation id to: ',correlationId);

  (function(){
    if(console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, ' ',correlationId);
            old.apply(this, arguments)
        }
    }
  })();

}


