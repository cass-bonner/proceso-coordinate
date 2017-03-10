const readChunk = require('read-chunk');
const fileType = require('file-type');
const aws = require('aws-sdk');
const common = require('common');
const http = require('http');
const s3 = new aws.S3({ apiVersion: '2006-03-01',
    params: {
      Region: 'us-east-1'
      }
});


exports.handler = (event, context, callback) => {
    
   var correlationId=event.correlationId;
   common.setup(correlationId);
   var s3Path = event.s3Path;
   var type = event.type;
   // TODO change to hashtag
   var hashtag =event.hashtag;
   //TODO change name to processing instructions.
   var processingInstructions =event.processingInstructions;
   var bucket =event.bucket;
   var filename =event.filename;

    console.log('Received event:', JSON.stringify(event, null, 2));

    console.log('s3Path: ',s3Path);
    var s3String = JSON.stringify(s3Path,null,2); 
    console.log('s3String: ',s3String);
    // determine the file type
    var fileT;  
    //http.get(s3Path, res => {
    ////res.once('data', chunk => {
      ////  res.destroy();
        ////fileT = fileType(chunk);
        //console.log(fileT);
        //=> {ext: 'gif', mime: 'image/gif'} 
    //});
    //});
    console.log('fileT: ' ,fileT);
    console.log('filename: ' ,filename);
    console.log('bucket: ' ,bucket);
    // pull out the s3 image
    var params = {Bucket: bucket, Key: filename};

   

    var filepath = "/tmp/" + filename;
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err);
            var message = "Error getting object " + key + " from bucket " + bucket +
            ". Make sure they exist and your bucket is in the same region as this function.";
            console.log(message);
            context.fail(message);
        } else {

   
            //console.log("DATA: " + data.Body.toString());
            fs.writeFile(filepath , function (err) {

                if(err) {
                    console.log("writeToTmp Failed " + err);
                } else {
                    console.log("writeFile succeeded");
                }
            });
        }
    });



    const buffer = readChunk.sync(filepath, 0, 4100); 
    var fileType = fileType(buffer);
    console.log('fileType: ', fileType);

   // use local file if you get time
   // also add in additional logic

    var pType = 'LowLatency';
    var response={};
    response["correlationId"]=correlationId;
    response["s3Path"]=s3Path;
    response["resourceType"]=fileT;
    response["hashtag"]=hashtag;
    response["processingInstructions"]=processingInstructions;
    response["processingType"]="LowLatency";
    response["correlationId"]=correlationId;
    response["bucket"]=bucket;
    response["filename"]=filename;
    callback(null,response);

};

