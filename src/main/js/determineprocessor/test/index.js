lambdaToTest = require('../index')
const context = require('aws-lambda-mock-context');

const ctx = context();

lambdaToTest.handler({hello: 'world'}, ctx);

ctx.Promise
    .then(() => {
        //=> succeed() called
    })
    .catch(err => {
        //=> fail() called
    });

