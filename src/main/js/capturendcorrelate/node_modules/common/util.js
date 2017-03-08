const uuidV4 = require('uuid/v4');

export function setup(correlationId) {
  setCorrelationLog(correlationId); 
}

export function setup() {
  var correlationId= uuidV4();
  setCorrelationLog(correlationId); 
  return correlationId;
}

function setCorrelationLog(correlationId) {

  (function(){
    if(console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, 'correlationId: ',correlationId);
            old.apply(this, arguments)
        }
    }
  })();

}


