lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();

//lambdaToTest.handler({hello: 'world'}, ctx);
lambdaToTest.handler({
    "correlationId": "bdd053a3-eb4c-4db1-848e-25f31fb7549a",
    "s3Path": "https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-w9041en3z04v/us-east-1:d14c19e6-711b-427f-895f-12b884311760/1264766731-1489125456587.png",
    "hashtag": "",
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

