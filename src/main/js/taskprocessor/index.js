'use strict';
console.log('Loading function');


var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-west-2' 
});

aws.config.update({
  region: "us-west-2"
});


const docClient = new aws.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION
});

exports.handler = (event, context, callback) => {
    
    var tags = event.processingInstructions;
    var s3Path = event.s3Path;
    var s3Key = event.res.s3Key;
    var objectID = event.res.objectID;
    var correlationId= event.correlationId;
    


var table = "photo-sharing-backend-ImageMetadataDDBTable-1BGNMQLEZKR60";
var processedTask = "Task " + correlationId + " Processed";
var tags = [processedTask];
var milliseconds = Math.floor((new Date).getTime()/1000);

var params = {
    TableName:table,
    Item:{
        "imageID": milliseconds + "-taskImage.png",
        "albumID": "aminalz/photos",
        "userID" : "aminalz",
        "uploadTime" : milliseconds,
        "processingType" : "task",
        // "dimensions" : {
        //     "height" : 22,
        //     "width" : 20
        // },
        "tags": tags
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
    
    console.log("s3Path: " + s3Path);
    console.log("s3Key: " + s3Key);
    console.log("objectID: " + objectID);
console.log("Incoming: ", event);
    var output = JSON.stringify(event, null, 2);
console.log("output: ", output);
    var eParams = {
        Destination: {
            ToAddresses: ["nozzie.17171717@nozbe.me"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "The following resource was uploaded to s3:\n" +
                    
                    "<a href=\"" + s3Path + "\" />" + 
                    " <\n>Full payload: " + JSON.stringify(output, null, 2)
                }
            },
            Subject: {
                Data: "Aminalz-TaskProcessor corr Id: " + correlationId  + " " + event.processingInstructions + 
                " " +  tags + " #AMINALZ-TODO"
            }
        },
        Source: "bonnerca@amazon.com"
    };

    console.log('===SENDING EMAIL=== with eparams\n ' + JSON.stringify(output, null, 2));
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);
            context.succeed(event);
        }
    });
    console.log("EMAIL CODE END");
    console.log('EMAIL: ', email);

  
}

