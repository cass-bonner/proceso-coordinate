lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();

lambdaToTest.handler({"resourceType":"","processingInstructions":"","tags":"","description":"","resourcefile":"https://s3.amazonaws.com/aminalz-api-development-stack-userdatabucket-147ma…s-west-2:33b9f653-a52d-4e58-b21e-0bcc17b6721d/1264766731-1489258288191.png"},ctx);

ctx.Promise
    .then(() => {
        //=> succeed() called
    })
    .catch(err => {
        //=> fail() called
    });

