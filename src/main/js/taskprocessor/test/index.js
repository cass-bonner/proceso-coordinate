lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();
var process = {
  "env": {
    "stateMachineArn": "arn:aws:states:us-west-2:970386504547:execution:ImageProcStateMachine-MWZYPTDOWJHH"    
   }
}

lambdaToTest.handler({"correlationId":"8c87d425-749e-414c-a6ee-8205289f135c","s3Path":"https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-147ma50ywqxcd/us-west-2:c1aa9b4f-6e92-4678-a11c-02a50f70d3dc/682073578-1490995737001.png","hashtags":"","processingInstructions":"#TASK testing","res":{"processingType":"TaskProcessor","s3Key":"us-west-2:c1aa9b4f-6e92-4678-a11c-02a50f70d3dc/682073578-1490995737001.png","objectID":"682073578-1490995737001.png"}}, ctx);

ctx.Promise
    .then(() => {
        //=> succeed() called
    })
    .catch(err => {
        //=> fail() called
    });

