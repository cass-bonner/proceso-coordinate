lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();
var process = {
  "env": {
    "stateMachineArn": "arn:aws:states:us-west-2:970386504547:execution:ImageProcStateMachine-MWZYPTDOWJHH"    
   }
}

lambdaToTest.handler({"correlationId":"25df7d73-0ebb-470d-ac47-69a6d12371b0","s3Path":"https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-w9041en3z04v/us-west-2:d14c19e6-711b-427f-895f-12b884311760/1264766731-1489134192228.png","hashtag":"","processingType":"ImageProcessor","bucket":"aminalz-api-development-stack-userdatabucket-w9041en3z04v/us-east-1","filename":"d14c19e6-711b-427f-895f-12b884311760/1264766731-1489134192228.png"}, ctx);

ctx.Promise
    .then(() => {
        //=> succeed() called
    })
    .catch(err => {
        //=> fail() called
    });

