lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();

//lambdaToTest.handler({hello: 'world'}, ctx);
lambdaToTest.handler({
    "correlationId": "bdd053a3-eb4c-4db1-848e-25f31fb7549a",
    //"s3Path": "https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-w9041en3z04v/us-east-1:d14c19e6-711b-427f-895f-12b884311760/1264766731-1489125456587.png",
    "s3Path": "https://aminalz-api-development-stack-userdatabucket-147ma50ywqxcd.s3.amazonaws.com/us-west-2:2f143817-77ef-436c-b5b3-431d01cc2bc3/1139185207-1490441005827.pptx",
    //"s3Path": "https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-w9041en3z04v/us-east-1:d14c19e6-711b-427f-895f-12b884311760/1264766731-1489125456587.png",
    "hashtag": "#TESTING",
    "processingInstructions": "#TASK",
    "bucket": "aminalz-api-development-stack-userdatabucket-w9041",
    "filename": "d14c19e6-711b-427f-895f-12b884311760/1264766731-1489125456587.png"
}, ctx);


ctx.Promise
    .then(() => {
        //=> succeed() called
    })
    .catch(err => {
        //=> fail() called
    });

